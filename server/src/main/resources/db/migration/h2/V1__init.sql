CREATE TABLE players (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  active BOOLEAN,
  subscriber BOOLEAN
);

CREATE TABLE doodle_templates (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  match_date TIMESTAMP,
  initiator VARCHAR(255) NOT NULL,
  email_text VARCHAR(1023) NOT NULL
);

CREATE TABLE templates_players_int (
  template_id BIGINT,
  player_id BIGINT,
  FOREIGN KEY (template_id) REFERENCES doodle_templates(ID),
  FOREIGN KEY (player_id) REFERENCES players(ID)
);