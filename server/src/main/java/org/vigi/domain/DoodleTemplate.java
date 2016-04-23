package org.vigi.domain;

import lombok.Data;
import lombok.Singular;
import org.springframework.data.domain.Persistable;

import java.util.Date;
import java.util.List;

/**
 * Created by ratoico on 8/17/15 5:05 PM.
 */
@Data
public class DoodleTemplate implements Persistable<Long> {

    private Long id;

    private String name;

    private String location;

    private Date matchDate;

    private String initiator;

    private String emailText;

    @Singular
    private List<Player> players;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
