package org.vigi;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Created by vigi on 3/20/2016.
 */
@Service
class PlayerService {

    private final List<Player> players;

    PlayerService() {
        players = initPlayers();
    }

    private List<Player> initPlayers() {
        Player messi = Player.builder()
                .id(1L)
                .name("messi")
                .email("messi@messi.com")
                .active(true)
                .subscriber(true)
                .build();
        Player neymar = Player.builder()
                .id(2L)
                .name("neymar")
                .email("neymar@neymar.com")
                .active(true)
                .subscriber(true)
                .build();
        Player suarez = Player.builder()
                .id(3L)
                .name("suarez")
                .email("suarez@suarez.com")
                .active(true)
                .subscriber(true)
                .build();
        Player hodor = Player.builder()
                .id(4L)
                .name("hodor")
                .email("hodor@hodor.com")
                .active(true)
                .subscriber(true)
                .build();
        return Collections.unmodifiableList(Arrays.asList(messi, neymar, suarez, hodor));
    }

    List<Player> getAllPlayers() {
        return players;
    }

    Player getPlayer(Long playerId) {
        Optional<Player> optional = players.stream().filter(p -> p.getId().equals(playerId)).findFirst();
        if (optional.isPresent()) {
            return optional.get();
        }
        throw new IllegalArgumentException(String.format("Player with id: '%s' cannot be found.", playerId));
    }
}
