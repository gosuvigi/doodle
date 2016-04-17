package org.vigi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

/**
 * Created by vigi on 3/20/2016.
 */
@Service
@Transactional
class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    Player getPlayer(Long playerId) {
        return playerRepository.findOne(playerId);
    }

    @Transactional(readOnly = true)
    Page<Player> findBySearchTerm(String searchTerm, Pageable pageable) {
        if (StringUtils.hasText(searchTerm)) {
            return playerRepository.findBySearchTerm(searchTerm, pageable);
        }
        return getPlayersPaged(pageable);
    }

    private Page<Player> getPlayersPaged(Pageable pageable) {
        return playerRepository.findAll(pageable);
    }

    Player addPlayer(Player player) {
        return playerRepository.create(player);
    }

    Player updatePlayer(Player player) {
        return playerRepository.update(player);
    }

    void deletePlayer(Long id) {
        playerRepository.delete(id);
    }
}
