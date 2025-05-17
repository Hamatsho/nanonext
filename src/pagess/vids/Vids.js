import React, { useState } from 'react';
import Playlist from './Playlist';
import VideoGallery from './VideoGallery';
import './styles.css';

const Vids = () => {
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
        
    return (
        <div className="app-container containerMe">
            <aside className="sidebar ">
                <h2>قوائم التشغيل</h2>
                <Playlist onSelectPlaylist={setSelectedPlaylist} />
            </aside>
            <main className="main-content">
                {selectedPlaylist ? (
                    <VideoGallery playlistId={selectedPlaylist} />
                ) : (
                    <p className="placeholder-text">اختر قائمة تشغيل لعرض الفيديوهات</p>
                )}
            </main>
        </div>
    );
};

export default Vids;
