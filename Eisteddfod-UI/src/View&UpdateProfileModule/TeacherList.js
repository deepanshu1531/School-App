import React from 'react';
import './TeacherList.css'

export default class TeacherList extends React.Component {

    gotoProfile = (e, id) =>{
        e.preventDefault();
        window.location = '/teacherProfile/'+id;
    }

    render() {
        return (
            <div className="content">
                <br />
                <div className="container">
                    <div className="row">
                        {(this.props.teachers.length === 0)
                            ?
                            <h1>No teacher found!!!</h1>
                            :
                            <>
                                {this.props.teachers.map(teacher => (
                                    <div className="col-lg-4">
                                        <div className="text-center card-box">
                                            <div className="member-card pt-2 pb-2">
                                                <div className="thumb-lg member-thumb mx-auto"><img src={teacher.pic} className="rounded-circle img-thumbnail" alt={"https://bootdey.com/img/Content/avatar/avatar2.png"} style={{ height: "100px", width: "200px" }} /></div><br />
                                                <div className>
                                                    <h4>{teacher.title + " " + teacher.name}</h4>
                                                    <p>Assigned to:{teacher.assignedTo + " " + teacher.section}<br />
                                                    {/* goto chrome://settings/handlers and set mail.google.com as default by clicking 3 dots on the right. */}
                                                    <a href={`mailto:${teacher.email}`} className="text-pink" target="_blank"><i className="fa fa-envelope"></i> {teacher.email} </a></p>
                                                    <h6 style={{ color: "#9B59B6" }}>Mobile: {teacher.mob}</h6>
                                                    <h6 style={{ color: "#9B59B6" }}>Address: {teacher.add}</h6>
                                                </div>
                                                <hr />
                                                <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new" className="tooltips" target="_blank"><i className="fa fa-google" style={{ color: "green", fontSize: "2em" }} /></a><br />
                                                <button type="button" onClick={e=>this.gotoProfile(e, teacher.teacherId)} className="btn btn-primary mt-3 btn-rounded waves-effect w-md waves-light">View Profile</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        );
    }
}