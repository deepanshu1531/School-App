import React from 'react';
import ImageCarousel from '../ImageCarouselModule/ImageCarousel';
import NavigationBarPro from '../NavigationBar/NavigationBarPro';

export default class Welcome extends React.Component {
    render() {
        return (
            <div>
                <NavigationBarPro/>
                <br/>
                <ImageCarousel/>
            </div>
        );
    }
}