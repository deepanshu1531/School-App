import React from 'react';
import axios from 'axios';
import NavigationBar from '../NavigationBar/NavigationBar';
import TeacherList from './TeacherList';
import Constants from '../Constants';
import Loader from '../LoaderModule/Loader';


export default class Teachers extends React.Component {
    teachers = undefined;

    state = {
        show: false,
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
            teachers: this.teachers.data,
            show: true
        })
    }

    onFormSubmit = async (searchVal) => {
        this.setState({ show: false });
        this.setState({
            teachers: await this.searchTeacher(searchVal),
            show: true
        })
    }

    async componentDidUpdate() {
        this.state.teachers = this.teachers.data;
    }

    render() {
        return (
            <div>
                <NavigationBar onSubmitForm={this.onFormSubmit}></NavigationBar>
                <Loader show={!this.state.show} />
                <div>
                    <TeacherList teachers={this.state.teachers} />
                </div>
            </div>
        );
    }
}