import React from 'react';
import Mainpage from './Mainpage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecruiterMainpage from './Recruiter/RecruiterMainpage';
import Login from './Student/Login';
import Register from './Student/Register';
import Studentmainpage from './Student/Studentmainpage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from '../ProtectedRoute';
import RecruiterProtectedRoute from './Recruiter/RecruiterProtectedRoute';
import RecruiterLogin from './Recruiter/RecruiterLogin';
import RecruiterRegister from './Recruiter/RecruiterRegister';
import ApplicationsList from './Recruiter/ApplicationsList';
import { StudentContext } from './Student/StudentContext';
import Adminlogin from './Admin/Adminlogin';
import AdminMainpage from './Admin/AdminMainpage';
import AdminProtectedRoute from './Admin/AdminProtectedRoute';
import AdminNotificationControl from './Admin/AdminNotificationControl';
import AdminRecruiterControl from './Admin/AdminRecruiterControl';
import AdminStudentControl from './Admin/AdminStudentControl';
import Adminstudentdetails from './Admin/Adminstudentdetails';
import AdminRecruiterDetails from './Admin/AdminRecruiterDetails';

const App = () => {
    return (
        <div>
       <StudentContext>
                        <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Mainpage />} />
                        <Route path='/student-login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/recruiter-login' element={<RecruiterLogin />} />
                        <Route path='/recruiter-register' element={<RecruiterRegister />} />
                        <Route path='/admin-login' element={<Adminlogin />} />
                        
                        {/* Wrap the element in ProtectedRoute */}
                        <Route path='/student-portal' element={<ProtectedRoute> <Studentmainpage /></ProtectedRoute>} />
                        <Route path='/recruiter-portal' element={<RecruiterProtectedRoute><RecruiterMainpage /></RecruiterProtectedRoute>} />
                        <Route path='/admin-portal' element={<AdminProtectedRoute><AdminMainpage /></AdminProtectedRoute>} />
                        <Route path='/admin-notification' element={<AdminProtectedRoute><AdminNotificationControl /></AdminProtectedRoute>} />
                        <Route path='/admin-student-control' element={<AdminProtectedRoute><AdminStudentControl /></AdminProtectedRoute>} />
                        <Route path='/admin-student-control-details/:id' element={<AdminProtectedRoute><Adminstudentdetails /></AdminProtectedRoute>} />
                        <Route path='/admin-recruiter-control' element={<AdminProtectedRoute><AdminRecruiterControl /></AdminProtectedRoute>} />
                        <Route path='/admin-recruiter-control-details/:id' element={<AdminProtectedRoute><AdminRecruiterDetails /></AdminProtectedRoute>} />
                        <Route path='/recruiter-portal-application-list/:id' element={<RecruiterProtectedRoute><ApplicationsList /></RecruiterProtectedRoute>} />
                    </Routes>
                </BrowserRouter>
                </StudentContext>

                <ToastContainer />
            
        </div>
    );
};

export default App;
