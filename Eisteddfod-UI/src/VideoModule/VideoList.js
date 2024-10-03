import React from 'react'
import './Videos.css'

export default class VideoList extends React.Component {

    render() {
        return (
            <div className="container" align="center">
                {(this.props.videos.length === 0)
                    ?
                    <h1>No video found!!!</h1>
                    :
                    <>
                        {this.props.videos.map(video => (
                            <div>
                                <hr></hr>
                                <div className="card mb-3 vidCardList">
                                    <div className="row g-1">
                                        &emsp;&emsp;&emsp;
                                        <div className="col-md-3">
                                            &nbsp;
                                            <iframe className="vidFrame"
                                                src={"https://www.youtube.com/embed/" + video.id + "?mute=1"} allowFullScreen>
                                            </iframe>
                                            &nbsp;
                                        </div>
                                        <div className="col-md-8">
                                            &nbsp;
                                            <div className="card-body">
                                                <h5 className="card-title">{video.title}</h5>
                                                <hr></hr>
                                                <p className="card-text">{video.original_title}</p>
                                                <p className="card-text"><small className="text-body-secondary">{video.publishedAt}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                }
            </div>
        );
    }
}