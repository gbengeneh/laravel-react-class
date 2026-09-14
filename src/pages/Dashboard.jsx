import StatCard from '../components/StatCard';
import initialStudents from '../data/students';

const Dashboard = () => {
  const students = initialStudents;
  const activeStudents = students.filter((student) => student.status === 'Active');
  const inactiveStudents = students.filter((student) => student.status === 'Inactive');

  return (
    <>
      <section className='cards'>
        <StatCard
          label='Total Students'
          value={students.length}
          helper='All students in the system'
        />
        <StatCard
          label='Active Students'
          value={activeStudents.length}
          helper='Students currently enrolled'
        />
        <StatCard
          label='Inactive Students'
          value={inactiveStudents.length}
          helper='Students not currently enrolled'
        />
      </section>

      <section className='panel'>
        <h1>Dashboard</h1>
        <p>Welcome to the campus portal dashboard.</p>
      </section>
    </>
  );
};

export default Dashboard;
