package org.vigi.domain;

import lombok.Builder;
import lombok.Data;
import lombok.Singular;
import org.springframework.data.domain.Persistable;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by ratoico on 8/17/15 5:05 PM.
 */
@Data
@Builder
public final class DoodleTemplate implements Persistable<Long> {

    private Long id;

    private String name;

    private String title;

    private String location;

    private LocalDateTime matchDate;

    private String initiator;

    private String emailText;

    @Singular
    private List<Player> players;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
