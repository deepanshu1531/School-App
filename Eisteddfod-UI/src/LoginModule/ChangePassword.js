import React from 'react';
import NavigationBarPro from "../NavigationBar/NavigationBarPro";
import ResetForgetPassword from "./ResetForgetPassword";

export default class ChangePassword extends React.Component{
    render() {
        return (
            <>
                <NavigationBarPro />
                <ResetForgetPassword />
            </>
        );
    }
}