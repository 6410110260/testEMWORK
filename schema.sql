CREATE DATABASE work_log;

USE work_log;

CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_type ENUM('Development', 'Test', 'Document') NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    status ENUM('ดำเนินการ', 'เสร็จสิ้น', 'ยกเลิก') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
