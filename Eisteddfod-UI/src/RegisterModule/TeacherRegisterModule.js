import React from 'react';
import './RegisterModule.css';
import axios from 'axios';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';
import Constants from '../Constants';
// required
export default class TeacherRegisterModule extends React.Component {

    imgName = '';
    resumeName = '';

    formData = new FormData();

    state = {
        fName: '',
        lName: '',
        addL1: '',
        addL2: '',
        pinCode: '',
        city: '',
        country: '',
        cCode: '',
        phone: '',

        formObj: {
            title: '',
            name: '',
            gen: '',
            dob: '',
            doj: '',
            assignedTo: '',
            section: '',
            highQualification: '',
            passOut: '',
            prevOrg: '',
            workExp: '',
            aadhar: '',
            image: '',
            resume: '',
            pan: '',
            add: '',
            mob: '',
            email: '',
            isAdmin: 'no',
            leave: ''
        }
    }

    onTitleType = (e) => {
        this.state.formObj.title = e.target.value;
    }

    onFnameType = (e) => {
        this.state.fName = e.target.value;
    }

    onLnameType = (e) => {
        this.state.lName = e.target.value;
    }

    onAddLine1 = (e) => {
        this.state.addL1 = e.target.value;
    }

    onAddLine2 = (e) => {
        this.state.addL2 = e.target.value;
    }

    onPinCodeType = (e) => {
        this.state.pinCode = e.target.value;
    }

    onCityType = (e) => {
        this.state.city = e.target.value;
    }

    onCountryType = (e) => {
        this.state.country = e.target.value;
    }

    onCCodeType = (e) => {
        this.state.cCode = e.target.value;
    }

    onPhoneType = (e) => {
        this.state.phone = e.target.value;
    }

    onGenType = (e) => {
        this.state.formObj.gen = e.target.value;
    }

    onDobType = (e) => {
        this.state.formObj.dob = e.target.value;
    }

    onDojType = (e) => {
        this.state.formObj.doj = e.target.value;
    }

    onAssignedToType = (e) => {
        this.state.formObj.assignedTo = e.target.value;

        if (e.target.value == '' || e.target.value == "not assigned" || e.target.value == "Assigned to") {
            this.state.formObj.section = '';
            document.getElementById("section").hidden = true;
        } else {
            document.getElementById("section").value = '';
            document.getElementById("section").hidden = false;
        }
    }

    onSectionType = (e) => {
        this.state.formObj.section = e.target.value;
    }

    onHignQualType = (e) => {
        this.state.formObj.highQualification = e.target.value.toUpperCase();
    }

    onPassOutType = (e) => {
        this.state.formObj.passOut = e.target.value;
    }

    onPrevOrgType = (e => {
        this.state.formObj.prevOrg = e.target.value;
        if (e.target.value == '' || e.target.value.toLowerCase() == 'na' || e.target.value.toLowerCase() == 'n/a') {
            this.state.formObj.workExp = ''
            document.getElementById("exp").hidden = true;
        } else {
            document.getElementById("exp").value = '';
            document.getElementById("exp").hidden = false;
        }
    })

    onWorkExpType = (e) => {
        this.state.formObj.workExp = e.target.value;
    }

    onAadharType = (e) => {
        this.state.formObj.aadhar = e.target.value;
    }

    onPanType = (e) => {
        this.state.formObj.pan = e.target.value;
    }

    onPicUpload = async (e) => {
        const image = e.target.files[0];
        this.state.formObj.image = image;
        this.imgName = image.name;
        // await axios.post("http://localhost:3000/upload", this.formData);
    }

    onResumeUpload = async (e) => {
        const resume = e.target.files[0];
        this.state.formObj.resume = resume;
        this.resumeName = resume.name
    }

    onEmailType = (e) => {
        this.state.formObj.email = e.target.value;
    }

    onIsAdminType = (e) => {
        this.state.formObj.isAdmin = e.target.value;
    }

    onLeaveType = (e) => {
        this.state.formObj.leave = e.target.value;
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.formObj.title == '') {
            alert('Please fill title fields');
            return;
        }

        if (this.state.fName != '') {
            if (this.state.lName != '') {
                let capFname = this.state.fName.charAt(0).toUpperCase() + this.state.fName.slice(1).toLowerCase();
                let capLname = this.state.lName.charAt(0).toUpperCase() + this.state.lName.slice(1).toLowerCase();
                this.state.formObj.name = capFname + " " + capLname;
            } else {
                alert("Please enter lastname");
                return;
            }
        } else {
            alert("Please enter firstname");
            return;
        }

        if (this.state.formObj.gen == '') {
            alert('Please select gender field');
            return;
        }

        if (this.state.formObj.dob == '') {
            alert('Please select date of birth ');
            return;
        }

        if (this.state.formObj.doj == '') {
            alert('Please select date of joining ');
            return;
        }

        if (this.state.formObj.assignedTo == '') {
            alert('Please select Assigned to field ');
            return;
        }


        if (this.state.formObj.highQualification == '') {
            alert('Please select highest Qualification Field ');
            return;
        }

        if (this.state.formObj.passOut == '') {
            alert('Please enter pass out year Field ');
            return;
        }

        if (this.state.formObj.prevOrg == '') {
            alert('Please enter previous organisation Field. If not applicable enter NA ');
            return;
        }

        if (this.state.formObj.workExp !== ''){
            if(this.state.formObj.workExp < 0){
                alert('Cannot add work experience in negative value')
            }
        }

        if (this.state.formObj.aadhar == '') {
            alert('Please enter aadhar card number.');
            return;
        } else {
            if (this.state.formObj.aadhar.length !== 12) {
                alert("Aadhar Card Number should be of length 12");
                return;
            }
        }

        if (this.state.formObj.pan == '') {
            alert('Please enter pan card number.');
            return;
        } else {
            if (this.state.formObj.pan.length !== 10) {
                alert("Pan Card Number should be of length 10.");
                return;
            }
        }

        if (this.state.formObj.image == '') {
            alert('Please upload an image.');
            return;
        } else {
            this.formData.append('image', this.state.formObj.image)
        }

        if (this.state.formObj.resume == '') {
            alert('Please upload resume.');
            return;
        } else {
            this.formData.append('resume', this.state.formObj.resume);
        }

        if (this.state.formObj.email == '') {
            alert('Please enter email.');
            return;
        }

        if (this.state.formObj.isAdmin == '') {
            alert('Please select isAdmin field.');
            return;
        }

        if (this.state.formObj.leave == '') {
            alert('Please select annual leaves field.');
            return;
        }

        if (this.state.addL1 != '') {
            if (this.state.pinCode != '') {
                if (this.state.city != '') {
                    if (this.state.country != '') {
                        this.state.formObj.add = this.state.addL1 + " " + this.state.addL2 + "\n" + this.state.city + ", PIN: " + this.state.pinCode + ",\n" + this.state.country
                    }
                    else {
                        alert("Please Select Country");
                        return;
                    }
                } else {
                    alert("Please Enter City");
                    return;
                }
            } else {
                alert("Please enter Pincode");
                return;
            }
        } else {
            alert('Please enter your address as per aadhar card.')
            return;
        }

        if (this.state.cCode != '') {
            if (this.state.phone != '') {
                this.state.formObj.mob = this.state.cCode + "-" + this.state.phone
            } else {
                alert("Please enter mobile no.");
                return;
            }
        } else {
            alert("Please enter country code for phone number.");
            return;
        }
        setTimeout(async () => {
            try {
                this.formData.append('formDetail', JSON.stringify(this.state.formObj));
                let res = await axios.post(Constants.BACKEND_URL + "addTeacher", this.formData);
                this.formData.delete('image');
                this.formData.delete('resume');
                this.formData.delete('formDetail');
                if (res.data == 'Success') {
                    alert(res.data);
                    window.location.reload();
                } else {
                    if (res.data !== "Error") {
                        alert(res.data);
                        window.location.reload();
                    } else {
                        alert(res.data);
                        return;
                    }
                }
            } catch (err) {
                alert("Something went wrong..")
                return;
            }
        }, 5000);
    }

    render() {
        return (
            <>
                <NavigationBarPro />
                <div className="form-v10">
                    <div className="page-content">
                        <div className="form-v10-content">
                            <form className="form-detail" action="#" method="post" id="myform" onSubmit={e => this.onFormSubmit(e)}>
                                <div className="form-left">
                                    <h2>TEAHCER'S - General Infomation</h2>
                                    <div className="form-row">
                                        <select name="title" onChange={this.onTitleType}>
                                            <option className="option" value=''>Title</option>
                                            <option className="option" value="Mr.">Mr.</option>
                                            <option className="option" value="Ms.">Ms.</option>
                                            <option className="option" value="Mrs.">Mrs.</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="fName" id="fName" className="input-text" placeholder="First Name" required onChange={this.onFnameType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="lName" id="lName" className="input-text" placeholder="Last Name" required onChange={this.onLnameType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <select name="gen" onChange={this.onGenType}>
                                                <option className="option" value=''>Gender</option >
                                                <option className="option" value="Male">Male</option>
                                                <option className="option" value="Female">Female</option>
                                                <option className="option" value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="dob" id="dob" className="input-text" placeholder="Date Of Birth" required style={{ color: "#798686" }} onMouseEnter={e => e.target.type = 'date'} onMouseLeave={e => e.target.type = 'text'} onChange={this.onDobType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <select name="assignedTo" required onChange={this.onAssignedToType}>
                                                <option value=''>Assigned to</option>
                                                <option value="not assigned">Not Assigned</option>
                                                <option value="Play">Play</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="LKG">LKG</option>
                                                <option value="UKG">UKG</option>
                                            </select>
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input hidden={true} type="text" name="section" id="section" className="input-text" placeholder="Section" onChange={this.onSectionType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="qualification" className="company" id="qualification" placeholder="Highest Qualification" required onChange={this.onHignQualType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="passOut" className="company" id="passOut" placeholder="Passout Year" required onChange={this.onPassOutType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="preOrg" id="preOrg" className="input-text" placeholder="Previous Orgination" required onChange={this.onPrevOrgType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input hidden={true} type="number" name="exp" id="exp" className="input-text" placeholder="Working Experience" onChange={this.onWorkExpType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="aadhar" className="business" id="aadhar" placeholder="Aadhar Number" required onChange={this.onAadharType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="pan" className="business" id="pan" placeholder="PAN Number" required onChange={this.onPanType} />
                                        </div>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input className="form-control form-control-sm" type="text" name="img" id="img" placeholder="Upload Image" required accept="image/*" onMouseEnter={e => { e.target.type = 'file' }} onMouseLeave={e => { e.target.type = 'text'; e.target.value = this.imgName }} onChange={this.onPicUpload} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input className="form-control form-control-sm" type="text" name="cv" id="cv" placeholder="Upload Resume" required accept="application/pdf" onMouseEnter={e => { e.target.type = 'file' }} onMouseLeave={e => { e.target.type = 'text'; e.target.value = this.resumeName }} onChange={this.onResumeUpload} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-right">
                                    <h2>TEAHCER'S - Contact Details</h2>
                                    <div className="form-row">
                                        <input type="text" name="address1" className="street" id="address1" placeholder="Address Line 1" required onChange={this.onAddLine1} />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" name="address2" className="additional" id="address2" placeholder="Address Line 2" onChange={this.onAddLine2} />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="zip" className="zip" id="zip" placeholder="Zip Code" required onChange={this.onPinCodeType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="city" className="city" id="city" placeholder="City" required onChange={this.onCityType} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <select name="country" onChange={this.onCountryType}>
                                            <option value=''>Country</option>
                                            <option value="India">India</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="code" className="code" id="code" placeholder="Code +" required onChange={this.onCCodeType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="phone" className="phone" id="phone" placeholder="Mobile Number" required onChange={this.onPhoneType} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <input type="email" name="email" id="email" className="input-text" required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" placeholder="Email" onChange={this.onEmailType} />
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="doj" id="doj" className="input-text" placeholder="Date Of Joining" required style={{ color: "white" }} onMouseEnter={e => e.target.type = 'date'} onMouseLeave={e => e.target.type = 'text'} onChange={this.onDojType} />
                                        </div>
                                        <div className="form-row form-row-3">
                                            <input type="number" name="leave" id="leave" className="input-text" placeholder="Annual Leaves" required style={{ color: "white" }} onChange={this.onLeaveType} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <select name="isAdmin" required onChange={this.onIsAdminType}>
                                            <option value=''>Is Admin</option>
                                            <option value="no">No</option>
                                            <option value="yes">Yes</option>
                                        </select>
                                    </div>
                                    <div className="form-row-last">
                                        <input type="submit" name="register" className="register" value="Register" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}