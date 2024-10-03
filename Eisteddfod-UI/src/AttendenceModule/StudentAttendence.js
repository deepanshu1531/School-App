import React from 'react';
import axios from 'axios';
import NavigationBar from '../NavigationBar/NavigationBar';
import Constants from '../Constants';
import Loader from '../LoaderModule/Loader';

export default class StudentAttendence extends React.Component {

    state = {
        applyBtnCls: 'btn btn-primary',
        classFilter: '',
        secFilter: '',
        selectedDate: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
        currentStatus: "PRESENT",
        students: [
            {
                name: "",
                class: "Play",
                section: "1",
                rollNo: "",
                studentId: "",
                attendance: [
                    {
                        date: "YYYY-MM-DD",
                        Status: ""
                    },
                    {
                        date: "",
                        Status: ""
                    }
                ]
            }
        ]
    }

    dateSelect = (e) => {
        this.setState({ selectedDate: e.target.value });
    }

    statusSelect = (e) => {
        this.setState({ currentStatus: e.target.value });
    }

    classFilter = (e) => {
        this.setState({ classFilter: e.target.value });
    }

    secFilter = (e) => {
        this.setState({ secFilter: e.target.value });
    }

    onApply = async (e, id) => {
        e.preventDefault();
        if (this.state.selectedDate !== "" && this.state.currentStatus !== "") {
            let val = {
                date: this.state.selectedDate,
                status: this.state.currentStatus
            }
            let res = await axios.post(Constants.BACKEND_URL + "addStudentAttendance/" + id, val);
            if (res === "Error") {
                alert(res);
            }
            else {
                this.setState({ applyBtnCls: 'btn btn-success' });
            }
        } else {
            alert("Please select date and status of attendence.")
        }
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

    onSearch = async (searchVal) => {
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
                <NavigationBar onSubmitForm={this.onSearch}></NavigationBar>
                <br />
                <div className='container'>
                    <div className='table-responsive-xxl'>
                        <Loader show={!this.state.show} />
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">
                                        <select name='attendence' className='form-control' onChange={this.classFilter}>
                                            <option value=''>Class</option>
                                            <option value="PLAY">PLAY</option>
                                            <option value="NURSERY">NURSERY</option>
                                            <option value="LKG">LKG</option>
                                            <option value="UKG">UKG</option>
                                        </select>
                                        <br />
                                        &nbsp;Roll No
                                    </th>
                                    <th scope="col">
                                        <div className="form-row form-row-1">
                                            <input type='text' className='form-control' placeholder='Section' onChange={this.secFilter} />
                                        </div>
                                        <br />
                                        &nbsp;Class
                                    </th>
                                    <th scope="col">
                                        <input className='form-control' type='date' name='date' onChange={this.dateSelect} />
                                        <br />
                                        &nbsp;Name
                                    </th>
                                    <th scope="col"><br />Status</th>
                                    <th scope="col"><br />Action</th>
                                </tr>
                            </thead>
                            {this.state.students.map(student => (
                                (student.class === this.state.classFilter && student.section === this.state.secFilter)
                                    ?
                                    <tbody>
                                        <tr>
                                            <td>&nbsp;{student.rollNo}</td>
                                            <td>&nbsp;{student.class} - {student.section}</td>
                                            <td>&nbsp;{student.name}</td>
                                            <td>
                                                <select name='attendence' className='form-control' onChange={this.statusSelect}>
                                                    <option className="option" value="PRESENT">PRESENT</option>
                                                    <option className="option" value="ABSENT">ABSENT</option>
                                                </select>
                                            </td>
                                            <td><button type='button' className={this.state.applyBtnCls} onClick={e => this.onApply(e, student.studentId)}>Apply</button></td>
                                        </tr>
                                    </tbody>
                                    :
                                    <></>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}