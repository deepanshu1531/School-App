import React from 'react';
import { SiWebauthn } from 'react-icons/si';
import './ResetForgetPassword.css';
import axios from 'axios';
import Constants from '../Constants';

export default class ResetForgetPassword extends React.Component {

    state = {
        email: '',
        otp: '',
        pass: '',
        cPass: '',
        emailHide: false,
        otpHide: true,
        passHide: true,
        cPassHide: true,
        otpBtnHide: false,
        changeBtnHide: true,
        sndOtpBtnName: 'Send OTP',
        revealBtnClasses: '',
        passBoxClasses: 'form-control inputPass',
        revealButtonClick: false
    }

    generatedOtp = '';

    generateOtp = (size) => {
        const zeros = '0'.repeat(size - 1);
        const x = parseFloat('1' + zeros);
        const y = parseFloat('9' + zeros);
        const confirmationCode = String(Math.floor(x + Math.random() * y));
        console.log(confirmationCode)
        return confirmationCode;
    }

    checkPassword = (str) => {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(str);
    }

    onEmailType = (e) => {
        this.setState({ email: e.target.value })
        console.log(this.state.email)
    }

    onOtpType = (e) => {
        this.setState({ otp: e.target.value })
    }

    onPassType = (e) => {
        let btn = document.getElementById('reveal');
        let isEmpty = str => !str.trim().length;
        if (!isEmpty(e.target.value)) btn.removeAttribute('disabled'); else btn.setAttribute('disabled', 'disabled');
        this.setState({ pass: e.target.value })
        if (!this.checkPassword(this.state.pass)) {
            document.getElementById("pass").style.backgroundColor = "red"
        } else {
            document.getElementById("pass").style.backgroundColor = "white"
        }
    }

    onReveal = () => {
        let box = document.getElementById('pass');
        if (!this.state.revealButtonClick) {
            this.setState({
                passBoxClasses: 'form-control inputPass active',
                revealBtnClasses: 'open',
                revealButtonClick: true
            })
            box.type = 'text';
        } else {
            this.setState({
                passBoxClasses: 'form-control inputPass',
                revealBtnClasses: 'false',
                revealButtonClick: false
            })
            box.type = 'password';
        }
    }

    onCpassType = (e) => {
        this.setState({ cPass: e.target.value })
    }

    onOtpBtnClick = async (e) => {
        e.preventDefault();
        if (this.state.email !== '') {
            if(localStorage.getItem('user') !== null){
                const userData = await JSON.parse(localStorage.getItem('user'));
                if(this.state.email !== userData.email){
                    alert("Entered email is not associated to your account.");
                    return;
                }
            }
            this.generatedOtp = this.generateOtp(4);
            let mailBody = {
                to: this.state.email,
                subject: "OTP to generate new password.",
                text: "Hi,\nYour one time pin to change password for yout account is: " + this.generatedOtp + ".\n (Generated at " + new Date() + ").\n\n*******************\nThis is an auto-generated email. Do not reply to this email."
            }
            console.log(mailBody)
            // API call will be done here.
            let res = await axios.post(Constants.BACKEND_URL + "resetPasswordOtpMail", mailBody);
            if (res.data === 'Success') { // will change to Sucess or ErrorEmail or Error
                this.setState({
                    emailHide: true,
                    otpHide: false,
                    passHide: false,
                    cPassHide: false,
                    otpBtnHide: true,
                    changeBtnHide: false
                })
                setTimeout(() => {
                    this.setState({
                        otpBtnHide: false,
                        sndOtpBtnName: "Resend OTP"
                    })
                }, 10000);
            }
            else if (res.data ==="ErrorEmail") {
                alert("Entered email id is not registered.");
                return
            }
            else {
                alert(res.data);
                return
            }
        } else {
            alert('Please enter Email');
            return
        }
    }

    onChangeBtnClick = async (e) => {
        e.preventDefault()
        if (this.state.otp === this.generatedOtp) {
            if (this.state.pass === this.state.cPass) {
                if (this.checkPassword(this.state.pass)) {
                    let user = {
                        email: this.state.email,
                        pass: this.state.pass
                    }
                    console.log(user)
                    let res = await axios.put(Constants.BACKEND_URL + "updateTeacherPassword", user);
                    if (res.data === "Success") {
                        this.setState({
                            email: '',
                            otp: '',
                            pass: '',
                            cPass: '',
                            emailHide: false,
                            otpHide: true,
                            passHide: true,
                            cPassHide: true,
                            otpBtnHide: false,
                            changeBtnHide: true,
                            sndOtpBtnName: 'Send OTP'
                        })
                        alert("Your password has been changed sucessfully");
                        window.history.back();
                    }
                    else {
                        alert("Some thing went wrong.");
                        return
                    }
                }
                else {
                    alert("Your password must contain minimum 8 letters at least one uppercase, lowercase, number & special character.");
                    return
                }
            }
            else {
                alert("New password and confirm new password does not match!");
                return
            }
        }
        else {
            alert("Incorrect OTP!");
            return
        }
    }


    render() {
        return (
            <div className="card_fp ">
                <p className="lock-icon"><SiWebauthn color='white' /></p>
                <h5 className="h5class">Forgot Password?</h5>
                <br></br>
                <h6 className="h6class">You can reset your Password here</h6>
                <br></br>
                <form>
                    <div className="col-12" hidden={this.state.emailHide}>
                        <input name="email" type="email" className='form-control' placeholder="Email address" onChange={this.onEmailType} />
                    </div><br></br>
                    <div className="col-12" hidden={this.state.otpHide}>
                        <input name="otp" type="text" className='form-control' placeholder="Enter OTP" onChange={this.onOtpType} /><br></br>
                    </div>
                    <div className="col-12" hidden={this.state.passHide}>
                        <div className="containerPass">
                            <div className="input-group mb-3">
                                <input type="password" name="pass" id="pass" className={this.state.passBoxClasses} placeholder="Password" onChange={this.onPassType} />
                                <button type='button' id="reveal" className={this.state.revealBtnClasses} disabled="disabled" onMouseOver={this.onReveal}><span></span></button>
                            </div>
                        </div><br></br>
                        {/* <input type="password" name="pass" id="pass" className={this.state.passBoxClasses} placeholder="Password" onChange={this.onPassType} /><br></br> */}
                    </div>
                    <div className="col-12" hidden={this.state.cPassHide}>
                        <input name="cPass" type="password" className='form-control' placeholder="Confirm new password" onChange={this.onCpassType} /><br></br><br></br>
                    </div>

                    <div className="col-12" hidden={this.state.changeBtnHide}>
                        <button name="changeBtn" type="button" className='btn btn-primary' style={{ width: "100%" }} onClick={this.onChangeBtnClick}>Change Password</button><br></br><br></br>
                    </div>
                    <div className="col-12" hidden={this.state.otpBtnHide}>
                        <button name="otpBtn" type="button" className='btn btn-primary' style={{ width: "100%" }} onClick={this.onOtpBtnClick}>{this.state.sndOtpBtnName}</button>
                    </div>
                </form>
            </div>
        );
    }
}