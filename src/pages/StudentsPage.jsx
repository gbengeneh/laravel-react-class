import { useMemo, useState } from 'react';
import initialStudents from '../data/students';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';

const StudentsPage = ({ students: incomingStudents = initialStudents }) => {
  const [students, setStudents] = useState(incomingStudents);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const clearFilters = () => {
    setSearch('');
    setStatus('All');
  };

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    return students.filter((student) => {
      const matchesText =
        student.name.toLowerCase().includes(query) ||
        student.matricNo.toLowerCase().includes(query);
      const matchesStatus = status === 'All' || student.status === status;
      return matchesText && matchesStatus;
    });
  }, [students, search, status]);

  const openAddForm = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEditForm = (student) => {
    setEditing(student);
    setShowForm(true);
  };

  const closeForm = () => {
    setEditing(null);
    setShowForm(false);
  };

  const saveStudent = (form) => {
    if (editing) {
      setStudents((current) =>
        current.map((student) =>
          student.id === editing.id ? { ...student, ...form } : student
        )
      );
    } else {
      setStudents((current) => [
        { ...form, id: crypto.randomUUID() },
        ...current,
      ]);
    }
    closeForm();
  };
  
  const removeStudent = id => {
    if (window.confirm('Remove this student?')) {
      setStudents((current) => current.filter((student) => student.id !== id));
      if (editing?.id === id) closeForm();
    }
  };

  return (
    <section className='panel'>
      <div className='page-heading'>
        <div>
          <h1>Students</h1>
          <p>Manage and view student information</p>
        </div>
        <button type='button' onClick={openAddForm}>Add student</button>
      </div>

      {showForm && (
        <StudentForm
          key={editing?.id ?? 'new'}
          initialValue={editing}
          onSave={saveStudent}
          onCancel={closeForm}
          students={students}
          editingId={editing?.id}
        />
      )}

      <div className='toolbar'>
        <label>
          Search Students
          <input
            type='text'
            placeholder='Search by name or matric number...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value='All'>All</option>
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </label>
      </div>
      <div className="results-summary">
        <p>showing {filteredStudents.length} of {students.length} students</p>
        {(search || status !== "All") && (
          <button type="button" className="secondary" onClick={clearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <div className='panel'>
        <StudentTable
          students={filteredStudents}
          onEdit={openEditForm}
          onRemove={removeStudent}
        />
      </div>
    </section>
  );
};

export default StudentsPage;
