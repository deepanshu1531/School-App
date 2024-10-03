import React from 'react'
import NavigationBar from './NavigationBar';
import axios from 'axios';
import Constants from '../Constants';
import { Navigate } from "react-router-dom";
import Students from '../View&UpdateProfileModule/Students';

export default class NavigationBarPro extends React.Component {

    teachers = {
        data: {
            title: "",
            name: "",
            assignedTo: "",
            section: "",
            pic: "",
            add: "",
            mob: "",
            email: "",
            teacherId: "",
        }
    };

    state = {
        teachers: [
            {
                title: "Mrs.",
                name: "Betu Soni",
                assignedTo: "not assigned",
                section: "",
                pic: "http://localhost:3000/getTeacherImage/4209012",
                add: "Gohalpur Amkhera road\njbp, PIN: 482001,\nIndia",
                mob: "+91-9131283016",
                email: "anjalisoni655@gmail.com",
                teacherId: "4209017",
            }
        ]
    }

    searchTeacher = async (val) => {
        return this.state.teachers.filter(teacher => teacher.name.toLocaleLowerCase().includes(val.toLowerCase()));
    }

    async componentDidMount() {
        this.teachers = await axios.get(Constants.BACKEND_URL + "getAllTeachers");
        this.setState({
            teachers: this.teachers.data
        })
    }

    onFormSubmit = async (searchVal) => {
        this.setState({
            teachers: await this.searchTeacher(searchVal),
        })  
        window.location = "/teachers";     
    }

    async componentDidUpdate() {
        this.state.teachers = this.teachers.data;
    }

    render() {
        return (
            <NavigationBar onSubmitForm={this.onFormSubmit}></NavigationBar>
        );
    }
}