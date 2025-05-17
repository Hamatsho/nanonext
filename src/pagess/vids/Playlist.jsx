import React, { useEffect, useState } from "react";
import "./styles.css";
import { fetchData } from "../../Services/api";
import Skeleton from "react-loading-skeleton";

const Playlist = ({ onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData("media/playlists")
      .then((data) => {
        setPlaylists(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  let ui = playlists.map((playlist) => (
    <div
      key={playlist.id}
      className="playlist-item"
      onClick={() => onSelectPlaylist(playlist.id)}
    >
      <img src={playlist.image.original} alt={playlist.name} />
      <h3>{playlist.name}</h3>
    </div>
  ));
  const Sk = (
    <Skeleton
      containerClassName="playlist-container containerMe"
      width={"200px"}
      height={"50px"}
    />
  );
  if (loading) {
    ui = [Sk, Sk, Sk];
  }
  return <div className="playlist-container containerMe">{ui}</div>;
};

export default Playlist;
