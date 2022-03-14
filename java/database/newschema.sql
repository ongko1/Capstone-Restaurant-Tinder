BEGIN TRANSACTION;

DROP TABLE IF EXISTS invites;
DROP SEQUENCE IF EXISTS seq_invite_id;

DROP TABLE IF EXISTS invites_restaurants;
DROP TABLE IF EXISTS user_invite;
DROP TABLE IF EXISTS restaurant_likes_dislikes;

DROP TABLE IF EXISTS favorites;

DROP TABLE IF EXISTS users;
DROP SEQUENCE IF EXISTS seq_user_id;

CREATE SEQUENCE seq_user_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;

CREATE SEQUENCE seq_invite_id
  INCREMENT BY 1
  NO MAXVALUE
  NO MINVALUE
  CACHE 1;


CREATE TABLE users (
	user_id int DEFAULT nextval('seq_user_id'::regclass) NOT NULL,
	username varchar(50) NOT NULL,
	password_hash varchar(200) NOT NULL,
	role varchar(50) NOT NULL,
	CONSTRAINT PK_user PRIMARY KEY (user_id)
);

CREATE TABLE favorites (
        id SERIAL,
	user_id int NOT NULL,
	business_id char(22) NOT NULL,
	CONSTRAINT pk_id PRIMARY KEY (id),
	CONSTRAINT user_business_id UNIQUE (user_id, business_id),
	CONSTRAINT fk_favorites_user FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE invites (
	invite_id int DEFAULT nextval('seq_invite_id'::regclass) NOT NULL,
	user_id int NOT NULL,
	invite_title varchar(200) NOT NULL,
	expiry_date timestamp NOT NULL,
	event_date timestamp NOT NULL,
	CONSTRAINT PK_invites PRIMARY KEY (invite_id),
	CONSTRAINT FK_invite_user FOREIGN KEY (user_id) references users(user_id)
);

CREATE TABLE invite_restaurants (
	invite_id int NOT NULL,
	restaurant_id int NOT NULL,
	CONSTRAINT FK_invite_restaurant_id FOREIGN KEY (invite_id) references invites(invite_id),
	CONSTRAINT FK_invite_restaurant FOREIGN KEY (restaurant_id) references favorites(id)
);

CREATE TABLE user_invite (
	user_id int NOT NULL,
	invite_id int NOT NULL,
	CONSTRAINT FK_restaurant_user_id FOREIGN KEY (user_id) references users(user_id),
	CONSTRAINT FK_user_invite_id FOREIGN KEY (invite_id) references invites(invite_id)
);

CREATE TABLE restaurant_likes_dislikes (
	restaurant_id int NOT NULL,
	num_of_likes int NULL,
	num_of_dislikes int NULL,
	CONSTRAINT FK_favorite_likes_dislikes_id FOREIGN KEY (restaurant_id) references favorites(id)
);

INSERT INTO users (username,password_hash,role) VALUES ('user@gmail.com','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin@gmail.com','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO invites(user_id, invite_title, expiry_date, event_date)
	VALUES
	((select user_id from users where username = 'user@gmail.com'), 'Birthday','2022-03-12 12:00:00', '2022-03-15 12:00:00'),
	((select user_id from users where username = 'user@gmail.com'), 'Lunch','2022-03-12 12:00:00', '2022-03-15 12:00:00'),
	((select user_id from users where username = 'user@gmail.com'), 'Anniversary','2022-03-12 12:00:00', '2022-03-15 12:00:00');

INSERT INTO favorites(user_id, business_id)
	VALUES
	((select user_id from users where username = 'user@gmail.com'),'7QRdMh0q0t1K1DACjPB28g'),
	((select user_id from users where username = 'user@gmail.com'),'JTheizg2ZoyGJnkAQ3LXog');

INSERT INTO invite_restaurants(invite_id, restaurant_id)
	VALUES
	((select invite_id from invites where user_id = 1 and invite_title = 'Birthday'), (select id from favorites where business_id = '7QRdMh0q0t1K1DACjPB28g')),
	((select invite_id from invites where user_id = 1 and invite_title = 'Lunch'), (select id from favorites where business_id = 'JTheizg2ZoyGJnkAQ3LXog')),
	((select invite_id from invites where user_id = 1 and invite_title = 'Anniversary'), (select id from favorites where business_id = 'JTheizg2ZoyGJnkAQ3LXog'));

INSERT INTO restaurant_likes_dislikes(restaurant_id, num_of_likes, num_of_dislikes)
	VALUES
	((select id from favorites where business_id = 'JTheizg2ZoyGJnkAQ3LXog'), 3, 0);

INSERT INTO user_invite(user_id, invite_id)
	VALUES ((select user_id from users where username = 'user@gmail.com'), (select invite_id from invites where invite_title = 'Birthday' and user_id = (select user_id from users where username = 'user@gmail.com'))),
	((select user_id from users where username = 'user@gmail.com'), (select invite_id from invites where invite_title = 'Lunch' and user_id = (select user_id from users where username = 'user@gmail.com'))),
	((select user_id from users where username = 'user@gmail.com'), (select invite_id from invites where invite_title = 'Anniversary' and user_id = (select user_id from users where username = 'user@gmail.com')));

COMMIT TRANSACTION;
