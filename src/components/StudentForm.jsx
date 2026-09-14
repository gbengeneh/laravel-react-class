import { useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  matricNo: "",
  department: "",
  level: "100",
  status: "Active",
};

const StudentForm = ({
  initialValue,
  onSave,
  onCancel,
  students = [],
  editingId,
}) => {
  const [form, setForm] = useState(initialValue ?? emptyForm);
  const [errors, setErrors] = useState({});
  const change = (e) =>
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email.";
    if (!form.matricNo.trim()) next.matricNo = "Matric number is required.";
    const duplicate = students.some(
      (student) =>
        student.id !== editingId &&
        student.matricNo.toLowerCase() === form.matricNo.trim().toLowerCase()
    );
    if (duplicate) next.matricNo = "Matric number already exists.";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave(form);
  };
  return (
    <form className="form-card" onSubmit={submit} noValidate>
      {["name", "email", "matricNo", "department"].map((field) => (
        <label key={field}>
          {field}
          <input name={field} value={form[field]} onChange={change} />
          {errors[field] && <small className="error">{errors[field]}</small>}
        </label>
      ))}
      <label>
        Level
        <select name="level" value={form.level} onChange={change}>
          <option>100</option>
          <option>200</option>
          <option>300</option>
          <option>400</option>
        </select>
      </label>
      <label>
        Status
        <select name="status" value={form.status} onChange={change}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </label>
      <div className="form-actions">
        <button type="button" className="secondary" onClick={onCancel}>
          Cancel
        </button>
        <button>Save student</button>
      </div>
    </form>
  );
};

export default StudentForm;
