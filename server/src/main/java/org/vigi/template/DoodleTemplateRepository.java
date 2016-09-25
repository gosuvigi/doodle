package org.vigi.template;

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
import org.vigi.domain.DoodleTemplate;

import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by vigi on 4/23/2016.
 */
@Repository
class DoodleTemplateRepository extends JdbcRepository<DoodleTemplate, Long> {

    private static final String BASIC_QUERY = " FROM doodle_templates where lower(name) like ? or lower(initiator) like ?";
    private static final String FULL_QUERY = BASIC_QUERY + " ORDER BY lower(name) ASC LIMIT ? OFFSET ?";

    private final JdbcOperations jdbcOperations;

    @Autowired
    DoodleTemplateRepository(JdbcOperations jdbcOperations, SqlGenerator sqlGenerator) {
        super(ROW_MAPPER, ROW_UNMAPPER, sqlGenerator, new TableDescription("doodle_templates", "id"));
        this.jdbcOperations = jdbcOperations;
    }

    @Override
    protected <S extends DoodleTemplate> S postCreate(S entity, Number generatedId) {
        entity.setId(generatedId.longValue());
        return entity;
    }

    private static final RowMapper<DoodleTemplate> ROW_MAPPER = (rs, rowNum) -> {
        DoodleTemplate template = new DoodleTemplate();
        template.setId(rs.getLong("id"));
        template.setName(rs.getString("name"));
        template.setLocation(rs.getString("location"));
        template.setInitiator(rs.getString("initiator"));
        template.setEmailText(rs.getString("email_text"));
        template.setMatchDate(rs.getTimestamp("match_date"));
        template.setMatchDayOfWeek(rs.getInt("match_day_of_week"));
        return template;
    };

    private static final RowUnmapper<DoodleTemplate> ROW_UNMAPPER = template -> {
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("id", template.getId());
        row.put("name", template.getName());
        row.put("location", template.getLocation());
        row.put("initiator", template.getInitiator());
        if (template.getMatchDate() != null) {
            row.put("match_date", new Timestamp(template.getMatchDate().getTime()));
        }
        row.put("match_day_of_week", template.getMatchDayOfWeek());
        row.put("email_text", template.getEmailText());
        return row;
    };

    Page<DoodleTemplate> findBySearchTerm(String searchTerm, Pageable pageable) {
        String q = "%" + searchTerm.trim() + "%";
        int offset = pageable.getPageNumber() * pageable.getPageSize();
        Object[] params = new Object[]{q, q, pageable.getPageSize(), offset};
        List<DoodleTemplate> templates = jdbcOperations.query("SELECT * " + FULL_QUERY, params, ROW_MAPPER);
        int count = jdbcOperations.queryForObject("SELECT COUNT(1) " + BASIC_QUERY, new Object[]{q, q}, Integer.class);
        return new PageImpl<>(templates, pageable, count);
    }

    void addPlayersToTemplate(Long templateId, List<Long> playerIds) {
        deletePreviousPlayers(templateId);
        addNewPlayers(templateId, playerIds);
    }

    private void deletePreviousPlayers(Long templateId) {
        jdbcOperations.update("DELETE FROM templates_players_int where template_id = ?",
                new Object[]{templateId});
    }

    private void addNewPlayers(Long templateId, List<Long> playerIds) {
        List<Object[]> batch = playerIds.stream().map(
                playerId -> new Object[]{templateId, playerId}).collect(Collectors.toList());
        jdbcOperations.batchUpdate(
                "INSERT INTO templates_players_int (template_id, player_id) VALUES (?, ?)", batch);
    }

    @Override
    public void delete(Long templateId) {
        deletePreviousPlayers(templateId);
        super.delete(templateId);
    }
}
