import React from 'react';

export default class NavigationBar extends React.Component {

    state = {
        searchTxt: "",
        navClasses: "navbar navbar-expand-lg navbar-dark",
        navButtonClick: false
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.search.value);
        console.log("1")
        this.props.onSubmitForm(e.target.search.value);
    }

    onType = (e) => {
        this.setState({
            searchTxt: e.target.value,
        })
        this.props.onSubmitForm(e.target.value);
    }

    onCollapseClick = () => {
        if (this.state.navButtonClick) {
            this.setState({ navClasses: "navbar navbar-expand-lg navbar-dark", navButtonClick: false })
        }
        else {
            this.setState({ navClasses: "navbar navbar-expand-lg navbar-dark fixed-top", navButtonClick: true })
        }
    }

    logout = (e) => {
        e.preventDefault()
        localStorage.removeItem('user');
        window.location = '/';
    }

    render() {
        return (
            <>
                <nav className={this.state.navClasses} style={{ backgroundColor: "#7a1ae8" }}>
                    <div className="container">
                        {/* <a className="navbar-brand">Eisteddfod</a> */}
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item active">
                                    <a href="/" className="navbar-brand">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a href="/videos" className="navbar-brand">Video</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/email" className="navbar-brand">E-Mail</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/attendence" className="navbar-brand">Attendence</a>
                                </li>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-item dropdown">
                                            <a className="navbar-brand dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Teachers
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li><a href="/teachers" className="dropdown-item">All Teachers</a></li>
                                                <li><a href="/registerTeacher" className="dropdown-item">Add Teacher</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                        <li className="nav-item dropdown">
                                            <a className="navbar-brand dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Students
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                                <li><a href="/students" className="dropdown-item">All Students</a></li>
                                                <li><a href="/registerStudent" className="dropdown-item">Add Student</a></li>
                                                <li><a href="/studentAttendence" className="dropdown-item">Mark Attendence</a></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                        <form className="d-flex form-inline my-2 my-lg-0" onSubmit={e => this.handleSubmit(e)}>
                            <input name="search" className="form-control me-2" placeholder="Search" value={this.state.searchTxt} onChange={e => this.onType(e)}></input>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                <li className="nav-item dropdown">
                                    <a className="navbar-brand dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Account
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a href="/profile" className="dropdown-item">Profile</a></li>
                                        <li><a href="/changePassword" className="dropdown-item">Change Password</a></li>
                                        <li><button className="dropdown-item" onClick={e => this.logout(e)}>LOGOUT</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        );
    }

}