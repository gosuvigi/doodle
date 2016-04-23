package org.vigi.template;

import com.nurkiewicz.jdbcrepository.JdbcRepository;
import com.nurkiewicz.jdbcrepository.RowUnmapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.JdbcOperations;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.vigi.domain.DoodleTemplate;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by vigi on 4/23/2016.
 */
@Repository
class DoodleTemplateRepository extends JdbcRepository<DoodleTemplate, Long> {

    private static final String BASIC_QUERY = " FROM DOODLE_TEMPLATES where lower(NAME) like ? or lower(INITIATOR) like ?";
    private static final String FULL_QUERY = BASIC_QUERY + " ORDER BY lower(NAME) ASC LIMIT ? OFFSET ?";

    private final JdbcOperations jdbcOperations;

    @Autowired
    DoodleTemplateRepository(JdbcOperations jdbcOperations) {
        super(ROW_MAPPER, ROW_UNMAPPER, "DOODLE_TEMPLATES");
        this.jdbcOperations = jdbcOperations;
    }

    @Override
    protected <S extends DoodleTemplate> S postCreate(S entity, Number generatedId) {
        entity.setId(generatedId.longValue());
        return entity;
    }

    private static final RowMapper<DoodleTemplate> ROW_MAPPER = (rs, rowNum) -> {
        DoodleTemplate template = new DoodleTemplate();
        template.setId(rs.getLong("ID"));
        template.setName(rs.getString("NAME"));
        template.setLocation(rs.getString("LOCATION"));
        template.setInitiator(rs.getString("INITIATOR"));
        template.setEmailText(rs.getString("EMAIL_TEXT"));
        template.setMatchDate(rs.getTimestamp("MATCH_DATE"));
        return template;
    };

    private static final RowUnmapper<DoodleTemplate> ROW_UNMAPPER = player -> {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("ID", player.getId());
        row.put("NAME", player.getName());
        row.put("LOCATION", player.getLocation());
        row.put("INITIATOR", player.getInitiator());
        row.put("MATCH_DATE", player.getMatchDate());
        row.put("EMAIL_TEXT", player.getEmailText());
        return row;
    };

    Page<DoodleTemplate> findBySearchTerm(String searchTerm, Pageable pageable) {
        String q = "%" + searchTerm.trim() + "%";
        int offset = pageable.getPageNumber() * pageable.getPageSize();
        Object[] params = new Object[]{q, q, pageable.getPageSize(), offset};
        List<DoodleTemplate> players = jdbcOperations.query("SELECT * " + FULL_QUERY, params, ROW_MAPPER);
        int count = jdbcOperations.queryForObject("SELECT COUNT(1) " + BASIC_QUERY, new Object[]{q, q}, Integer.class);
        return new PageImpl<>(players, pageable, count);
    }

    void addPlayersToTemplate(Long templateId, List<Long> playerIds) {
        deletePreviousPlayers(templateId);
        addNewPlayers(templateId, playerIds);
    }

    private void deletePreviousPlayers(Long templateId) {
        jdbcOperations.update("DELETE FROM TEMPLATES_PLAYERS_INT where TEMPLATE_ID = ?",
                new Object[]{templateId});
    }

    private void addNewPlayers(Long templateId, List<Long> playerIds) {
        List<Object[]> batch = playerIds.stream().map(
                playerId -> new Object[]{templateId, playerId}).collect(Collectors.toList());
        jdbcOperations.batchUpdate(
                "INSERT INTO TEMPLATES_PLAYERS_INT (TEMPLATE_ID, PLAYER_ID) VALUES (?, ?)", batch);
    }

    @Override
    public void delete(Long templateId) {
        deletePreviousPlayers(templateId);
        super.delete(templateId);
    }
}
