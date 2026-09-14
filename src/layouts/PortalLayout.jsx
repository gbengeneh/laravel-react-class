import { NavLink,Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
export default function PortalLayout(){
    return (
    <div className="app-shell">
        <aside className="sidebar">
            <div className="brand">CampusPortal</div>
            {['/','/students','/courses','/enrolments'].map((to,i)=>
            <NavLink key={to} end={to==='/'} className="nav-link" to={to}>
                {['Dashboard','Students','Courses','Enrolments'][i]}
            </NavLink>)}
        </aside>
        <main className="main">
            <Header />
            <Breadcrumb />
            <Outlet/>
        </main>
    </div>
)
}
    
