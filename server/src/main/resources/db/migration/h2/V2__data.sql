INSERT INTO players (name, email, phone, active, subscriber)
VALUES ('Lionel Messi', 'messi@messi.com', '00801', TRUE, TRUE);
INSERT INTO players (name, email, phone, active, subscriber)
VALUES ('Neymar Jr', 'neymar@neymar.com', '00802', TRUE, TRUE);
INSERT INTO players (name, email, phone, active, subscriber)
VALUES ('Luis Suarez', 'suarez@suarez.com', '00803', TRUE, TRUE);
INSERT INTO players (name, email, phone, active, subscriber)
VALUES ('Hodor', 'gosuvigi@gmail.com', '00804', TRUE, FALSE);
INSERT INTO players (name, email, phone, active, subscriber)
VALUES ('Rivaldo', 'rivaldo@rivaldo.com', '00805', FALSE, TRUE);

INSERT INTO doodle_templates (name, location, match_date, initiator, email_text)
VALUES ('Monday Indoor', 'VUB Indoor', SYSTIMESTAMP, 'vigi', '<h2>please</h2> come <b>before 20:50</b>');
INSERT INTO doodle_templates (name, location, match_date, initiator, email_text)
VALUES ('Tuesday Outdoor', 'VUB Outdoor', SYSTIMESTAMP, 'vigi', '<h1>HODOR</h1> says <h2>Hodor</h2>');

INSERT INTO templates_players_int (template_id, player_id)
VALUES (1, 1);
INSERT INTO templates_players_int (template_id, player_id)
VALUES (1, 2);
INSERT INTO templates_players_int (template_id, player_id)
VALUES (1, 3);
INSERT INTO templates_players_int (template_id, player_id)
VALUES (2, 4);
INSERT INTO templates_players_int (template_id, player_id)
VALUES (2, 5);