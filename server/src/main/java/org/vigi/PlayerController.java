package org.vigi;

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

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * Created by vigi on 3/20/2016.
 */
@RestController
@RequestMapping(value = "/api/players", produces = APPLICATION_JSON_VALUE)
class PlayerController {

    private final PlayerService playerService;

    @Autowired
    PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @RequestMapping(method = RequestMethod.GET)
    PagedResources<Resource<Player>> pagedPlayerResources(@RequestParam("q") String searchTerm, Pageable pageable) {
        Page<Player> playersPaged = playerService.findBySearchTerm(searchTerm, pageable);
        PagedResourcesAssembler<Player> assembler = new PagedResourcesAssembler<>(null, null);
        PagedResources<Resource<Player>> pagedResources = assembler.toResource(playersPaged);
        for (Resource<Player> resource : pagedResources.getContent()) {
            Link viewLink = BasicLinkBuilder.linkToCurrentMapping().slash("players")
                    .slash(resource.getContent().getId()).withRel("view");
            resource.add(viewLink);
        }
        return pagedResources;
    }

    @RequestMapping(value = "/{id}", produces = APPLICATION_JSON_VALUE)
    Resource<Player> playerResource(@PathVariable Long id) {
        return playerToResource(playerService.getPlayer(id));
    }

    private Resource<Player> playerToResource(Player player) {
        Link selfLink = linkTo(methodOn(this.getClass()).playerResource(player.getId()))
                .withSelfRel();
        Link viewLink = BasicLinkBuilder.linkToCurrentMapping().slash("players").slash(player.getId()).withRel("view");
        return new Resource<>(player, selfLink, viewLink);
    }

    @RequestMapping(method = RequestMethod.POST, consumes = APPLICATION_JSON_VALUE)
    ResponseEntity<Void> createUser(@RequestBody Player player, UriComponentsBuilder ucBuilder) {
        Player added = playerService.addPlayer(player);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(ucBuilder.path("/{id}").buildAndExpand(added.getId()).toUri());
        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }
}
