-- Create user table
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL,
  name varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(50) NOT NULL,
  password varchar(100) NOT NULL,
  PRIMARY KEY (user_id),
  CONSTRAINT no_duplicate_user UNIQUE (user_id, email)
);

-- Create table to keep a record of the raitings
CREATE TABLE IF NOT EXISTS raitings_log (
  raitings_log_id SERIAL,
  total int NOT NULL,
  PRIMARY KEY (raitings_log_id)
);

-- Table for the raitings of each user
CREATE TABLE IF NOT EXISTS raitings_users (
  raitings_user_id SERIAL,
  user_id int NOT NULL,
  product_link varchar(1000) NOT NULL,
  raiting int NOT NULL,
  PRIMARY KEY (raitings_user_id),
  CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users (user_id),
  CONSTRAINT no_duplicate_raiting UNIQUE (user_id, product_link)
);
