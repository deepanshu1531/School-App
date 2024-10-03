import React from 'react'
import NavigationBar from '../NavigationBar/NavigationBar';
import VideoList from './VideoList';
import axios from 'axios';
import Constants from '../Constants';
import Loader from '../LoaderModule/Loader';

export default class Videos extends React.Component {
    videos = undefined;
    state = {
        show: false,
        videos: [
            {
                id: '',
                original_title: '',
                title: '',
                artist: '',
                duration: '',
                publishedAt: ''
            }
        ]
    }

    searchVid = async (val) => {
        return this.state.videos.filter(video => video.title.toLocaleLowerCase().includes(val.toLowerCase()));
    }

    async componentDidMount() {
        this.videos = await axios.get(Constants.BACKEND_URL + "getAllVideos");
        if (this.videos.data !== "Error") {
            this.setState({
                videos: this.videos.data,
                show:true
            })
            document.getElementById("vid").removeAttribute("hidden")
        } else {
            this.setState({
                videos: this.state.videos,
                show:true
            })
            document.getElementById("vid").removeAttribute("hidden")
        }
    }

    onFormSubmit = async (searchVal) => {
        document.getElementById("vid").setAttribute("hidden", true);
        this.setState({
            videos: await this.searchVid(searchVal),
            show:true
        })
        document.getElementById("vid").removeAttribute("hidden")
    }

    async componentDidUpdate() {
        this.state.videos = this.videos.data;
    }

    render() {
        return (
            <div>
                <NavigationBar onSubmitForm={this.onFormSubmit}></NavigationBar>
                <Loader show={!this.state.show} />
                <div id="vid" hidden={true}>
                    <VideoList videos={this.state.videos}></VideoList>
                </div>
            </div>
        );
    }

}