import React from 'react';
import { AiFillInstagram } from 'react-icons/ai';
import './LoginForm.css'
import { MDBRow, MDBCol, MDBCard, MDBCardBody, } from 'mdb-react-ui-kit';
import axios from 'axios';
import Constants from '../Constants';

// anjalisoni155@gmail.com
// mltRA#z4

export default class LoginForm extends React.Component {

    state = {
        email: '',
        pass: '',
        revealBtnClasses: '',
        passBoxClasses: 'form-control inputPass',
        revealButtonClick: false
    }

    onEmailType = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    onPassType = (e) => {
        let btn = document.getElementById('reveal');
        let isEmpty = str => !str.trim().length;
        if (!isEmpty(e.target.value)) btn.removeAttribute('disabled'); else btn.setAttribute('disabled', 'disabled');
        this.setState({
            pass: e.target.value
        })
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

    onFormSubmit = async (e) => {
        e.preventDefault();
        if (this.state.email !== '') {
            if (this.state.pass !== '') {
                let auth = await axios.post(Constants.BACKEND_URL + "login", this.state)
                // Auth logic.
                if (auth.data !== "Wrong Password!" && auth.data !== "Email ID not exists!" && auth.data !== "Error") {
                    localStorage.setItem("user", JSON.stringify(auth.data));
                    this.setState({
                        email: '',
                        pass: ''
                    })
                    // After auth will Navigate to welcome page.
                    console.log(JSON.parse(localStorage.getItem('user')));
                    window.location = '/';
                }
                else {
                    alert(auth.data);
                    return;
                }
            } else {
                alert("Please enter your password.")
                return
            }
        } else {
            alert("Please enter your email address.")
            return
        }
    }

    render() {
        return (
            <div className='p-4 background-radial-gradient overflow-hidden'>
                <MDBRow>
                    <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
                        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
                            The best offer <br />
                            <span style={{ color: 'hsl(218, 81%, 75%)' }}>for your business</span>
                        </h1>
                        <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                            quibusdam tempora at cupiditate quis eum maiores libero
                            veritatis? Dicta facilis sint aliquid ipsum atque?
                        </p>
                    </MDBCol>
                    <MDBCol md='6' className='position-relative'>
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                        <MDBCard className='my-5 bg-glass'>
                            <MDBCardBody className='p-5'>
                                <h1>LogIn</h1>
                                <hr></hr>
                                <form onSubmit={e => this.onFormSubmit(e)}>
                                    <div className="mb-4">
                                        <label className="form-label">Email</label>
                                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.onEmailType}></input>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label">Password</label>
                                        <div className="containerPass">
                                            <div className="input-group mb-3">
                                                <input type="password" name="pass" id="pass" className={this.state.passBoxClasses} value={this.state.pass} onChange={this.onPassType}></input>
                                                <button type='button' id="reveal" className={this.state.revealBtnClasses} disabled="disabled" onMouseOver={this.onReveal}><span></span></button>
                                            </div>
                                        </div>
                                    </div>
                                    <button type="submit" className=' w-100 btn btn-primary' size='md'>LogIn</button>
                                </form>
                                <br />
                                <div className='d-flex justify-content-center mb-4'>
                                    <a className='link-primary' href='/forgetPassword'>Forget Password</a>
                                </div>
                                <hr></hr>
                                <div className="text-center">
                                    <p>Our Social media:</p>
                                    <a href='https://www.instagram.com' target="_blank" className='mx-3' style={{ color: '#1266f1' }}>
                                        <AiFillInstagram size={"6%"} />
                                    </a>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}