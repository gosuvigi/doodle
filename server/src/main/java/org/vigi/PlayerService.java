package org.vigi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

/**
 * Created by vigi on 3/20/2016.
 */
@Service
class PlayerService {

    private final PlayerRepository playerRepository;

    @Autowired
    PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    Page<Player> getPlayersPaged(Pageable pageable) {
        return playerRepository.findAll(pageable);
    }

    Player getPlayer(Long playerId) {
        return playerRepository.findOne(playerId);
    }

    Page<Player> findBySearchTerm(String searchTerm, Pageable pageable) {
        if (StringUtils.hasText(searchTerm)) {
            return playerRepository.findBySearchTerm(searchTerm, pageable);
        }
        return getPlayersPaged(pageable);
    }
}
