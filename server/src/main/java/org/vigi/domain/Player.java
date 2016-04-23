package org.vigi.domain;

import lombok.Data;
import org.springframework.data.domain.Persistable;

/**
 * Created by ratoico on 8/17/15 5:34 PM.
 */
@Data
public class Player implements Persistable<Long> {

    public Player() {
    }

    private Long id;

    private String name;

    private String email;

    private String phone;

    private boolean active;

    private boolean subscriber;

    @Override
    public boolean isNew() {
        return id == null;
    }
}
