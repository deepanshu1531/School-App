import React from 'react';
import './RegisterModule.css';
import axios from 'axios';
import Constants from '../Constants';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';

export default class StudentRegisterModule extends React.Component {

    imgName = '';
    formData = new FormData();

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            gen: '',
            dob: '',
            doa: '',
            mob: '',
            image: '',
            class: '',
            section: '',
            age: '',
            aadhar: '',
            mother: '',
            father: '',
            occupation: '',
            address: '',
            email: '',
            fee: '',
            rollNo: '',
            registration: '',
            siblings: ''
        };
    }

    onPicUpload = async (e) => {
        const image = e.target.files[0];
        this.state.image = image;
        this.imgName = image.name;
    }

    onFormSubmit = async (e) => {

        e.preventDefault();

        if (e.target.name.value !== '') {
            await this.setState({ name: e.target.name.value.toUpperCase() });
        } else {
            alert("Please enter name field.")
        }

        if (e.target.gen.value !== '') {
            await this.setState({ gen: e.target.gen.value.toUpperCase() });
        } else {
            alert("Please enter gender field.")
        }

        if (e.target.dob.value !== '') {
            let birthYear = new Date(e.target.dob.value).getFullYear();
            let currentYear = new Date().getFullYear();
            let age = currentYear - birthYear;
            await this.setState({ dob: e.target.dob.value.toUpperCase(), age: age });
        } else {
            alert("Please enter date of birth field.")
        }

        if (e.target.doa.value !== '') {
            await this.setState({ doa: e.target.doa.value.toUpperCase() });
        } else {
            alert("Please enter date of admission field.")
        }

        if (e.target.mob.value !== '') {
            await this.setState({ mob: e.target.mob.value.toUpperCase() });
        } else {
            alert("Please enter mobile field.")
        }

        if (this.state.image !== undefined) {
            await this.formData.append('image', this.state.image);
        } else {
            alert("Please enter image field.")
        }

        if (e.target.class.value !== '') {
            await this.setState({ class: e.target.class.value.toUpperCase() });
        } else {
            alert("Please enter class field.")
        }

        if (e.target.section.value !== '') {
            await this.setState({ section: e.target.section.value.toUpperCase() });
        } else {
            alert("Please enter section field.")
        }

        if (e.target.aadhar.value !== '') {
            if(e.target.aadhar.value.length !== 12){
                alert("Invalid Aadhar number");
                return;
            }
            else
                await this.setState({ aadhar: e.target.aadhar.value.toUpperCase() });
        } else {
            alert("Please enter aadhar number field.")
        }

        if (e.target.mother.value !== '') {
            await this.setState({ mother: e.target.mother.value.toUpperCase() });
        } else {
            alert("Please enter mother's name field.")
        }

        if (e.target.father.value !== '') {
            await this.setState({ father: e.target.father.value.toUpperCase() });
        } else {
            alert("Please enter father's name field.")
        }

        if (e.target.occupation.value !== '') {
            await this.setState({ occupation: e.target.occupation.value.toUpperCase() });
        } else {
            alert("Please enter occupation field.")
        }

        if (e.target.address.value !== '') {
            await this.setState({ address: e.target.address.value.toUpperCase() });
        } else {
            alert("Please enter address field.")
        }

        if (e.target.email.value !== '') {
            await this.setState({ email: e.target.email.value.toUpperCase() });
        } else {
            alert("Please enter email field.")
        }

        if (e.target.fee.value !== '') {
            await this.setState({ fee: e.target.fee.value.toUpperCase() });
        } else {
            alert("Please enter annual fees field.")
        }

        if (e.target.rollNo.value !== '') {
            await this.setState({ rollNo: e.target.rollNo.value.toUpperCase() });
        } else {
            alert("Please enter rollNo field.")
        }

        if (e.target.registration.value !== '') {
            await this.setState({ registration: e.target.registration.value.toUpperCase() });
        } else {
            alert("Please enter registration field.")
        }

        if (e.target.siblings.value !== '') {
            await this.setState({ siblings: e.target.siblings.value.toUpperCase() });
        } else {
            alert("Please enter siblings field.")
        }

        setTimeout(async () => {
            try {
                this.formData.append('formDetail', JSON.stringify(this.state));
                console.log(this.formData);
                console.log(this.state);
                let res = await axios.post(Constants.BACKEND_URL+"addStudent", this.formData);
                this.formData.delete('image');
                this.formData.delete('formDetail');
                if (res.data == 'Success') {
                    window.location.reload();
                    console.log(res.data);
                } else {
                    alert(res.data);
                    return;
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
                                    <h2 style={{ color: "#5f118c" }}>STUDENT'S - General Infomation</h2>
                                    <div className="form-row">
                                        <input type="text" name="name" id="name" className="input-text" placeholder="Student Name" required={false} onChange={this.handleInputChange} />
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
                                            <input type="text" name="dob" id="dob" className="input-text" placeholder="Date Of Birth" required={false} style={{ color: "#798686" }} onMouseEnter={e => e.target.type = 'date'} onMouseLeave={e => e.target.type = 'text'} onChange={this.onDobType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <select name="class" required={false} onChange={this.onClassType}>
                                                <option value=''>Class</option>
                                                <option value="not assigned">Not Assigned</option>
                                                <option value="Play">Play</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="LKG">LKG</option>
                                                <option value="UKG">UKG</option>
                                            </select>
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="section" id="section" className="input-text" placeholder="Section" onChange={this.onSectionType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="text" name="father" id="father" placeholder="Father's Name" required={false} onChange={this.onFatherType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="mother" id="mother" placeholder="Mother's Name" required={false} onChange={this.onMotherType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="number" name="siblings" id="siblings" className="input-text" placeholder="No of Siblings" required={false} onChange={this.onSiblingType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="occupation" id="occupation" className="input-text" placeholder="Parents Occupation" required={false} onChange={this.onOccupationType} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-row form-row-1">
                                            <input type="number" name="rollNo" id="rollNo" className="input-text" placeholder="Roll Number" required={false} onChange={this.rollNoType} />
                                        </div>
                                        <div className="form-row form-row-2">
                                            <input type="text" name="fee" id="fee" className="input-text" placeholder="Annual Fees" onChange={this.onFeeType} />
                                        </div>
                                    </div>
                                    <div className="form-row form-row-1">
                                        <input type="text" name="aadhar" id="aadhar" placeholder="Aadhar Number" required={false} onChange={this.onAadharType} />
                                    </div>
                                    <br></br>
                                </div>
                                <div className="form-right" style={{ backgroundColor: "#5f118c" }}>
                                    <h2>STUDENT'S - Contact Details</h2>
                                    <div className="form-row">
                                        <input className="form-control" type="text" name="image" id="image" placeholder="Student Image" required={false} accept="image/*" onMouseEnter={e => { e.target.type = 'file' }} onMouseLeave={e => { e.target.type = 'text'; e.target.value = this.imgName }} onChange={this.onPicUpload} />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" name="address" id="address" placeholder="Address" required={false} onChange={this.onAddress} />
                                    </div>
                                    <div className="form-row form-row-2">
                                        <input type="text" name="mob" id="mob" placeholder="Mobile Number" required={false} onChange={this.onMobType} />
                                    </div>
                                    <div className="form-row">
                                        <input type="email" name="email" id="email" className="input-text" required={false} pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" placeholder="Email" onChange={this.onEmailType} />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" name="doa" id="doa" placeholder="Date Of Admission" required={false} style={{ color: "white" }} onMouseEnter={e => e.target.type = 'date'} onMouseLeave={e => e.target.type = 'text'} onChange={this.onDoaType} />
                                    </div>
                                    <div className="form-row">
                                        <input type="text" name="registration" id="registration" placeholder="Registration" required={false} style={{ color: "white" }} onChange={this.onRegisterType} />
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
        );
    }

}