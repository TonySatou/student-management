const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) console.error('Lỗi CSDL:', err.message);
  else console.log('Đã kết nối SQLite Database.');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      mssv TEXT UNIQUE NOT NULL,
      fullname TEXT NOT NULL,
      email TEXT NOT NULL,
      major TEXT NOT NULL,
      gpa REAL NOT NULL
    )
  `, () => {
    db.get('SELECT COUNT(*) as count FROM students', (err, row) => {
      if (row.count === 0) {
        const stmt = db.prepare('INSERT INTO students (mssv, fullname, email, major, gpa) VALUES (?, ?, ?, ?, ?)');
        stmt.run('SV001', 'Nguyễn Văn A', 'nguyenvana@gmail.com', 'Công nghệ thông tin', 3.6);
        stmt.run('SV002', 'Trần Thị B', 'tranthib@gmail.com', 'Kinh tế số', 3.2);
        stmt.finalize();
      }
    });
  });
});

app.get('/api/students', (req, res) => {
  const search = req.query.search || '';
  db.all(`SELECT * FROM students WHERE fullname LIKE ? OR mssv LIKE ? ORDER BY id DESC`, [`%${search}%`, `%${search}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/students', (req, res) => {
  const { mssv, fullname, email, major, gpa } = req.body;
  db.run(`INSERT INTO students (mssv, fullname, email, major, gpa) VALUES (?, ?, ?, ?, ?)`, 
    [mssv, fullname, email, major, parseFloat(gpa)], function (err) {
      if (err) return res.status(400).json({ error: 'MSSV đã tồn tại hoặc thiếu dữ liệu!' });
      res.status(201).json({ id: this.lastID, mssv, fullname, email, major, gpa });
  });
});

app.delete('/api/students/:id', (req, res) => {
  db.run('DELETE FROM students WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Xóa thành công!' });
  });
});

app.listen(PORT, () => {
  console.log(`Server chạy tại: http://localhost:${PORT}`);
});
