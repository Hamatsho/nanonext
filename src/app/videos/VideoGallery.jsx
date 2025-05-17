"use client"
import React, { useEffect, useState } from "react";
import "./styles.css";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";

const VideoGallery = ({ playlistId }) => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchData("media/videos", {
            params: {
                categories_id: playlistId
            }
        })
            .then(data => {
                setVideos(data.data);
                setLoading(false);
            })
            .catch(error => {
                // setLoading(false)
                console.log(error);
            });

        // if (playlistId) fetchVideos();
    }, [playlistId]);

    let ui = videos.map(video => (
        <div className="video" key={video.id}>
            <div key={video.id} className="vid">
                <video
                    style={{ display: "block" }}
                    controls
                    src={video.video.path}
                />
            </div>
            <p className="desc"> {video.name} </p>
        </div>
    ));
    if (loading) {
        const Sk = () => (
            <Skeleton
                containerClassName="video-gallery containerMe"
                width={"200px"}
                height={"200px"}
            />
        );
        ui = [
          <Sk key="1" />, 
          <Sk key="2" />, 
          <Sk key="3" />, 
          <Sk key="4" />, 
        
        ];
    }
    if (ui.length === 0) {
        ui = <p className="placeholder-text"> NO Videos </p>;
    }
    return <div className="video-gallery">{ui}</div>;
};

export default VideoGallery;
