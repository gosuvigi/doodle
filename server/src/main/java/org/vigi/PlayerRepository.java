package org.vigi;

import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.*;

/**
 * Created by vigi on 4/6/2016.
 */
@Repository
class PlayerRepository extends JdbcRepository<Player, Long> {

    private static final String BASIC_QUERY = " FROM PLAYER where lower(NAME) like ? or lower(EMAIL) like ?";
    private static final String FULL_QUERY = BASIC_QUERY + " ORDER BY lower(NAME) ASC LIMIT ? OFFSET ?";

    private final JdbcOperations jdbcOperations;

    @Autowired
    PlayerRepository(JdbcOperations jdbcOperations) {
        super(ROW_MAPPER, ROW_UNMAPPER, "PLAYER");
        this.jdbcOperations = jdbcOperations;
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

    Page<Player> findBySearchTerm(String searchTerm, Pageable pageable) {
        String q = "%" + searchTerm.trim() + "%";
        int offset = pageable.getPageNumber() * pageable.getPageSize();
        Object[] params = new Object[]{q, q, pageable.getPageSize(), offset};
        List<Player> players = jdbcOperations.query("SELECT * " + FULL_QUERY, params, ROW_MAPPER);
        int count = jdbcOperations.queryForObject("SELECT COUNT(1) " + BASIC_QUERY, new Object[]{q, q}, Integer.class);
        return new PageImpl<>(players, pageable, count);
    }
}
