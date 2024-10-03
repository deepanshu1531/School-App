import React from 'react'
import Welcome from './Main/Welcome';
import Video from './VideoModule/Videos';
import Email from './E-MailModule/Email';
import Attendence from './AttendenceModule/ApplyAttendence';
import StudentAttendence from './AttendenceModule/StudentAttendence';
import Teacher from './View&UpdateProfileModule/Teachers';
import Student from './View&UpdateProfileModule/Students';
import TeacherViewAndUpdate from './View&UpdateProfileModule/TeacherViewUpdateModule';
import StudentViewAndUpdate from './View&UpdateProfileModule/StudentViewUpdateModule'
import TeacherRegisterModule from './RegisterModule/TeacherRegisterModule';
import StudentRegisterModule from './RegisterModule/StudentRegisterModule';
import LoginForm from './LoginModule/LoginForm';
import ResetForgetPassword from './LoginModule/ResetForgetPassword';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChangePassword from './LoginModule/ChangePassword';

export default class App extends React.Component {

  render() {
    return (
      <Router>
        {
          (localStorage.getItem('user') !== null)
            ?
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/videos" element={<Video />} />
              <Route path="/email" element={<Email />} />
              <Route path="/attendence" element={<Attendence />} />
              <Route path="/studentAttendence" element={<StudentAttendence />} />
              <Route path="/teachers" element={<Teacher />} />
              <Route path="/students" element={<Student />} />
              <Route path="/profile" element={<TeacherViewAndUpdate />} />
              <Route path="/studentProfile/:id" element={<StudentViewAndUpdate />} />
              <Route path="/teacherProfile/:id" element={<TeacherViewAndUpdate />} />
              <Route path="/registerTeacher" element={<TeacherRegisterModule />} />
              <Route path="/registerStudent" element={<StudentRegisterModule />} />
              <Route path="/changePassword" element={<ChangePassword />} />
            </Routes>
            :
            <Routes>
              <Route path="/" element={<LoginForm/>} />
              <Route path="/forgetPassword" element={<ResetForgetPassword />} />
            </Routes>
        }
      </Router>
    );
  }
}
