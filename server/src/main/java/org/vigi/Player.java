package org.vigi;

import lombok.Builder;
import lombok.Getter;
import org.springframework.hateoas.Identifiable;

/**
 * Created by ratoico on 8/17/15 5:34 PM.
 */
@Builder
@Getter
public final class Player implements Identifiable<Long> {

    private Long id;

    private String name;

    private String email;

    private boolean active;

    private boolean subscriber;
}
