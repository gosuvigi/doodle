package org.vigi;

import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by vigi on 4/6/2016.
 */
@Repository
class PlayerRepository extends JdbcRepository<Player, Long> {

    PlayerRepository() {
        super(ROW_MAPPER, ROW_UNMAPPER, "player");
    }

    private static final RowMapper<Player> ROW_MAPPER = (rs, rowNum) -> Player.builder()
            .id(rs.getLong("id"))
            .name(rs.getString("name"))
            .email(rs.getString("email"))
            .active(rs.getBoolean("active"))
            .subscriber(rs.getBoolean("subscriber"))
            .build();

    private static final RowUnmapper<Player> ROW_UNMAPPER = player -> {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", player.getId());
        row.put("name", player.getName());
        row.put("email", player.getEmail());
        row.put("active", player.isActive());
        row.put("subscriber", player.isSubscriber());
        return row;
    };
}
