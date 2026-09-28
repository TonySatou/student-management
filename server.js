const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'student_user',
  password: process.env.DB_PASSWORD || 'student_pass_123',
  database: process.env.DB_NAME || 'student_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const db = pool.promise();

async function initDB() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        mssv VARCHAR(20) UNIQUE NOT NULL,
        fullname VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        major VARCHAR(100) NOT NULL,
        gpa FLOAT NOT NULL
      )
    `);

    const [rows] = await db.query('SELECT COUNT(*) as count FROM students');
    if (rows[0].count === 0) {
      await db.query(`
        INSERT INTO students (mssv, fullname, email, major, gpa) VALUES 
        ('SV001', 'Nguyễn Văn A', 'nguyenvana@gmail.com', 'Công nghệ thông tin', 3.6),
        ('SV002', 'Trần Thị B', 'tranthib@gmail.com', 'Kinh tế số', 3.2)
      `);
      console.log('Đã tạo dữ liệu mẫu thành công!');
    }
  } catch (err) {
    console.error('Lỗi khởi tạo CSDL:', err.message);
  }
}

initDB();

app.get('/api/students', async (req, res) => {
  const search = req.query.search || '';
  try {
    const [rows] = await db.query(
      `SELECT * FROM students WHERE fullname LIKE ? OR mssv LIKE ? ORDER BY id DESC`,
      [`%${search}%`, `%${search}%`]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/students', async (req, res) => {
  const { mssv, fullname, email, major, gpa } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO students (mssv, fullname, email, major, gpa) VALUES (?, ?, ?, ?, ?)`,
      [mssv, fullname, email, major, parseFloat(gpa)]
    );
    res.status(201).json({ id: result.insertId, mssv, fullname, email, major, gpa });
  } catch (err) {
    res.status(400).json({ error: 'MSSV đã tồn tại hoặc thiếu dữ liệu!' });
  }
});

app.delete('/api/students/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM students WHERE id = ?', [req.params.id]);
    res.json({ message: 'Xóa thành công!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server Node.js đang chạy tại cổng ${PORT}`);
});
