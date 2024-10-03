import React from 'react';
import Attendence from '../AttendenceModule/Attendence';
import { AiFillEdit } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';
import Constants from '../Constants'
import './TeacherViewUpdateModule.css';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';

export default class TeacherViewUpdateModule extends React.Component {

    state = {
        editAccess: true,
        adminAccess: true,
        teacherObj: {
            title: "",
            name: "",
            gen: "",
            dob: "dd-mm-yyyy",
            doj: "dd-mm-yyyy",
            doe: "dd-mm-yyyy",
            assignedTo: "Play",
            section: "1",
            highQualification: "",
            passOut: "",
            prevOrg: "",
            workExp: "",
            aadhar: "",
            pan: "",
            pic: "",
            resume: "",
            docs: "",
            add: "",
            mob: "",
            email: "",
            isAdmin: "",
            password: "",
            teacherId: "",
            leave: "",
            leaveBalance: "",
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
    }

    async componentDidMount() {
        let handlerName = window.location.pathname;
        if (handlerName.includes("/teacherProfile")) {
            handlerName = handlerName.replace("/teacherProfile", "getTeacher");
            let obj = await axios.get(Constants.BACKEND_URL + handlerName);
            if (obj.data.isAdmin === 'yes')
                this.setState({ teacherObj: obj.data, editAccess: false, adminAccess: false })
            else
                this.setState({ teacherObj: obj.data, editAccess: true })
        }
        else {
            let user = await JSON.parse(localStorage.getItem('user'));
            this.setState({ teacherObj: user, editAccess: false });
        }
    }

    updateTitle = () => {
        if (document.getElementById("title").value === "") {
            alert("Please fill title field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                title: document.getElementById("title").value
            }
        }))
        setTimeout(async () => {
            let val = { "title": this.state.teacherObj.title }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("titleSaveBtn").setAttribute("hidden", true);
                document.getElementById("titleEditBtn").removeAttribute("hidden");
                document.getElementById("title").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateName = () => {
        if (document.getElementById("name").value === "") {
            alert("Please fill name field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                name: document.getElementById("name").value
            }
        }))
        // this.setState(prevState => ({teacherObj: {...prevState.teacherObj,name: document.getElementById("name").value}}))
        setTimeout(async () => {
            let val = { "name": this.state.teacherObj.name }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("nameSaveBtn").setAttribute("hidden", true);
                document.getElementById("nameEditBtn").removeAttribute("hidden");
                document.getElementById("name").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateGen = () => {
        if (document.getElementById("gender").value === "") {
            alert("Please fill gender field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                gen: document.getElementById("gen").value
            }
        }))
        setTimeout(async () => {
            let val = { "gen": this.state.teacherObj.gen }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("genSaveBtn").setAttribute("hidden", true);
                document.getElementById("genEditBtn").removeAttribute("hidden");
                document.getElementById("gen").setAttribute("disabled", true);

            }
        }, 500);
    }


    changeDob = (e) => {
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                dob: e.target.value
            }
        }))
    }

    updateDob = () => {
        if (this.state.teacherObj.dob === "") {
            alert("Please choose date of birth.");
            return;
        }
        setTimeout(async () => {
            let val = { "dob": this.state.teacherObj.dob }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("dobSaveBtn").setAttribute("hidden", true);
                document.getElementById("dobEditBtn").removeAttribute("hidden");
                document.getElementById("dob").setAttribute("disabled", true);

            }
        }, 500);
    }

    changeDoj = (e) => {
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                doj: e.target.value
            }
        }))
    }

    updateDoj = () => {
        if (this.state.teacherObj.doj === "") {
            alert("Please choose date of joining.");
            return;
        }
        setTimeout(async () => {
            let val = { "doj": this.state.teacherObj.doj }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("dojSaveBtn").setAttribute("hidden", true);
                document.getElementById("dojEditBtn").removeAttribute("hidden");
                document.getElementById("doj").setAttribute("disabled", true);

            }
        }, 500);
    }

    changeDoe = (e) => {
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                doe: e.target.value
            }
        }))
    }

    updateDoe = () => {
        setTimeout(async () => {
            let val = { "doe": this.state.teacherObj.doe }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("doeSaveBtn").setAttribute("hidden", true);
                document.getElementById("doeEditBtn").removeAttribute("hidden");
                document.getElementById("doe").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateAssignedTo = () => {
        if (document.getElementById("assignedTo").value === "") {
            alert("Please fill assigned to field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                assignedTo: document.getElementById("assignedTo").value
            }
        }))
        setTimeout(async () => {
            let val = { "assignedTo": this.state.teacherObj.assignedTo }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("assignedToSaveBtn").setAttribute("hidden", true);
                document.getElementById("assignedToEditBtn").removeAttribute("hidden");
                document.getElementById("assignedTo").setAttribute("disabled", true);

            }
        }, 500);
    }

    updateSection = () => {
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                section: document.getElementById("section").value
            }
        }))
        setTimeout(async () => {
            let val = { "section": this.state.teacherObj.section }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("sectionSaveBtn").setAttribute("hidden", true);
                document.getElementById("sectionEditBtn").removeAttribute("hidden");
                document.getElementById("section").setAttribute("disabled", true);

            }
        }, 500);
    }

    updateHighQualification = () => {
        if (document.getElementById("highQualification").value === "") {
            alert("Please fill highhest qualification field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                highQualification: document.getElementById("highQualification").value
            }
        }))
        setTimeout(async () => {
            let val = { "highQualification": this.state.teacherObj.highQualification }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("highQualificationSaveBtn").setAttribute("hidden", true);
                document.getElementById("highQualificationEditBtn").removeAttribute("hidden");
                document.getElementById("highQualification").setAttribute("disabled", true);

            }
        }, 500);
    }

    updatePassOut = () => {
        if (document.getElementById("passOut").value === "") {
            alert("Please fill pass out year field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                passOut: document.getElementById("passOut").value
            }
        }))
        setTimeout(async () => {
            let val = { "passOut": this.state.teacherObj.passOut }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("passOutSaveBtn").setAttribute("hidden", true);
                document.getElementById("passOutEditBtn").removeAttribute("hidden");
                document.getElementById("passOut").setAttribute("disabled", true);
            }
        }, 500);
    }

    updatePrevOrg = () => {
        if (document.getElementById("prevOrg").value === "") {
            alert("Please fill prev org field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                prevOrg: document.getElementById("prevOrg").value
            }
        }))
        setTimeout(async () => {
            let val = { "prevOrg": this.state.teacherObj.prevOrg }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("prevOrgSaveBtn").setAttribute("hidden", true);
                document.getElementById("prevOrgEditBtn").removeAttribute("hidden");
                document.getElementById("prevOrg").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateWorkExp = () => {
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                workExp: document.getElementById("workExp").value
            }
        }))
        setTimeout(async () => {
            let val = { "workExp": this.state.teacherObj.workExp }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("workExpSaveBtn").setAttribute("hidden", true);
                document.getElementById("workExpEditBtn").removeAttribute("hidden");
                document.getElementById("workExp").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateAadhar = () => {
        if (document.getElementById("aadhar").value === "" && document.getElementById("aadhar").length !== 12) {
            alert("Please fill valid aadhar card number.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                aadhar: document.getElementById("aadhar").value
            }
        }))
        setTimeout(async () => {
            let val = { "aadhar": this.state.teacherObj.aadhar }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("aadharSaveBtn").setAttribute("hidden", true);
                document.getElementById("aadharEditBtn").removeAttribute("hidden");
                document.getElementById("aadhar").setAttribute("disabled", true);
            }
        }, 500);
    }

    updatePan = () => {
        if (document.getElementById("pan").value === "" && document.getElementById("pan").length !== 10) {
            alert("Please fill valid pan card number.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                pan: document.getElementById("pan").value
            }
        }))
        setTimeout(async () => {
            let val = { "pan": this.state.teacherObj.pan }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("panSaveBtn").setAttribute("hidden", true);
                document.getElementById("panEditBtn").removeAttribute("hidden");
                document.getElementById("pan").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateAdd = () => {
        if (document.getElementById("add").value === "") {
            alert("Please fill address field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                add: document.getElementById("add").value
            }
        }))
        setTimeout(async () => {
            let val = { "add": this.state.teacherObj.add }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("addSaveBtn").setAttribute("hidden", true);
                document.getElementById("addEditBtn").removeAttribute("hidden");
                document.getElementById("add").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateMob = () => {
        if (document.getElementById("mob").value === "" || isNaN(document.getElementById("mob").value.slice(4)) || document.getElementById("mob").value.slice(4).length !== 10) {
            alert("Please fill a valid mobile number.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                mob: document.getElementById("mob").value
            }
        }))
        setTimeout(async () => {
            let val = { "mob": this.state.teacherObj.mob }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("mobSaveBtn").setAttribute("hidden", true);
                document.getElementById("mobEditBtn").removeAttribute("hidden");
                document.getElementById("mob").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateEmail = () => {
        if (document.getElementById("email").value === "" || !document.getElementById("email").value.includes('@') || !document.getElementById("email").value.includes('.com')) {
            alert("Please fill valid email id.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                email: document.getElementById("email").value
            }
        }))
        setTimeout(async () => {
            let val = { "email": this.state.teacherObj.email }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("emailSaveBtn").setAttribute("hidden", true);
                document.getElementById("emailEditBtn").removeAttribute("hidden");
                document.getElementById("email").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateIsAdmin = () => {
        if (document.getElementById("isAdmin").value === "") {
            alert("Please select isAdmin field.");
            return;
        }
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                isAdmin: document.getElementById("isAdmin").value
            }
        }))
        setTimeout(async () => {
            let val = { "isAdmin": this.state.teacherObj.isAdmin }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("isAdminSaveBtn").setAttribute("hidden", true);
                document.getElementById("isAdminEditBtn").removeAttribute("hidden");
                document.getElementById("isAdmin").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateLeave = () => {
        if (document.getElementById("leave").value === "") {
            alert("Please select leave field.");
            return;
        };
        let oldLeave = parseInt(this.state.teacherObj.leave);
        this.setState(prevState => ({
            teacherObj: {
                ...prevState.teacherObj,
                leave: document.getElementById("leave").value
            }
        }));
        setTimeout(async () => {
            let val = { "leave": this.state.teacherObj.leave }
            let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                let newLeaveBalance = parseInt(this.state.teacherObj.leaveBalance) + (parseInt(document.getElementById("leave").value) - oldLeave);
                this.setState(prevState => ({
                    teacherObj: {
                        ...prevState.teacherObj,
                        leaveBalance: newLeaveBalance
                    }
                }));
                let val = { "leaveBalance": newLeaveBalance }
                let res = await axios.put(Constants.BACKEND_URL + "updateTeacher/" + this.state.teacherObj.teacherId, val);
                if (res === "Error") {
                    alert(res)
                    return;
                }
                else {
                    document.getElementById("leaveSaveBtn").setAttribute("hidden", true);
                    document.getElementById("leaveEditBtn").removeAttribute("hidden");
                    document.getElementById("leave").setAttribute("disabled", true);
                }
            }
        }, 500);
    }

    updatePic = async (e) => {
        if (e.target.files[0] === undefined || e.target.files[0] === null || e.target.files[0] === "") {
            alert("please select image");
            return;
        }
        let formData = new FormData();
        let image = e.target.files[0];
        formData.append('image', image)
        let res = await axios.put(Constants.BACKEND_URL + "updateTeacherImage/" + this.state.teacherObj.teacherId, formData)
        if (res === "Error") {
            alert(res)
            return;
        }
        else {
            this.setState(prevState => ({
                teacherObj: {
                    ...prevState.teacherObj,
                    pic: res
                }
            }))
            // document.getElementById("picUpdate").setAttribute("hidden", true);
            // document.getElementById("picEditBtn").removeAttribute("hidden"); 
            // console.log(this.state.teacherObj.pic);
            window.location.reload();
        }
    }

    updateResume = async (e) => {
        if (e.target.files[0] === undefined || e.target.files[0] === null || e.target.files[0] === "") {
            alert("please select resume");
            return;
        }
        let formData = new FormData();
        let resume = e.target.files[0];
        formData.append('resume', resume);
        let res = await axios.put(Constants.BACKEND_URL + "updateTeacherResume/" + this.state.teacherObj.teacherId, formData)
        if (res === "Error") {
            alert(res)
            return;
        }
        else {
            this.setState(prevState => ({
                teacherObj: {
                    ...prevState.teacherObj,
                    resume: res
                }
            }))
            // document.getElementById("resumeUpdate").setAttribute("hidden", true);
            // document.getElementById("resumeEditBtn").removeAttribute("hidden"); 
            // console.log(this.state.teacherObj.resume);
            window.location.reload();
        }
    }

    updateDocs = async (e) => {
        if (e.target.files[0] === undefined || e.target.files[0] === null || e.target.files[0] === "") {
            alert("please select documents");
            return;
        }
        let formData = new FormData();
        let docs = e.target.files[0];
        formData.append('docs', docs);
        let res = await axios.put(Constants.BACKEND_URL + "updateTeacherDocs/" + this.state.teacherObj.teacherId, formData)
        if (res === "Error") {
            alert(res)
            return;
        }
        else {
            this.setState(prevState => ({
                teacherObj: {
                    ...prevState.teacherObj,
                    docs: res
                }
            }))
            // document.getElementById("docsUpdate").setAttribute("hidden", true);
            // document.getElementById("docsEditBtn").removeAttribute("hidden"); 
            // console.log(this.state.teacherObj.docs);
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                <NavigationBarPro />
                <div className="container">
                    <div className="main-body">
                        <div className="row gutters-sm">
                            <div className="col-md-4 mb-3">
                                <div style={{ backgroundColor: "#1e3d7b" }} className="card">
                                    <div className="card-body">
                                        <div className="d-flex flex-column align-items-center text-center">
                                            <img src={this.state.teacherObj.pic} alt="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle" width={200} height={200} />
                                            <br />
                                            <div hidden={this.state.editAccess}>
                                                <button className="btn btn-outline-light" type="button" id="picEditBtn" onClick={() => { document.getElementById("picUpdate").removeAttribute("hidden"); document.getElementById("picEditBtn").setAttribute("hidden", true); }}><AiFillEdit /></button>
                                                <input required className="btn btn-outline-light" hidden={true} type="file" id="picUpdate" style={{ width: "60%" }} onChange={this.updatePic} />
                                            </div>
                                            <div className="mt-3">
                                                <h5 style={{ color: "white" }}>Teacher ID : {this.state.teacherObj.teacherId} </h5>
                                                <p className="text-white mb-1">Eisteddfod Group</p>
                                                <p className="text-white font-size-sm">New Ram Nagar, Adhartal, JBP (M.P)</p>
                                                {/* goto chrome://settings/handlers and set mail.google.com as default by clicking 3 dots on the right. */}
                                                <a href={`mailto:${this.state.teacherObj.email}`} target='_blank' rel="noreferrer" className="btn btn-outline-success">Send E-Mail</a><br /><br />
                                                <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new' target='_blank' rel="noreferrer" className="btn btn-outline-primary"><i className="fa fa-google" style={{ color: "white", fontSize: "2em" }} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "#1e3d7b" }} className="card mt-3">
                                    <h5 style={{ color: "white" }}><br />&emsp;Attendence</h5>
                                    <hr />
                                    <Attendence attendence={this.state.teacherObj.attendance} />
                                </div>
                                <div style={{ backgroundColor: "#1e3d7b" }} className="card mt-3">
                                    <h5 style={{ color: "white" }}><br />&emsp;Resume</h5>
                                    <hr />
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <object data={this.state.teacherObj.resume} height="733" style={{ width: "100%" }} />
                                        <br />
                                        <div hidden={this.state.editAccess}>
                                            <button className="btn btn-outline-light" type="button" id="resumeEditBtn" onClick={() => { document.getElementById("resumeUpdate").removeAttribute("hidden"); document.getElementById("resumeEditBtn").setAttribute("hidden", true); }}><AiFillEdit /></button>
                                            <input required className="btn btn-outline-light" hidden={true} type="file" id="resumeUpdate" style={{ width: "60%" }} onChange={this.updateResume}></input>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div style={{ backgroundColor: "#98b2e6" }} className="card mb-3">
                                    <div style={{ backgroundColor: "#98b2e6" }} className="card mt-3">
                                        <h4 style={{ color: "#2a52a2" }}><br />&emsp;General Information</h4>
                                        <br />
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Title</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="title" disabled={true}>
                                                        <option className="option" defaultValue={this.state.teacherObj.title}>{this.state.teacherObj.title}</option>
                                                        <option className="option" value="Mr.">Mr.</option>
                                                        <option className="option" value="Ms.">Ms.</option>
                                                        <option className="option" value="Mrs.">Mrs.</option>
                                                    </select>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="titleEditBtn" onClick={() => { document.getElementById("titleSaveBtn").removeAttribute("hidden"); document.getElementById("titleEditBtn").setAttribute("hidden", true); document.getElementById("title").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="titleSaveBtn" onClick={this.updateTitle}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input required type="text" disabled={true} className="form-control" id="name" defaultValue={this.state.teacherObj.name}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="nameEditBtn" onClick={() => { document.getElementById("nameSaveBtn").removeAttribute("hidden"); document.getElementById("nameEditBtn").setAttribute("hidden", true); document.getElementById("name").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="nameSaveBtn" onClick={this.updateName}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Gender</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="gen" disabled={true}>
                                                        <option className="option" defaultValue={this.state.teacherObj.gen}>{this.state.teacherObj.gen}</option>
                                                        <option className="option" value="Male">Male</option>
                                                        <option className="option" value="Female">Female</option>
                                                        <option className="option" value="Other">Other</option>
                                                    </select>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="genEditBtn" onClick={() => { document.getElementById("genSaveBtn").removeAttribute("hidden"); document.getElementById("genEditBtn").setAttribute("hidden", true); document.getElementById("gen").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="genSaveBtn" onClick={this.updateGen}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Date of Birth</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="date" readOnly={false} disabled={true} className="form-control" id="dob" value={this.state.teacherObj.dob} onChange={this.changeDob}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="dobEditBtn" onClick={() => { document.getElementById("dobSaveBtn").removeAttribute("hidden"); document.getElementById("dobEditBtn").setAttribute("hidden", true); document.getElementById("dob").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="dobSaveBtn" onClick={this.updateDob}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Date of Joining</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="date" readOnly={false} disabled={true} className="form-control" id="doj" value={this.state.teacherObj.doj} onChange={this.changeDoj}></input>
                                                    <div hidden={this.state.adminAccess}>
                                                        <button className="btn btn-light" type="button" id="dojEditBtn" onClick={() => { document.getElementById("dojSaveBtn").removeAttribute("hidden"); document.getElementById("dojEditBtn").setAttribute("hidden", true); document.getElementById("doj").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="dojSaveBtn" onClick={this.updateDoj}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Date of End</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="date" readOnly={false} disabled={true} className="form-control" id="doe" value={this.state.teacherObj.doe} onChange={this.changeDoe}></input>
                                                    <div hidden={this.state.adminAccess}>
                                                        <button className="btn btn-light" type="button" id="doeEditBtn" onClick={() => { document.getElementById("doeSaveBtn").removeAttribute("hidden"); document.getElementById("doeEditBtn").setAttribute("hidden", true); document.getElementById("doe").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="doeSaveBtn" onClick={this.updateDoe}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Assigned To</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="assignedTo" disabled={true}>
                                                        <option className="option" defaultValue={this.state.teacherObj.assignedTo}>{this.state.teacherObj.assignedTo}</option>
                                                        <option value="not assigned">Not Assigned</option>
                                                        <option value="Play">Play</option>
                                                        <option value="Nursery">Nursery</option>
                                                        <option value="LKG">LKG</option>
                                                        <option value="UKG">UKG</option>
                                                    </select>
                                                    <div hidden={this.state.adminAccess}>
                                                        <button className="btn btn-light" type="button" id="assignedToEditBtn" onClick={() => { document.getElementById("assignedToSaveBtn").removeAttribute("hidden"); document.getElementById("assignedToEditBtn").setAttribute("hidden", true); document.getElementById("assignedTo").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="assignedToSaveBtn" onClick={this.updateAssignedTo}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Section</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="section" defaultValue={this.state.teacherObj.section}></input>
                                                    <div hidden={this.state.adminAccess}>
                                                        <button className="btn btn-light" type="button" id="sectionEditBtn" onClick={() => { document.getElementById("sectionSaveBtn").removeAttribute("hidden"); document.getElementById("sectionEditBtn").setAttribute("hidden", true); document.getElementById("section").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="sectionSaveBtn" onClick={this.updateSection}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Highest Qualification</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="highQualification" defaultValue={this.state.teacherObj.highQualification}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="highQualificationEditBtn" onClick={() => { document.getElementById("highQualificationSaveBtn").removeAttribute("hidden"); document.getElementById("highQualificationEditBtn").setAttribute("hidden", true); document.getElementById("highQualification").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="highQualificationSaveBtn" onClick={this.updateHighQualification}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Passout Year</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="passOut" defaultValue={this.state.teacherObj.passOut}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="passOutEditBtn" onClick={() => { document.getElementById("passOutSaveBtn").removeAttribute("hidden"); document.getElementById("passOutEditBtn").setAttribute("hidden", true); document.getElementById("passOut").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="passOutSaveBtn" onClick={this.updatePassOut}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Previous Organization</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="prevOrg" defaultValue={this.state.teacherObj.prevOrg}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="prevOrgEditBtn" onClick={() => { document.getElementById("prevOrgSaveBtn").removeAttribute("hidden"); document.getElementById("prevOrgEditBtn").setAttribute("hidden", true); document.getElementById("prevOrg").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="prevOrgSaveBtn" onClick={this.updatePrevOrg}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Work Experience</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="number" disabled={true} className="form-control" id="workExp" defaultValue={this.state.teacherObj.workExp}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="workExpEditBtn" onClick={() => { document.getElementById("workExpSaveBtn").removeAttribute("hidden"); document.getElementById("workExpEditBtn").setAttribute("hidden", true); document.getElementById("workExp").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="workExpSaveBtn" onClick={this.updateWorkExp}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div hidden={this.state.editAccess}>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Aadhar card</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <div className="input-group mb-3">
                                                        <input type="text" disabled={true} className="form-control" id="aadhar" defaultValue={this.state.teacherObj.aadhar}></input>
                                                        <div hidden={this.state.adminAccess}>
                                                            <button className="btn btn-light" type="button" id="aadharEditBtn" onClick={() => { document.getElementById("aadharSaveBtn").removeAttribute("hidden"); document.getElementById("aadharEditBtn").setAttribute("hidden", true); document.getElementById("aadhar").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                            <button className="btn btn-light" hidden={true} type="button" id="aadharSaveBtn" onClick={this.updateAadhar}><TiTick /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">PAN card</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <div className="input-group mb-3">
                                                        <input type="text" disabled={true} className="form-control" id="pan" defaultValue={this.state.teacherObj.pan}></input>
                                                        <div hidden={this.state.adminAccess}>
                                                            <button className="btn btn-light" type="button" id="panEditBtn" onClick={() => { document.getElementById("panSaveBtn").removeAttribute("hidden"); document.getElementById("panEditBtn").setAttribute("hidden", true); document.getElementById("pan").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                            <button className="btn btn-light" hidden={true} type="button" id="panSaveBtn" onClick={this.updatePan}><TiTick /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Annual Leaves</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <div className="input-group mb-3">
                                                        <input type="number" disabled={true} className="form-control" id="leave" defaultValue={this.state.teacherObj.leave}></input>
                                                        <div hidden={this.state.adminAccess}>
                                                            <button className="btn btn-light" type="button" id="leaveEditBtn" onClick={() => { document.getElementById("leaveSaveBtn").removeAttribute("hidden"); document.getElementById("leaveEditBtn").setAttribute("hidden", true); document.getElementById("leave").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                            <button className="btn btn-light" hidden={true} type="button" id="leaveSaveBtn" onClick={this.updateLeave}><TiTick /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Leave Balance</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <div className="input-group mb-3">
                                                        <input type="number" disabled={true} className="form-control" id="leaveBalance" defaultValue={this.state.teacherObj.leaveBalance}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "#1f3d7a" }} className="card mb-3">
                                    <div style={{ backgroundColor: "#1f3d7a" }} className="card mt-3">
                                        <h5 style={{ color: "white" }}><br />&emsp;Contact Details</h5>
                                        <br />
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 style={{ color: "white" }} className="mb-0">Address</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="add" defaultValue={this.state.teacherObj.add}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="addEditBtn" onClick={() => { document.getElementById("addSaveBtn").removeAttribute("hidden"); document.getElementById("addEditBtn").setAttribute("hidden", true); document.getElementById("add").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="addSaveBtn" onClick={this.updateAdd}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 style={{ color: "white" }} className="mb-0">Mobile</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="mob" defaultValue={this.state.teacherObj.mob}></input>
                                                    <div hidden={this.state.editAccess}>
                                                        <button className="btn btn-light" type="button" id="mobEditBtn" onClick={() => { document.getElementById("mobSaveBtn").removeAttribute("hidden"); document.getElementById("mobEditBtn").setAttribute("hidden", true); document.getElementById("mob").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="mobSaveBtn" onClick={this.updateMob}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 style={{ color: "white" }} className="mb-0">Email</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="email" disabled={true} className="form-control" id="email" defaultValue={this.state.teacherObj.email}></input>
                                                    <div hidden={this.state.adminAccess}>
                                                        <button className="btn btn-light" type="button" id="emailEditBtn" onClick={() => { document.getElementById("emailSaveBtn").removeAttribute("hidden"); document.getElementById("emailEditBtn").setAttribute("hidden", true); document.getElementById("email").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="emailSaveBtn" onClick={this.updateEmail}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 style={{ color: "white" }} className="mb-0">Is Admin</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="isAdmin" disabled={true}>
                                                        <option className="option" defaultValue={this.state.teacherObj.isAdmin}>{this.state.teacherObj.isAdmin}</option>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                    <div hidden={this.state.adminAccess}>
                                                        <button className="btn btn-light" type="button" id="isAdminEditBtn" onClick={() => { document.getElementById("isAdminSaveBtn").removeAttribute("hidden"); document.getElementById("isAdminEditBtn").setAttribute("hidden", true); document.getElementById("isAdmin").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                        <button className="btn btn-light" hidden={true} type="button" id="isAdminSaveBtn" onClick={this.updateIsAdmin}><TiTick /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div hidden={this.state.editAccess}>
                            <div style={{ backgroundColor: "#1e3d7b" }}>
                                {(this.state.teacherObj.docs)
                                    ?
                                    <>
                                        <h5 style={{ color: "white" }}><br />&emsp;Documents</h5>
                                        <object data={this.state.teacherObj.docs} height="780" style={{ width: "100%" }} />
                                        <br />
                                    </>
                                    :
                                    <><h6 style={{ color: "white" }}><br />&emsp;Upload documents here.</h6></>
                                } &emsp;<button className="btn btn-outline-light" type="button" id="docsEditBtn" onClick={() => { document.getElementById("docsUpdate").removeAttribute("hidden"); document.getElementById("docsEditBtn").setAttribute("hidden", true); }}><AiFillEdit /></button>
                                <input required className="btn btn-outline-light" hidden={true} type="file" id="docsUpdate" style={{ width: "60%" }} onChange={this.updateDocs}></input>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}