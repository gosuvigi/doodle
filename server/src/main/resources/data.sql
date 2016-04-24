INSERT INTO PLAYERS (NAME, EMAIL, PHONE, ACTIVE, SUBSCRIBER)
VALUES ('Lionel Messi', 'messi@messi.com', '00801', TRUE, TRUE);
INSERT INTO PLAYERS (NAME, EMAIL, PHONE, ACTIVE, SUBSCRIBER)
VALUES ('Neymar Jr', 'neymar@neymar.com', '00802', TRUE, TRUE);
INSERT INTO PLAYERS (NAME, EMAIL, PHONE, ACTIVE, SUBSCRIBER)
VALUES ('Luis Suarez', 'suarez@suarez.com', '00803', TRUE, TRUE);
INSERT INTO PLAYERS (NAME, EMAIL, PHONE, ACTIVE, SUBSCRIBER)
VALUES ('Hodor', 'hodor@hodor.com', '00804', TRUE, FALSE);
INSERT INTO PLAYERS (NAME, EMAIL, PHONE, ACTIVE, SUBSCRIBER)
VALUES ('Rivaldo', 'rivaldo@rivaldo.com', '00805', FALSE, TRUE);

INSERT INTO DOODLE_TEMPLATES (NAME, LOCATION, MATCH_DATE, INITIATOR, EMAIL_TEXT)
VALUES ('Monday Indoor', 'VUB Indoor', SYSTIMESTAMP, 'vigi', '<h2>please</h2> come <b>before 20:50</b>');
INSERT INTO DOODLE_TEMPLATES (NAME, LOCATION, MATCH_DATE, INITIATOR, EMAIL_TEXT)
VALUES ('Tuesday Outdoor', 'VUB Outdoor', SYSTIMESTAMP, 'vigi', '<h1>HODOR</h1> says <h2>Hodor</h2>');

INSERT INTO TEMPLATES_PLAYERS_INT (TEMPLATE_ID, PLAYER_ID)
VALUES (1, 1);
INSERT INTO TEMPLATES_PLAYERS_INT (TEMPLATE_ID, PLAYER_ID)
VALUES (1, 2);
INSERT INTO TEMPLATES_PLAYERS_INT (TEMPLATE_ID, PLAYER_ID)
VALUES (1, 3);
INSERT INTO TEMPLATES_PLAYERS_INT (TEMPLATE_ID, PLAYER_ID)
VALUES (2, 4);
INSERT INTO TEMPLATES_PLAYERS_INT (TEMPLATE_ID, PLAYER_ID)
VALUES (2, 5);