package org.vigi.player;

import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import com.nurkiewicz.jdbcrepository.TableDescription;
import com.nurkiewicz.jdbcrepository.sql.SqlGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.vigi.domain.Player;

import java.util.*;

/**
 * Created by vigi on 4/6/2016.
 */
@Repository
public class PlayerRepository extends JdbcRepository<Player, Long> {

    private static final String BASIC_QUERY = " FROM players where lower(name) like ? or lower(email) like ?";
    private static final String FULL_QUERY = BASIC_QUERY + " ORDER BY lower(name) ASC LIMIT ? OFFSET ?";
    private static final String PLAYERS_TEMPLATE_QUERY = "SELECT * FROM players p INNER JOIN templates_players_int tp " +
            "on p.Id = tp.player_id where tp.template_id = ?";

    private final JdbcOperations jdbcOperations;

    @Autowired
    PlayerRepository(JdbcOperations jdbcOperations, SqlGenerator sqlGenerator) {
        super(ROW_MAPPER, ROW_UNMAPPER, sqlGenerator, new TableDescription("players", "id"));
        this.jdbcOperations = jdbcOperations;
    }

    private static final RowMapper<Player> ROW_MAPPER = (rs, rowNum) -> {
        Player p = new Player();
        p.setId(rs.getLong("id"));
        p.setName(rs.getString("name"));
        p.setEmail(rs.getString("email"));
        p.setPhone(rs.getString("phone"));
        p.setActive(rs.getBoolean("active"));
        p.setSubscriber(rs.getBoolean("subscriber"));
        return p;
    };

    private static final RowUnmapper<Player> ROW_UNMAPPER = player -> {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", player.getId());
        row.put("name", player.getName());
        row.put("email", player.getEmail());
        row.put("phone", player.getPhone());
        row.put("active", player.isActive());
        row.put("subscriber", player.isSubscriber());
        return row;
    };

    Page<Player> findBySearchTerm(String searchTerm, Pageable pageable) {
        String q = "%" + searchTerm.trim() + "%";
        int offset = pageable.getPageNumber() * pageable.getPageSize();
        Object[] params = new Object[]{q, q, pageable.getPageSize(), offset};
        List<Player> players = jdbcOperations.query("SELECT * " + FULL_QUERY, params, ROW_MAPPER);
        int count = jdbcOperations.queryForObject("SELECT COUNT(1) " + BASIC_QUERY, new Object[]{q, q}, Integer.class);
        return new PageImpl<>(players, pageable, count);
    }

    public List<Player> findPlayersForTemplate(Long templateId) {
        Object[] params = new Object[]{templateId};
        return jdbcOperations.query(PLAYERS_TEMPLATE_QUERY, params, ROW_MAPPER);
    }
}
