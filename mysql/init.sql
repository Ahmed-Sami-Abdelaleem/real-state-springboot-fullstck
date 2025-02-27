CREATE DATABASE IF NOT EXISTS taskmanagement;
USE taskmanagement;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('TODO', 'IN_PROGRESS', 'DONE') DEFAULT 'TODO',
    priority ENUM('LOW', 'MEDIUM', 'HIGH') DEFAULT 'MEDIUM',
    due_date DATE,
    user_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert a test user
INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@taskmanagement.com', '$2a$10$XgXAu7rGzYQcMn2fPeBgR.ACgPLZPhqDT9GkTAOnFCdNjQ0rplXGq');  -- Password: @dm1n_P@ssw0rd!

-- Insert some sample tasks
INSERT INTO tasks (title, description, status, priority, due_date, user_id) VALUES 
('Setup Project', 'Initialize the project structure and dependencies', 'DONE', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 1 DAY), 1),
('Implement User Authentication', 'Create login and registration functionality', 'IN_PROGRESS', 'HIGH', DATE_ADD(CURRENT_DATE, INTERVAL 3 DAY), 1),
('Design Database Schema', 'Design and implement database tables', 'DONE', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL -1 DAY), 1),
('Create REST API', 'Implement backend REST APIs for task management', 'TODO', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL 5 DAY), 1),
('Develop Frontend UI', 'Create responsive user interface for the application', 'TODO', 'MEDIUM', DATE_ADD(CURRENT_DATE, INTERVAL 7 DAY), 1);