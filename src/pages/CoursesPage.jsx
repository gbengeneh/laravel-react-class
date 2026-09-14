import { useMemo, useState } from 'react';

const initialCourses = [
  { id: 1, code: 'CSC 101', title: 'Introduction to Computing', units: 3, status: 'Active' },
  { id: 2, code: 'MTH 102', title: 'Elementary Mathematics', units: 3, status: 'Active' },
  { id: 3, code: 'PHY 104', title: 'General Physics', units: 2, status: 'Inactive' },
];

const CoursesPage = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', title: '', units: '3', status: 'Active' });

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return courses.filter((course) =>
      `${course.code} ${course.title}`.toLowerCase().includes(query)
    );
  }, [courses, search]);

  const submit = (event) => {
    event.preventDefault();
    if (!form.code.trim() || !form.title.trim()) return;
    setCourses((current) => [
      { ...form, id: crypto.randomUUID(), units: Number(form.units) },
      ...current,
    ]);
    setForm({ code: '', title: '', units: '3', status: 'Active' });
    setShowForm(false);
  };

  return (
    <section className="panel">
      <div className="page-heading">
        <div><h1>Courses</h1><p>Create and manage available courses</p></div>
        <button type="button" onClick={() => setShowForm((value) => !value)}>
          {showForm ? 'Close form' : 'Add course'}
        </button>
      </div>

      {showForm && <form className="form-card" onSubmit={submit}>
        <label>Course code<input required value={form.code} onChange={(e) => setForm({...form, code:e.target.value})} placeholder="e.g. CSC 101" /></label>
        <label>Course title<input required value={form.title} onChange={(e) => setForm({...form, title:e.target.value})} placeholder="Course title" /></label>
        <label>Units<select value={form.units} onChange={(e) => setForm({...form, units:e.target.value})}><option>1</option><option>2</option><option>3</option><option>4</option></select></label>
        <label>Status<select value={form.status} onChange={(e) => setForm({...form, status:e.target.value})}><option>Active</option><option>Inactive</option></select></label>
        <div className="form-actions"><button type="submit">Save course</button></div>
      </form>}

      <div className="toolbar single-control">
        <label>Search courses<input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by code or title..." /></label>
      </div>
      <div className="table-wrap"><table><thead><tr><th>Code</th><th>Course title</th><th>Units</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{filteredCourses.map((course) => <tr key={course.id}><td><strong>{course.code}</strong></td><td>{course.title}</td><td>{course.units}</td><td><span className={`badge ${course.status.toLowerCase()}`}>{course.status}</span></td><td><button type="button" className="danger" onClick={() => setCourses((current) => current.filter((item) => item.id !== course.id))}>Remove</button></td></tr>)}</tbody>
      </table>{filteredCourses.length === 0 && <div className="empty">No matching courses found.</div>}</div>
    </section>
  )
}

export default CoursesPage
