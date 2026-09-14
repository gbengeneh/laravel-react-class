import { createBrowserRouter } from "react-router-dom";
import PortalLayout from "./layouts/PortalLayout";
import Dashboard from "./pages/Dashboard";
import StudentsPage from "./pages/StudentsPage";
import CoursesPage from "./pages/CoursesPage";
import EnrolmentsPage from "./pages/EnrolmentPage";


export const router=createBrowserRouter([
  {
    path:"/", element:<PortalLayout/>, children:[
      {index:true, element:<Dashboard/>},
      {path:"students", element:<StudentsPage/>},
      {path: 'courses', element: <CoursesPage/>},
      {path: 'enrolments', element: <EnrolmentsPage/>},
]},
{path:"*", element:<div className="not-found"><h1>404</h1><p>Page not found.</p></div>}
]);
