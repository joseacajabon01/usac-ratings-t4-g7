CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  registro VARCHAR(20) UNIQUE NOT NULL,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(20),
  name VARCHAR(200) NOT NULL,
  UNIQUE KEY code_unique (code)
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  course_id INT NULL,
  prof_name VARCHAR(150) NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  author_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS approved_courses (
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

-- Seed de cursos (área de sistemas)
INSERT INTO courses (code, name) VALUES ('ADS1', 'Análisis y Diseño de Sistemas 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ADS2', 'Análisis y Diseño de Sistemas 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ACyE1', 'Arquitectura de Computadoras y Ensambladores 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ACyE2', 'Arquitectura de Computadoras y Ensambladores 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('BD1', 'Bases de Datos 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('BD2', 'Bases de Datos 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ECON', 'Economía') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ED1', 'Estructura de Datos 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ED2', 'Estructura de Datos 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('GER1', 'Gerenciales 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('GER2', 'Gerenciales 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('IA1', 'Inteligencia Artificial 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('IPC1', 'Introducción a la Programación y Computación 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('IPC2', 'Introducción a la Programación y Computación 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('IAFD', 'Introducción a los Algoritmos y Flujos de Datos') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('LFP', 'Lenguajes Formales y de Programación') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('LSIS', 'Lógica de Sistemas') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('MIA', 'Manejo e Implementación de Archivos') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('MS1', 'Modelación y Simulación 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('MS2', 'Modelación y Simulación 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('ORGCOMP', 'Organización Computacional') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('OLC2', 'Organización de Lenguajes y Compiladores 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('PCOM1', 'Programación Comercial 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('PC1', 'Programación de Computadoras 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('PC2', 'Programación de Computadoras 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('RED1', 'Redes de Computadoras 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('RED2', 'Redes de Computadoras 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('SEM1', 'Seminario de Sistemas 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('SEM2', 'Seminario de Sistemas 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('SO1', 'Sistemas Operativos 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('SO2', 'Sistemas Operativos 2') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('SOG1', 'Sistemas Organizacionales y Gerenciales 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('SWAV', 'Software Avanzado') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('TS1', 'Teoría de Sistemas 1') ON DUPLICATE KEY UPDATE name=VALUES(name);
INSERT INTO courses (code, name) VALUES ('TS2', 'Teoría de Sistemas 2') ON DUPLICATE KEY UPDATE name=VALUES(name);