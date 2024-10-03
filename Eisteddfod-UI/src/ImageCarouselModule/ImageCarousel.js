import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from '3d-react-carousal';
import axios from 'axios';
import constants from '../Constants'
import Loader from '../LoaderModule/Loader';


export default class ImageCarousel extends React.Component {

    state = {
        show: false,
        images: ["https://picsum.photos/800/300/?random"]
    }

    async componentDidMount() {
        this.setState({ show: false });
        let imagesArray = await axios.get(constants.BACKEND_URL + "getAllPhotos");
        if (imagesArray.data !== "Error") {
            this.setState({
                images: imagesArray.data,
                show: true
            })
        } else {
            this.setState({
                images: ["https://picsum.photos/800/300/?random"]
            })
        }
    }

    render() {
        return (
            <>
                <br/><br/>
                <Loader show={!this.state.show} />
                <Carousel slides={this.state.images.map(image => (<img style={{ width: "700px", height: "400px" }} src={image}></img>))} autoplay={true} interval={5000} hidden={this.state.show} />
            </>
        )
    };
}
