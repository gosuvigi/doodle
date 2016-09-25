package org.vigi.template;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.mvc.BasicLinkBuilder;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.vigi.business.DoodleEmailService;
import org.vigi.domain.DoodleTemplate;
import org.vigi.domain.Player;

import java.util.List;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Created by vigi on 3/20/2016.
 */
@RestController
@RequestMapping(value = "/api/templates", produces = APPLICATION_JSON_VALUE)
class DoodleTemplateController {

    private final DoodleTemplateService templateService;
    private final DoodleEmailService doodleEmailService;

    @Autowired
    DoodleTemplateController(DoodleTemplateService templateService, DoodleEmailService doodleEmailService) {
        this.templateService = templateService;
        this.doodleEmailService = doodleEmailService;
    }

    @RequestMapping(method = RequestMethod.GET)
    PagedResources<Resource<DoodleTemplate>> pagedPlayerResources(
            @RequestParam(value = "q", required = false) String searchTerm, Pageable pageable) {
        Page<DoodleTemplate> playersPaged = templateService.findBySearchTerm(searchTerm, pageable);
        PagedResourcesAssembler<DoodleTemplate> assembler = new PagedResourcesAssembler<>(null, null);
        PagedResources<Resource<DoodleTemplate>> pagedResources = assembler.toResource(playersPaged);
        for (Resource<DoodleTemplate> resource : pagedResources.getContent()) {
            Link viewLink = BasicLinkBuilder.linkToCurrentMapping().slash("templates")
                    .slash(resource.getContent().getId()).withRel("view");
            resource.add(viewLink);
        }
        return pagedResources;
    }

    @GetMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
    Resource<DoodleTemplate> templateResource(@PathVariable Long id) {
        return templateToResource(templateService.getDoodleTemplate(id));
    }

    @GetMapping(value = "/{id}/players", produces = APPLICATION_JSON_VALUE)
    List<Player> getTemplatePlayers(@PathVariable Long id) {
        return templateService.getTemplatePlayers(id);
    }

    private Resource<DoodleTemplate> templateToResource(DoodleTemplate template) {
        Link selfLink = linkTo(methodOn(this.getClass()).templateResource(template.getId())).withSelfRel();
        Link viewLink = BasicLinkBuilder.linkToCurrentMapping().slash("templates").slash(template.getId()).withRel("view");
        return new Resource<>(template, selfLink, viewLink);
    }

    @PostMapping(consumes = APPLICATION_JSON_VALUE)
    ResponseEntity<Void> createTemplate(@RequestBody DoodleTemplate template, UriComponentsBuilder ucBuilder) {
        DoodleTemplate added = templateService.addDoodleTemplate(template);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/{id}").buildAndExpand(added.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    @PutMapping(value = "/{id}", consumes = APPLICATION_JSON_VALUE)
    Resource<DoodleTemplate> updateTemplate(@PathVariable Long id, @RequestBody DoodleTemplate template) {
        return templateToResource(templateService.updateDoodleTemplate(template));
    }

    @DeleteMapping(value = "/{id}")
    void deleteTemplate(@PathVariable Long id) {
        templateService.deleteDoodleTemplate(id);
    }

    @PostMapping(value = "doodle")
    void submitDoodle(@RequestBody DoodleTemplate template) {
        doodleEmailService.createDoodleAndSendMails(template);
    }
}
