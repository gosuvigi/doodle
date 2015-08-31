package org.vigi;

import lombok.Builder;
import lombok.Getter;

/**
 * Created by ratoico on 8/17/15 5:34 PM.
 */
@Builder
@Getter
public final class Person {

    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private boolean active;
}
