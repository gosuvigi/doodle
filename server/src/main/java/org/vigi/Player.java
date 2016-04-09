package org.vigi;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Persistable;
import org.springframework.hateoas.Identifiable;

/**
 * Created by ratoico on 8/17/15 5:34 PM.
 */
@Builder
@Getter
public final class Player implements Persistable<Long> {

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
