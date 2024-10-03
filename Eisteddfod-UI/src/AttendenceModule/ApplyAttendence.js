import React from 'react';
import Calendar from 'react-calendar';
import { RxCross1 } from 'react-icons/rx';
import './ApplyAttendence.css'
import Constants from '../Constants'
import axios from 'axios';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';

export default class ApplyAttendence extends React.Component {

    state = {
        popUpHide: true,
        selectedDate: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-'),
        currentStatus: "",

        // to be updates in session object as well
        attendance: [
            // {
            //     date: "2023-08-22",
            //     status: "ABSENT"
            // },
            // {
            //     date: "2023-08-23",
            //     status: "PRESENT"
            // },
            // {
            //     date: "2023-08-24",
            //     status: "LEAVE"
            // },
        ],
        leave: 5,
        leaveBalance: 4,
    }

    onDateClick = async (day) => {
        if (day > new Date()) {
            alert("Can't apply attendence for future date.")
            return;
        }
        if (day.getDate() < new Date().getDate() - 3 || day.getMonth() !== new Date().getMonth()) {
            alert("Can't apply attendence before a week.")
            return;
        }
        day = await day.toLocaleDateString('en-GB').split('/').reverse().join('-');
        this.setState({ selectedDate: day, popUpHide: !this.state.popUpHide, currentStatus: "" });
        document.getElementById("statusSelect").selectedIndex = "0";
    }

    onCloseClick = () => {
        this.setState({ popUpHide: true, currentStatus: "" })
        document.getElementById("statusSelect").selectedIndex = "0";
    }

    selectStatus = async (e) => {
        let status = await e.target.value
        this.setState({ currentStatus: status })
    }

    onApply = async (e) => {
        e.preventDefault();
        let user = await JSON.parse(localStorage.getItem('user'));
        if (this.state.selectedDate === "") {
            alert("please select attendence date");
            return;
        }
        if (this.state.currentStatus === "") {
            alert("please select attendence status");
            return;
        }
        if (this.state.currentStatus === "LEAVE") {
            if (this.state.leaveBalance == 0) {
                alert("Sorry! Insuffucient leaves.\nPlease mark as ABSENT or connect to admin.  ")
                return
            } else {
                let val = {
                    leaveBalance: parseInt(this.state.leaveBalance) - 1
                }
                let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + user.teacherId, val)
                if (res.data === "Success") {
                    this.setState({ leaveBalance: parseInt(this.state.leaveBalance) - 1 });
                    // update session object.
                } else {
                    alert(res.data + "in lb");
                    return;
                }
            }
        }
        let val = {
            date: this.state.selectedDate,
            status: this.state.currentStatus
        }
        let res = await axios.post(Constants.BACKEND_URL + "addAttendance/" + user.email, val)
        if (res.data === "Success") {
            this.setState({ attendance: [...this.state.attendance, val] });
            // update session object.
            this.onCloseClick();
            alert("Successfully Applied");
        } else {
            {
                alert(res.data);
                return;
            }
        }
    }


    setClass = (date) => {
        const dateobj =
            this.state.attendance.find((day) => {
                return (
                    date.getDay() === new Date(day.date).getDay() &&
                    date.getMonth() === new Date(day.date).getMonth() &&
                    date.getDate() === new Date(day.date).getDate()
                );
            });
        return dateobj ? dateobj.status : "";
    };

    render() {
        return (
            <>
                <NavigationBarPro />
                <div className='container'>
                    <div className='leavesDivOut card'>
                        <h3 className='h5class3'>Leaves</h3>
                        <div className='leavesDivIn card'>
                            <div className='row'>
                                <div className='col'><h6 className='h5class2'>Total Leaves-- {this.state.leave}</h6></div>
                                <div className='col'><h6 className='h5class2'>Availed Leave-- {this.state.leave - this.state.leaveBalance}</h6></div>
                                <div className='col'><h6 className='h5class2'>Balance Leaves-- {this.state.leaveBalance}</h6></div>
                            </div>
                        </div>
                    </div>
                    <br />
                    {/* popup start */}
                    <div className="container centerDiv popUp" id="popUp" hidden={this.state.popUpHide}>
                        <div style={{ textAlign: "right" }} class="text-right">
                            <button className="btn btn-light" onClick={this.onCloseClick} ><RxCross1 /></button>
                        </div>
                        <form onSubmit={e => this.onApply(e)}>
                            <br />
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Date</label>
                                <div class="col-sm-10">
                                    <input className="form-control" required type="text" disabled={true} id="date" value={this.state.selectedDate} />
                                </div>
                            </div>
                            <hr />
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Status</label>
                                <div class="col-sm-10">
                                    <select className="form-control" id="statusSelect" onChange={this.selectStatus}>
                                        <option className="option" value="">Select</option>
                                        <option className="option" value="PRESENT">PRESENT</option>
                                        <option className="option" value="ABSENT">ABSENT</option>
                                        <option className="option" value="LEAVE">LEAVE</option>
                                    </select>
                                </div>
                            </div>
                            <hr />
                            <div class="form-group row">
                                <div class="col-sm-10">
                                    <button type="submit" class="btn btn-primary">Apply</button>
                                </div>
                                <br/><br/>
                            </div>
                        </form>
                    </div>
                    {/* popup end */}
                    <div className='middleDiv'>
                        <Calendar className="react-calendar1" onClickDay={this.onDateClick} value={this.state.selectedDate}
                            tileClassName={({ activeStartDate, date, view }) => this.setClass(date)}
                        />
                    </div>
                </div >
            </>
        );
    }
}