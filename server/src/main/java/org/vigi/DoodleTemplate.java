package org.vigi;

import lombok.Builder;
import lombok.Getter;
import lombok.Singular;

import java.util.Date;
import java.util.List;

/**
 * Created by ratoico on 8/17/15 5:05 PM.
 */
@Builder
@Getter
public final class DoodleTemplate {

    private final Long id;

    private final String name;

    private final String title;

    private final String location;

    private final Date dateTime;

    private final String initiator;

    private final String emailText;

    @Singular
    private final List<Player> recipients;
}
