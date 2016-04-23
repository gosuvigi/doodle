package org.vigi.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.vigi.domain.DoodleTemplate;

import java.util.List;

/**
 * Created by vigi on 3/20/2016.
 */
@Service
@Transactional
class DoodleTemplateService {

    private final DoodleTemplateRepository templateRepository;

    @Autowired
    DoodleTemplateService(DoodleTemplateRepository templateRepository) {
        this.templateRepository = templateRepository;
    }

    DoodleTemplate getDoodleTemplate(Long templateId) {
        return templateRepository.findOne(templateId);
    }

    List<DoodleTemplate> findAllTemplate() {
        return templateRepository.findAll();
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
        return templateRepository.create(template);
    }

    DoodleTemplate updateDoodleTemplate(DoodleTemplate template) {
        return templateRepository.update(template);
    }

    void deleteDoodleTemplate(Long id) {
        templateRepository.delete(id);
    }
}
