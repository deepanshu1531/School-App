import React from 'react';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';
import constants from '../Constants';
import axios from 'axios';

export default class Email extends React.Component {
    state = {
        users: [{
            name: "",
            email: ""
        }],
        students: [{
            name: "",
            email: ""
        }]
    }

    mailObj = {
        subject: '',
        body: '',
        to: [] ,
        cc:[]
    }

    async componentDidMount() {
        let userListArr = await axios.get(constants.BACKEND_URL + "getAllTeachers");
        let stdListArr = await axios.get(constants.BACKEND_URL + "getAllStudents");
        if(userListArr.data !== "Error" &&  stdListArr !== "Error"){
            this.setState({
                users: userListArr.data,
                students: stdListArr.data
            })
        }else{
            alert("error in getting data...");
        }
        
    }

    onToCheck = (e) => {
        if (e.target.checked) {
            this.setState({
                to: this.mailObj.to.push(e.target.value)
            })
        } else {
            let index = this.mailObj.to.indexOf(e.target.value);
            this.setState({
                to: this.mailObj.to.splice(index, 1)
            })
        }
        console.log(this.mailObj.to);
    }

    onCcCheck = (e) => {
        if (e.target.checked) {
            this.setState({
                cc: this.mailObj.cc.push(e.target.value)
            })
        } else {
            let index = this.mailObj.cc.indexOf(e.target.value);
            this.setState({
                cc: this.mailObj.cc.splice(index, 1),
            })
        }
        console.log(this.mailObj.cc);
    }

    onFormSubmit =async  (e) => {
        e.preventDefault();
        if (e.target.subject.value === '') {
            alert("Please add subject line.")
            return
        }
        else {
            this.mailObj.subject = e.target.subject.value;
        }
        if (e.target.mailBody.value === '') {
            alert("Please add mail body.");
            return
        }
        else {
            this.mailObj.body = e.target.mailBody.value;
        }
        if (this.mailObj.to.length === 0) {
            alert("Please select receipent mail address.");
            return
        }
        let res = await axios.post(constants.BACKEND_URL + "sendEmails", this.mailObj)
        if(res.data === "Sucess"){
            alert(res.data);
            window.location.reload();
        }else{
            alert(res.data);
            return;
        }
    }

    render() {
        return (
            <>
                <NavigationBarPro/>
                <br/><br/>
                <div className="container">
                    <form onSubmit={e => this.onFormSubmit(e)}>
                        <div className="mb-3">
                            <input type="text" name="subject" className="form-control" placeholder="Subject" style={{ width: "100%", maxWidth: "100%",maxHeight: "100%"}} />
                        </div>
                        <div className="row g-1">
                            <div className="col-auto">
                                <div className="mb-3">
                                    <textarea className="form-control" name="mailBody" style={{ width: "914px", height: "400px",  maxWidth: "100%",maxHeight: "100%"}} rows="3" placeholder="Type your email"></textarea>
                                </div>
                            </div>
                            <div className="col-auto" style={{ color:"white", overflowY: "scroll", width: "200px", height: "400px",  maxWidth: "100%",maxHeight: "100%" }}>
                                <h4>Select Teachers</h4>
                                &nbsp;to:&nbsp;cc:
                                {this.state.users.map(user => (
                                    <>
                                        <div>
                                            &nbsp;
                                            <input className="form-check-input" type="checkbox" name="toCheck" value={user.email} onClick={e => this.onToCheck(e)} />&nbsp;
                                            <input className="form-check-input" type="checkbox" name="ccCheck" value={user.email} onClick={e => this.onCcCheck(e)} />&nbsp;
                                            <label className="form-check-label" for="flexCheckDefault">
                                                {user.name}
                                            </label>
                                        </div>
                                    </>
                                ))}
                                <hr/>
                                <h4>Select Students</h4>
                                &nbsp;to:&nbsp;cc:
                                {this.state.students.map(student => (
                                    <>
                                        <div>
                                            &nbsp;
                                            <input className="form-check-input" type="checkbox" name="toCheck" value={student.email} onClick={e => this.onToCheck(e)} />&nbsp;
                                            <input className="form-check-input" type="checkbox" name="ccCheck" value={student.email} onClick={e => this.onCcCheck(e)} />&nbsp;
                                            <label className="form-check-label" for="flexCheckDefault">
                                                {student.name}
                                            </label>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success" style={{ width: "1115px", maxWidth: "100%",maxHeight: "100%" }}>Send Mail</button>
                    </form>
                </div >
            </>
        )
    }
}
