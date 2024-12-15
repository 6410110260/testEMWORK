const mysql = require('mysql2');

// กำหนดค่าการเชื่อมต่อ
const db = mysql.createConnection({
    host: 'localhost',       // หรือ IP Address ของเซิร์ฟเวอร์ MySQL
    user: 'root',            // ชื่อผู้ใช้ MySQL
    password: '099768180Nn', // รหัสผ่านของ MySQL (ถ้ามี)
    database: 'work_log'     // ชื่อฐานข้อมูล
});

// ทดสอบการเชื่อมต่อ
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = db;
