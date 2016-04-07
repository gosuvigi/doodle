package org.vigi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.hateoas.mvc.BasicLinkBuilder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
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

    @RequestMapping
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
}
