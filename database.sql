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
