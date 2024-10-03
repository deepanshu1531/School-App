import React from 'react';
import Attendence from '../AttendenceModule/Attendence';
import { AiFillEdit } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import axios from 'axios';
import Constants from '../Constants'
import './TeacherViewUpdateModule.css';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';

export default class StudentViewUpdateModule extends React.Component {

    state = {
        studentObj: {
            title: "",
            name: "",
            gen: "",
            dob: "dd-mm-yyyy",
            doa: "dd-mm-yyyy",
            doe: "dd-mm-yyyy",
            class: "Play",
            section: "1",
            age: "",
            fatherName: "",
            motherName: "",
            parentOccupation: "",
            aadhar: "",
            rollNo: "",
            pic: "",
            marksheet: "",
            docs: "",
            add: "",
            mob: "",
            email: "",
            registration: "",
            password: "",
            studentId: "",
            annualFee: "",
            annualFeeBalance: "",
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
        let handlerName = window.location.pathname.replace("/studentProfile", "getStudent");
        let obj = await axios.get(Constants.BACKEND_URL + handlerName)
        this.setState({ studentObj: obj.data })
    }

    updateName = () => {
        if (document.getElementById("name").value === "") {
            alert("Please fill name field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                name: document.getElementById("name").value
            }
        }))
        // this.setState(prevState => ({studentObj: {...prevState.studentObj,name: document.getElementById("name").value}}))
        setTimeout(async () => {
            let val = { "name": this.state.studentObj.name }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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
            studentObj: {
                ...prevState.studentObj,
                gen: document.getElementById("gen").value
            }
        }))
        setTimeout(async () => {
            let val = { "gen": this.state.studentObj.gen }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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
            studentObj: {
                ...prevState.studentObj,
                dob: e.target.value
            }
        }))
    }

    updateDob = () => {
        if (this.state.studentObj.dob === "") {
            alert("Please choose date of birth.");
            return;
        }
        setTimeout(async () => {
            let val = { "dob": this.state.studentObj.dob }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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

    changeDoa = (e) => {
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                doa: e.target.value
            }
        }))
    }

    updateDoa = () => {
        if (this.state.studentObj.doa === "") {
            alert("Please choose date of joining.");
            return;
        }
        setTimeout(async () => {
            let val = { "doa": this.state.studentObj.doa }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("doaSaveBtn").setAttribute("hidden", true);
                document.getElementById("doaEditBtn").removeAttribute("hidden");
                document.getElementById("doa").setAttribute("disabled", true);

            }
        }, 500);
    }

    changeDoe = (e) => {
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                doe: e.target.value
            }
        }))
    }

    updateDoe = () => {
        setTimeout(async () => {
            let val = { "doe": this.state.studentObj.doe }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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

    updateClass = () => {
        if (document.getElementById("class").value === "") {
            alert("Please fill assigned to field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                class: document.getElementById("class").value
            }
        }))
        setTimeout(async () => {
            let val = { "class": this.state.studentObj.class }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("classSaveBtn").setAttribute("hidden", true);
                document.getElementById("classEditBtn").removeAttribute("hidden");
                document.getElementById("class").setAttribute("disabled", true);

            }
        }, 500);
    }

    updateSection = () => {
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                section: document.getElementById("section").value
            }
        }))
        setTimeout(async () => {
            let val = { "section": this.state.studentObj.section }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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

    updateAge = () => {
        if (document.getElementById("age").value === "") {
            alert("Please fill highhest qualification field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                age: document.getElementById("age").value
            }
        }))
        setTimeout(async () => {
            let val = { "age": this.state.studentObj.age }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("ageSaveBtn").setAttribute("hidden", true);
                document.getElementById("ageEditBtn").removeAttribute("hidden");
                document.getElementById("age").setAttribute("disabled", true);

            }
        }, 500);
    }

    updateFatherName = () => {
        if (document.getElementById("fatherName").value === "") {
            alert("Please fill pass out year field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                fatherName: document.getElementById("fatherName").value
            }
        }))
        setTimeout(async () => {
            let val = { "fatherName": this.state.studentObj.fatherName }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("fatherNameSaveBtn").setAttribute("hidden", true);
                document.getElementById("fatherNameEditBtn").removeAttribute("hidden");
                document.getElementById("fatherName").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateMotherName = () => {
        if (document.getElementById("motherName").value === "") {
            alert("Please fill prev org field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                motherName: document.getElementById("motherName").value
            }
        }))
        setTimeout(async () => {
            let val = { "motherName": this.state.studentObj.motherName }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("motherNameSaveBtn").setAttribute("hidden", true);
                document.getElementById("motherNameEditBtn").removeAttribute("hidden");
                document.getElementById("motherName").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateParentOccupation = () => {
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                parentOccupation: document.getElementById("parentOccupation").value
            }
        }))
        setTimeout(async () => {
            let val = { "parentOccupation": this.state.studentObj.parentOccupation }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("parentOccupationSaveBtn").setAttribute("hidden", true);
                document.getElementById("parentOccupationEditBtn").removeAttribute("hidden");
                document.getElementById("parentOccupation").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateAadhar = () => {
        if (document.getElementById("aadhar").value === "" && document.getElementById("aadhar").length !== 12) {
            alert("Please fill valid aadhar card number.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                aadhar: document.getElementById("aadhar").value
            }
        }))
        setTimeout(async () => {
            let val = { "aadhar": this.state.studentObj.aadhar }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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

    updateRollNo = () => {
        if (document.getElementById("rollNo").value === "" && document.getElementById("rollNo").length !== 10) {
            alert("Please fill valid rollNo card number.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                rollNo: document.getElementById("rollNo").value
            }
        }))
        setTimeout(async () => {
            let val = { "rollNo": this.state.studentObj.rollNo }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("rollNoSaveBtn").setAttribute("hidden", true);
                document.getElementById("rollNoEditBtn").removeAttribute("hidden");
                document.getElementById("rollNo").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateAdd = () => {
        if (document.getElementById("address").value === "") {
            alert("Please fill address field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                add: document.getElementById("address").value
            }
        }))
        setTimeout(async () => {
            let val = { "address": this.state.studentObj.add }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("addressSaveBtn").setAttribute("hidden", true);
                document.getElementById("addressEditBtn").removeAttribute("hidden");
                document.getElementById("address").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateMob = () => {
        if (document.getElementById("mob").value === "" || isNaN(document.getElementById("mob").value.slice(4)) || document.getElementById("mob").value.slice(4).length !== 10) {
            alert("Please fill a valid mobile number.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                mob: document.getElementById("mob").value
            }
        }))
        setTimeout(async () => {
            let val = { "mob": this.state.studentObj.mob }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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
            studentObj: {
                ...prevState.studentObj,
                email: document.getElementById("email").value
            }
        }))
        setTimeout(async () => {
            let val = { "email": this.state.studentObj.email }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
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

    updateRegistration = () => {
        if (document.getElementById("registration").value === "") {
            alert("Please select registration field.");
            return;
        }
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                registration: document.getElementById("registration").value
            }
        }))
        setTimeout(async () => {
            let val = { "registration": this.state.studentObj.registration }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                document.getElementById("registrationSaveBtn").setAttribute("hidden", true);
                document.getElementById("registrationEditBtn").removeAttribute("hidden");
                document.getElementById("registration").setAttribute("disabled", true);
            }
        }, 500);
    }

    updateAnnualFee = () => {
        if (document.getElementById("annualFee").value === "") {
            alert("Please select annualFee field.");
            return;
        };
        let oldannualFee = parseInt(this.state.studentObj.annualFee);
        this.setState(prevState => ({
            studentObj: {
                ...prevState.studentObj,
                annualFee: document.getElementById("annualFee").value
            }
        }));
        setTimeout(async () => {
            let val = { "annualFee": this.state.studentObj.annualFee }
            let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val)
            if (res === "Error") {
                alert(res)
                return;
            }
            else {
                let newannualFeeBalance = parseInt(this.state.studentObj.annualFeeBalance) + (parseInt(document.getElementById("annualFee").value) - oldannualFee);
                this.setState(prevState => ({
                    studentObj: {
                        ...prevState.studentObj,
                        annualFeeBalance: newannualFeeBalance
                    }
                }));
                let val = { "annualFeeBalance": newannualFeeBalance }
                let res = await axios.put(Constants.BACKEND_URL + "updateStudent/" + this.state.studentObj.studentId, val);
                if (res === "Error") {
                    alert(res)
                    return;
                }
                else {
                    document.getElementById("annualFeeSaveBtn").setAttribute("hidden", true);
                    document.getElementById("annualFeeEditBtn").removeAttribute("hidden");
                    document.getElementById("annualFee").setAttribute("disabled", true);
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
        let res = await axios.put(Constants.BACKEND_URL + "updateStudentImage/" + this.state.studentObj.studentId, formData)
        if (res === "Error") {
            alert(res)
            return;
        }
        else {
            this.setState(prevState => ({
                studentObj: {
                    ...prevState.studentObj,
                    pic: res
                }
            }))
            // document.getElementById("picUpdate").setAttribute("hidden", true);
            // document.getElementById("picEditBtn").removeAttribute("hidden"); 
            // console.log(this.state.studentObj.pic);
            window.location.reload();
        }
    }

    updateMarksheet = async (e) => {
        if (e.target.files[0] === undefined || e.target.files[0] === null || e.target.files[0] === "") {
            alert("please select marksheet");
            return;
        }
        let formData = new FormData();
        let marksheet = e.target.files[0];
        formData.append('marksheet', marksheet);
        let res = await axios.put(Constants.BACKEND_URL + "updateStudentMarksheet/" + this.state.studentObj.studentId, formData)
        if (res === "Error") {
            alert(res)
            return;
        }
        else {
            this.setState(prevState => ({
                studentObj: {
                    ...prevState.studentObj,
                    marksheet: res
                }
            }))
            // document.getElementById("marksheetUpdate").setAttribute("hidden", true);
            // document.getElementById("marksheetEditBtn").removeAttribute("hidden"); 
            // console.log(this.state.studentObj.marksheet);
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
        let res = await axios.put(Constants.BACKEND_URL + "updateStudentDocs/" + this.state.studentObj.studentId, formData)
        if (res === "Error") {
            alert(res)
            return;
        }
        else {
            this.setState(prevState => ({
                studentObj: {
                    ...prevState.studentObj,
                    docs: res
                }
            }))
            // document.getElementById("docsUpdate").setAttribute("hidden", true);
            // document.getElementById("docsEditBtn").removeAttribute("hidden"); 
            // console.log(this.state.studentObj.docs);
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
                                            <img src={this.state.studentObj.image} alt="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle" width={200} height={200} />
                                            <br />
                                            <button className="btn btn-outline-light" type="button" id="picEditBtn" onClick={() => { document.getElementById("picUpdate").removeAttribute("hidden"); document.getElementById("picEditBtn").setAttribute("hidden", true); }}><AiFillEdit /></button>
                                            <input required className="btn btn-outline-light" hidden={true} type="file" id="picUpdate" style={{ width: "60%" }} onChange={this.updatePic} />
                                            <div className="mt-3">
                                                <h5 style={{ color: "white" }}>Student ID : {this.state.studentObj.studentId} </h5>
                                                <p className="text-white mb-1">Eisteddfod Group</p>
                                                <p className="text-white font-size-sm">New Ram Nagar, Adhartal, JBP (M.P)</p>
                                                {/* goto chrome://settings/handlers and set mail.google.com as default by clicking 3 dots on the right. */}
                                                <a href={`mailto:${this.state.studentObj.email}`} target='_blank' rel="noreferrer" className="btn btn-outline-success">Send E-Mail</a><br /><br />
                                                <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new' target='_blank' rel="noreferrer" className="btn btn-outline-primary"><i className="fa fa-google" style={{ color: "white", fontSize: "2em" }} /></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ backgroundColor: "#1e3d7b" }} className="card mt-3">
                                    <h5 style={{ color: "white" }}><br />&emsp;Attendence</h5>
                                    <hr />
                                    <Attendence attendence={this.state.studentObj.attendance} />
                                </div>
                                <div style={{ backgroundColor: "#1e3d7b" }} className="card mt-3">
                                    <h5 style={{ color: "white" }}><br />&emsp;Marksheets</h5>
                                    <hr />
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <object data={this.state.studentObj.marksheet} height="560" style={{ width: "100%" }} />
                                        <br />
                                        <button className="btn btn-outline-light" type="button" id="marksheetEditBtn" onClick={() => { document.getElementById("marksheetUpdate").removeAttribute("hidden"); document.getElementById("marksheetEditBtn").setAttribute("hidden", true); }}><AiFillEdit /></button>
                                        <input required className="btn btn-outline-light" hidden={true} type="file" id="marksheetUpdate" style={{ width: "60%" }} onChange={this.updateMarksheet}></input>
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
                                                <h6 className="mb-0">Full Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input required type="text" disabled={true} className="form-control" id="name" defaultValue={this.state.studentObj.name}></input>
                                                    <button className="btn btn-light" type="button" id="nameEditBtn" onClick={() => { document.getElementById("nameSaveBtn").removeAttribute("hidden"); document.getElementById("nameEditBtn").setAttribute("hidden", true); document.getElementById("name").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="nameSaveBtn" onClick={this.updateName}><TiTick /></button>
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
                                                        <option className="option" defaultValue={this.state.studentObj.gen}>{this.state.studentObj.gen}</option>
                                                        <option className="option" value="Male">Male</option>
                                                        <option className="option" value="Female">Female</option>
                                                        <option className="option" value="Other">Other</option>
                                                    </select>
                                                    <button className="btn btn-light" type="button" id="genEditBtn" onClick={() => { document.getElementById("genSaveBtn").removeAttribute("hidden"); document.getElementById("genEditBtn").setAttribute("hidden", true); document.getElementById("gen").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="genSaveBtn" onClick={this.updateGen}><TiTick /></button>
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
                                                    <input type="date" readOnly={false} disabled={true} className="form-control" id="dob" value={this.state.studentObj.dob} onChange={this.changeDob}></input>
                                                    <button className="btn btn-light" type="button" id="dobEditBtn" onClick={() => { document.getElementById("dobSaveBtn").removeAttribute("hidden"); document.getElementById("dobEditBtn").setAttribute("hidden", true); document.getElementById("dob").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="dobSaveBtn" onClick={this.updateDob}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Date of Admission</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="date" readOnly={false} disabled={true} className="form-control" id="doa" value={this.state.studentObj.doa} onChange={this.changeDoa}></input>
                                                    <button className="btn btn-light" type="button" id="doaEditBtn" onClick={() => { document.getElementById("doaSaveBtn").removeAttribute("hidden"); document.getElementById("doaEditBtn").setAttribute("hidden", true); document.getElementById("doa").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="doaSaveBtn" onClick={this.updateDoa}><TiTick /></button>
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
                                                    <input type="date" readOnly={false} disabled={true} className="form-control" id="doe" value={this.state.studentObj.doe} onChange={this.changeDoe}></input>
                                                    <button className="btn btn-light" type="button" id="doeEditBtn" onClick={() => { document.getElementById("doeSaveBtn").removeAttribute("hidden"); document.getElementById("doeEditBtn").setAttribute("hidden", true); document.getElementById("doe").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="doeSaveBtn" onClick={this.updateDoe}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Class</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="class" disabled={true}>
                                                        <option className="option" defaultValue={this.state.studentObj.class}>{this.state.studentObj.class}</option>
                                                        <option value="not assigned">Not Assigned</option>
                                                        <option value="Play">Play</option>
                                                        <option value="Nursery">Nursery</option>
                                                        <option value="LKG">LKG</option>
                                                        <option value="UKG">UKG</option>
                                                    </select>
                                                    <button className="btn btn-light" type="button" id="classEditBtn" onClick={() => { document.getElementById("classSaveBtn").removeAttribute("hidden"); document.getElementById("classEditBtn").setAttribute("hidden", true); document.getElementById("class").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="classSaveBtn" onClick={this.updateClass}><TiTick /></button>
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
                                                    <input type="text" disabled={true} className="form-control" id="section" defaultValue={this.state.studentObj.section}></input>
                                                    <button className="btn btn-light" type="button" id="sectionEditBtn" onClick={() => { document.getElementById("sectionSaveBtn").removeAttribute("hidden"); document.getElementById("sectionEditBtn").setAttribute("hidden", true); document.getElementById("section").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="sectionSaveBtn" onClick={this.updateSection}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Age</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="age" defaultValue={this.state.studentObj.age}></input>
                                                    <button className="btn btn-light" type="button" id="ageEditBtn" onClick={() => { document.getElementById("ageSaveBtn").removeAttribute("hidden"); document.getElementById("ageEditBtn").setAttribute("hidden", true); document.getElementById("age").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="ageSaveBtn" onClick={this.updateAge}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Father's Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="fatherName" defaultValue={this.state.studentObj.fatherName}></input>
                                                    <button className="btn btn-light" type="button" id="fatherNameEditBtn" onClick={() => { document.getElementById("fatherNameSaveBtn").removeAttribute("hidden"); document.getElementById("fatherNameEditBtn").setAttribute("hidden", true); document.getElementById("fatherName").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="fatherNameSaveBtn" onClick={this.updateFatherName}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Mother's Name</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="motherName" defaultValue={this.state.studentObj.motherName}></input>
                                                    <button className="btn btn-light" type="button" id="motherNameEditBtn" onClick={() => { document.getElementById("motherNameSaveBtn").removeAttribute("hidden"); document.getElementById("motherNameEditBtn").setAttribute("hidden", true); document.getElementById("motherName").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="motherNameSaveBtn" onClick={this.updateMotherName}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Parent's Occupation</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="parentOccupation" defaultValue={this.state.studentObj.parentOccupation}></input>
                                                    <button className="btn btn-light" type="button" id="parentOccupationEditBtn" onClick={() => { document.getElementById("parentOccupationSaveBtn").removeAttribute("hidden"); document.getElementById("parentOccupationEditBtn").setAttribute("hidden", true); document.getElementById("parentOccupation").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="parentOccupationSaveBtn" onClick={this.updateParentOccupation}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Aadhar card</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="aadhar" defaultValue={this.state.studentObj.aadhar}></input>
                                                    <button className="btn btn-light" type="button" id="aadharEditBtn" onClick={() => { document.getElementById("aadharSaveBtn").removeAttribute("hidden"); document.getElementById("aadharEditBtn").setAttribute("hidden", true); document.getElementById("aadhar").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="aadharSaveBtn" onClick={this.updateAadhar}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Roll No</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="rollNo" defaultValue={this.state.studentObj.rollNo}></input>
                                                    <button className="btn btn-light" type="button" id="rollNoEditBtn" onClick={() => { document.getElementById("rollNoSaveBtn").removeAttribute("hidden"); document.getElementById("rollNoEditBtn").setAttribute("hidden", true); document.getElementById("rollNo").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="rollNoSaveBtn" onClick={this.updateRollNo}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0">Annual Fees</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <input type="text" disabled={true} className="form-control" id="annualFee" defaultValue={this.state.studentObj.annualFee}></input>
                                                    <button className="btn btn-light" type="button" id="annualFeeEditBtn" onClick={() => { document.getElementById("annualFeeSaveBtn").removeAttribute("hidden"); document.getElementById("annualFeeEditBtn").setAttribute("hidden", true); document.getElementById("annualFee").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="annualFeeSaveBtn" onClick={this.updateAnnualFee}><TiTick /></button>
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
                                                    <input type="text" disabled={true} className="form-control" id="address" defaultValue={this.state.studentObj.address}></input>
                                                    <button className="btn btn-light" type="button" id="addressEditBtn" onClick={() => { document.getElementById("addressSaveBtn").removeAttribute("hidden"); document.getElementById("addressEditBtn").setAttribute("hidden", true); document.getElementById("address").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="addressSaveBtn" onClick={this.updateAdd}><TiTick /></button>
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
                                                    <input type="text" disabled={true} className="form-control" id="mob" defaultValue={this.state.studentObj.mob}></input>
                                                    <button className="btn btn-light" type="button" id="mobEditBtn" onClick={() => { document.getElementById("mobSaveBtn").removeAttribute("hidden"); document.getElementById("mobEditBtn").setAttribute("hidden", true); document.getElementById("mob").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="mobSaveBtn" onClick={this.updateMob}><TiTick /></button>
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
                                                    <input type="email" disabled={true} className="form-control" id="email" defaultValue={this.state.studentObj.email}></input>
                                                    <button className="btn btn-light" type="button" id="emailEditBtn" onClick={() => { document.getElementById("emailSaveBtn").removeAttribute("hidden"); document.getElementById("emailEditBtn").setAttribute("hidden", true); document.getElementById("email").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="emailSaveBtn" onClick={this.updateEmail}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 style={{ color: "white" }} className="mb-0">Registration</h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                                <div className="input-group mb-3">
                                                    <select className="form-control" id="registration" disabled={true}>
                                                        <option className="option" defaultValue={this.state.studentObj.registration}>{this.state.studentObj.registration}</option>
                                                        <option value="no">No</option>
                                                        <option value="yes">Yes</option>
                                                    </select>
                                                    <button className="btn btn-light" type="button" id="registrationEditBtn" onClick={() => { document.getElementById("registrationSaveBtn").removeAttribute("hidden"); document.getElementById("registrationEditBtn").setAttribute("hidden", true); document.getElementById("registration").removeAttribute("disabled"); }}><AiFillEdit /></button>
                                                    <button className="btn btn-light" hidden={true} type="button" id="registrationSaveBtn" onClick={this.updateRegistration}><TiTick /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: "#1e3d7b" }}>
                            {(this.state.studentObj.docs)
                                ?
                                <>
                                    <h5 style={{ color: "white" }}><br />&emsp;Documents</h5>
                                    <object data={this.state.studentObj.docs} height="780" style={{ width: "100%" }} />
                                    <br />
                                </>
                                :
                                <><h6 style={{ color: "white" }}><br />&emsp;Upload documents here.</h6></>
                            }
                            &emsp;<button className="btn btn-outline-light" type="button" id="docsEditBtn" onClick={() => { document.getElementById("docsUpdate").removeAttribute("hidden"); document.getElementById("docsEditBtn").setAttribute("hidden", true); }}><AiFillEdit /></button>
                            <input required className="btn btn-outline-light" hidden={true} type="file" id="docsUpdate" style={{ width: "60%" }} onChange={this.updateDocs}></input>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}