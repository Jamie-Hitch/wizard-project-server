DROP TABLE IF EXISTS entities CASCADE;
DROP TABLE IF EXISTS incidents CASCADE;
DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE entities (
    entity_id INT GENERATED ALWAYS AS IDENTITY,
    entity_name VARCHAR (50) NOT NULL,
    PRIMARY KEY (entity_id)
);

INSERT INTO entities (entity_name)
VALUES ('Hagrid'), ('Gandalf'), ('Dumbledore'), ('Saruman');

CREATE TABLE locations (
    location_id INT GENERATED ALWAYS AS IDENTITY,
    location_name VARCHAR (50) NOT NULL,
    PRIMARY KEY (location_id)
);

INSERT INTO locations (location_name)
VALUES ('Fleet Street'), ('New Zealand'), ('Bristol'), ('Paris');

CREATE TABLE incidents (
    incident_id INT GENERATED ALWAYS AS IDENTITY,
    entity_id INT NOT NULL,
    location_id INT NOT NULL,
    description VARCHAR(200),
    severity INT NOT NULL CHECK (severity >= 0 AND severity <= 10),
    date_time DATE,
    PRIMARY KEY (incident_id),
    FOREIGN KEY (entity_id) REFERENCES entities (entity_id) ON DELETE CASCADE,
    FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE
);

INSERT INTO incidents (entity_id, location_id, description, severity, date_time)
VALUES (1, 3, 'A giant flew his motorbike over my house!', 2, '2022-10-18');
