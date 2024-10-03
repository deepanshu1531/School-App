import React from 'react';
import Calendar from 'react-calendar';
import './Attendence.css'
// import "./Calendar.css";

export default class Attendence extends React.Component {

    setClass = (date) => {
        const dateobj =
            this.props.attendence.find((day) => {
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
            <div>
                <Calendar className="react-calendar2"
                    tileClassName={({ activeStartDate, date, view }) => this.setClass(date)}
                />
            </div>
        );
    }
}