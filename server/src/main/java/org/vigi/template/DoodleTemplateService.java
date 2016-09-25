package org.vigi.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.vigi.domain.DoodleTemplate;
import org.vigi.domain.Player;
import org.vigi.player.PlayerRepository;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by vigi on 3/20/2016.
 */
@Service
@Transactional
class DoodleTemplateService {

    private final DoodleTemplateRepository templateRepository;
    private final PlayerRepository playerRepository;

    @Autowired
    DoodleTemplateService(DoodleTemplateRepository templateRepository, PlayerRepository playerRepository) {
        this.templateRepository = templateRepository;
        this.playerRepository = playerRepository;
    }

    DoodleTemplate getDoodleTemplate(Long templateId) {
        DoodleTemplate template = templateRepository.findOne(templateId);
        template.setPlayers(playerRepository.findPlayersForTemplate(templateId));
        return template;
    }

    List<Player> getTemplatePlayers(Long templateId) {
        return playerRepository.findPlayersForTemplate(templateId);
    }

    @Transactional(readOnly = true)
    Page<DoodleTemplate> findBySearchTerm(String searchTerm, Pageable pageable) {
        if (StringUtils.hasText(searchTerm)) {
            return templateRepository.findBySearchTerm(searchTerm, pageable);
        }
        return getDoodleTemplatesPaged(pageable);
    }

    private Page<DoodleTemplate> getDoodleTemplatesPaged(Pageable pageable) {
        return templateRepository.findAll(pageable);
    }

    DoodleTemplate addDoodleTemplate(DoodleTemplate template) {
        DoodleTemplate added = templateRepository.create(template);
        addPlayersToTemplate(template);
        return added;
    }

    private void addPlayersToTemplate(DoodleTemplate template) {
        List<Long> playerIds = template.getPlayers().stream().map(Player::getId).collect(Collectors.toList());
        templateRepository.addPlayersToTemplate(template.getId(), playerIds);
    }

    DoodleTemplate updateDoodleTemplate(DoodleTemplate template) {
        DoodleTemplate updated = templateRepository.update(template);
        addPlayersToTemplate(updated);
        return updated;
    }

    void deleteDoodleTemplate(Long id) {
        templateRepository.delete(id);
    }
}
