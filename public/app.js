const API_URL = '/api/students';

async function fetchStudents(search = '') {
  const res = await fetch(`${API_URL}?search=${encodeURIComponent(search)}`);
  const students = await res.json();
  const list = document.getElementById('student-list');
  list.innerHTML = '';

  students.forEach(sv => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${sv.mssv}</b></td>
      <td>${sv.fullname}</td>
      <td>${sv.email}</td>
      <td>${sv.major}</td>
      <td>${sv.gpa}</td>
      <td><button class="btn btn-danger" onclick="deleteStudent(${sv.id})">Xóa</button></td>
    `;
    list.appendChild(tr);
  });
}

document.getElementById('student-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const student = {
    mssv: document.getElementById('mssv').value,
    fullname: document.getElementById('fullname').value,
    email: document.getElementById('email').value,
    major: document.getElementById('major').value,
    gpa: document.getElementById('gpa').value
  };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student)
  });

  if (res.ok) {
    e.target.reset();
    fetchStudents();
  } else {
    const err = await res.json();
    alert(err.error);
  }
});

async function deleteStudent(id) {
  if (confirm('Bạn chắc chắn muốn xóa?')) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchStudents();
  }
}

document.getElementById('search-input').addEventListener('input', (e) => {
  fetchStudents(e.target.value);
});

fetchStudents();
