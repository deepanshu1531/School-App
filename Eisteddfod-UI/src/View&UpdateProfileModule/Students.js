import React from 'react';
import axios from 'axios';
import NavigationBar from '../NavigationBar/NavigationBar';
import StudentList from './StudentList';
import Constants from '../Constants';
import Loader from '../LoaderModule/Loader';


export default class Students extends React.Component {
    teachers = undefined;

    state = {
        show: false,
        students: [
            {
                name: "",
                class: "",
                section: "",
                image: "",
                address: "",
                mob: "",
                email: "",
                studentId: "",
            }
        ]
    }

    searchStudent = async (val) => {
        return this.state.students.filter(student => student.name.toLocaleLowerCase().includes(val.toLowerCase()));
    }

    async componentDidMount() {
        this.students = await axios.get(Constants.BACKEND_URL + "getAllStudents");
        this.setState({
            students: this.students.data,
            show: true
        })
    }

    onFormSubmit = async (searchVal) => {
        this.setState({ show: false });
        this.setState({
            students: await this.searchStudent(searchVal),
            show: true
        })
    }

    async componentDidUpdate() {
        this.state.students = this.students.data;
    }

    render() {
        return (
            <div>
                <NavigationBar onSubmitForm={this.onFormSubmit}></NavigationBar>
                <Loader show={!this.state.show} />
                <div>
                    <StudentList students={this.state.students} />
                </div>
            </div>
        );
    }
}