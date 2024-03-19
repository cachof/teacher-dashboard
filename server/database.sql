CREATE DATABASE teacher_dashboard;

\c teacher_dashboard;

CREATE TABLE Teachers(
    teacher_id          SERIAL PRIMARY KEY NOT NULL, 
    first_name          VARCHAR(50) NOT NULL,
    last_name           VARCHAR(50) NOT NULL
);

CREATE TABLE Classes(
    class_id          SERIAL PRIMARY KEY NOT NULL,
    topic              VARCHAR(50) NOT NULL,
    teacher_id           SERIAL REFERENCES Teachers
);

CREATE TABLE Students(
    student_id          SERIAL PRIMARY KEY NOT NULL, 
    first_name          VARCHAR(50) NOT NULL,
    last_name           VARCHAR(50) NOT NULL,
    dob                 DATE NOT NULL,
    class_id            SERIAL REFERENCES Classes
);

CREATE TABLE Assignments(
    assignment_id          SERIAL PRIMARY KEY NOT NULL,
    assignment_title       VARCHAR(50) NOT NULL,
    instructions           VARCHAR(250) NOT NULL,
    due_date               DATE NOT NULL,
    is_published           BOOLEAN DEFAULT false,
    class_id               SERIAL REFERENCES Classes     
);

CREATE TABLE Questions(
    question_id         SERIAL PRIMARY KEY NOT NULL,
    question_text       VARCHAR(250) NOT NULL,
    correct_answer      VARCHAR(250) NOT NULL,
    point_value         INT NOT NULL,
    assignment_id       SERIAL REFERENCES Assignments
);

INSERT INTO Teachers(first_name, last_name) VALUES ('Fatima', 'Cacho');
INSERT INTO Teachers(first_name, last_name) VALUES ('Chrissy', 'Villa');


INSERT INTO Classes(topic, teacher_id) VALUES ('Math', 1);
INSERT INTO Classes(topic, teacher_id) VALUES ('ASL', 1);
INSERT INTO Classes (topic, teacher_id)
VALUES ('ASL', 
    (SELECT teacher_id FROM Teachers WHERE last_name = 'Villa')
    );


INSERT INTO Students (first_name, last_name, dob, class_id)
VALUES 
  ('Alice', 'Adams', '2009-04-15', 1),
  ('Benjamin', 'Brown', '2010-08-24', 1);

INSERT INTO Assignments (assignment_title, instructions, due_date, class_id)
VALUES ('Multiplication', 'Use multiplication to answer these questions', '2024-01-20', 1
    );

INSERT INTO Assignments (assignment_title, instructions, due_date, is_published, class_id)
VALUES ('Addition', 'Use addition to answer these questions', '2024-01-09', true, 1
    );

INSERT INTO Assignments (assignment_title, instructions, due_date, is_published, class_id)
VALUES ('Subtraction', 'Use Subtraction to answer these questions', '2025-01-09', true, 1
    );

INSERT INTO Assignments (assignment_title, instructions, due_date, is_published, class_id)
VALUES ('Division', 'Use Division to answer these questions', '2024-05-09', false, 1);

INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id)
VALUES
    ('10 x 3', '30', '5', 
    (SELECT assignment_id FROM Assignments WHERE assignment_title='Multiplication')
    );

INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id)
VALUES
    ('13 x 7', '91', '10', 
    (SELECT assignment_id FROM Assignments WHERE assignment_title='Multiplication')
    );

INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id)
VALUES
    ('5 + 8', '13', '5', 
    (SELECT assignment_id FROM Assignments WHERE assignment_title='Addition')
);

INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id)
VALUES
    ('15 + 23', '38', '7', 
    (SELECT assignment_id FROM Assignments WHERE assignment_title='Addition')
);

INSERT INTO Questions(question_text, correct_answer, point_value, assignment_id)
VALUES
    ('40 + 17', '57', '8', 
    (SELECT assignment_id FROM Assignments WHERE assignment_title='Addition')
);