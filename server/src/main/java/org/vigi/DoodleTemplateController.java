package org.vigi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Created by vigi on 3/20/2016.
 */
@RestController
@RequestMapping(value = "/api/templates", produces = APPLICATION_JSON_VALUE)
class DoodleTemplateController {

    private final DoodleTemplateService doodleTemplateService;

    @Autowired
    DoodleTemplateController(DoodleTemplateService doodleTemplateService) {
        this.doodleTemplateService = doodleTemplateService;
    }

    @RequestMapping
    Resources<Resource<DoodleTemplate>> templateResources() {
        return templatesToResource(doodleTemplateService.getAllTemplates());
    }

    private Resources<Resource<DoodleTemplate>> templatesToResource(List<DoodleTemplate> players) {
        List<Resource<DoodleTemplate>> resources = players.stream()
                .map(this::templateToResource)
                .collect(Collectors.toList());

        Link selfLink = linkTo(methodOn(this.getClass()).templateResources())
                .withSelfRel();
        return new Resources<>(resources, selfLink);
    }

    @RequestMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
    Resource<DoodleTemplate> templateResource(@PathVariable Long id) {
        return templateToResource(doodleTemplateService.getTemplate(id));
    }

    private Resource<DoodleTemplate> templateToResource(DoodleTemplate player) {
        Link selfLink = linkTo(methodOn(this.getClass()).templateResource(player.getId()))
                .withSelfRel();
        return new Resource<>(player, selfLink);
    }
}
