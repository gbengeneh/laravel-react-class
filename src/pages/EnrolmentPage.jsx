import { useMemo, useState } from 'react';

const availableStudents = ['John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis'];
const availableCourses = ['CSC 101', 'MTH 102', 'PHY 104'];
const initialEnrolments = [
  { id: 1, student: 'John Doe', course: 'CSC 101', session: '2026/2027', status: 'Enrolled' },
  { id: 2, student: 'Jane Smith', course: 'MTH 102', session: '2026/2027', status: 'Enrolled' },
  { id: 3, student: 'Emily Davis', course: 'PHY 104', session: '2025/2026', status: 'Completed' },
];

const EnrolmentsPage = () => {
  const [enrolments, setEnrolments] = useState(initialEnrolments);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ student: availableStudents[0], course: availableCourses[0], session: '2026/2027', status: 'Enrolled' });

  const filteredEnrolments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return enrolments.filter((item) => `${item.student} ${item.course}`.toLowerCase().includes(query));
  }, [enrolments, search]);

  const submit = (event) => {
    event.preventDefault();
    const exists = enrolments.some((item) => item.student === form.student && item.course === form.course && item.session === form.session);
    if (exists) return window.alert('This student is already enrolled in that course for the selected session.');
    setEnrolments((current) => [{ ...form, id: crypto.randomUUID() }, ...current]);
    setShowForm(false);
  };

  return (
    <section className="panel">
      <div className="page-heading"><div><h1>Enrolments</h1><p>Assign students to courses</p></div><button type="button" onClick={() => setShowForm((value) => !value)}>{showForm ? 'Close form' : 'New enrolment'}</button></div>
      {showForm && <form className="form-card" onSubmit={submit}>
        <label>Student<select value={form.student} onChange={(e) => setForm({...form, student:e.target.value})}>{availableStudents.map((student) => <option key={student}>{student}</option>)}</select></label>
        <label>Course<select value={form.course} onChange={(e) => setForm({...form, course:e.target.value})}>{availableCourses.map((course) => <option key={course}>{course}</option>)}</select></label>
        <label>Academic session<input required value={form.session} onChange={(e) => setForm({...form, session:e.target.value})} /></label>
        <label>Status<select value={form.status} onChange={(e) => setForm({...form, status:e.target.value})}><option>Enrolled</option><option>Completed</option><option>Dropped</option></select></label>
        <div className="form-actions"><button type="submit">Save enrolment</button></div>
      </form>}
      <div className="toolbar single-control"><label>Search enrolments<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by student or course..." /></label></div>
      <div className="table-wrap"><table><thead><tr><th>Student</th><th>Course</th><th>Session</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {filteredEnrolments.map((item) => <tr key={item.id}><td><strong>{item.student}</strong></td><td>{item.course}</td><td>{item.session}</td><td><span className={`badge ${item.status.toLowerCase()}`}>{item.status}</span></td><td><button type="button" className="danger" onClick={() => setEnrolments((current) => current.filter((entry) => entry.id !== item.id))}>Remove</button></td></tr>)}
      </tbody></table>{filteredEnrolments.length === 0 && <div className="empty">No matching enrolments found.</div>}</div>
    </section>
  )
}

export default EnrolmentsPage
