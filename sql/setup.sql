
DROP TABLE IF EXISTS computers CASCADE;
DROP TABLE IF EXISTS applications CASCADE;
DROP TABLE IF EXISTS computers_applications;


CREATE TABLE computers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  brand TEXT NOT NULL,
  model TEXT,
  url TEXT NOT NULL
);
CREATE TABLE applications (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL

);
CREATE TABLE computers_applications (
    computer_id BIGINT REFERENCES computers(id),
    application_id BIGINT REFERENCES applications(id),
    PRIMARY KEY(computer_id, application_id)
);
