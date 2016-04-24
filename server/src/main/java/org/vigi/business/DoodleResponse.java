package org.vigi.business;

import lombok.Data;

/**
 * Created by vigi on 4/24/2016.
 */
@Data
class DoodleResponse {

    private String id;

    private String state;

    private String adminKey;

    private String title;

    private Boolean isByInvitationOnly;

}