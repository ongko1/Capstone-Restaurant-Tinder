DROP TABLE IF EXISTS invites;
DROP SEQUENCE IF EXISTS seq_invite_id;

CREATE SEQUENCE seq_invite_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

CREATE TABLE invites (
	invite_id int DEFAULT nextval('seq_invite_id'::regclass) NOT NULL,
	user_id int NOT NULL,
	invite_title varchar(200) NOT NULL,
	expiry_date timestamp NOT NULL,
	event_date timestamp NOT NULL,
	CONSTRAINT PK_invites PRIMARY KEY (invite_id),
	CONSTRAINT FK_invite_user FOREIGN KEY (user_id) references users(user_id)
);
