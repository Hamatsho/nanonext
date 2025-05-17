// src/pages/GalleryPage.jsx
import React from 'react';
import LightGallery from 'lightgallery/react';

// استيراد ملفات الأنماط (Styles)
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-thumbnail.css';

// استيراد الوحدات (Plugins)
import lgZoom from 'lightgallery/plugins/zoom';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgThumbnail from 'lightgallery/plugins/thumbnail';

const GalleryPage = () => {
    const images = [
      { src: "/imgs/landing1.webp", alt: "صورة 1" },
      { src: "/imgs/landing2.webp", alt: "صورة 2" },
      { src: "/imgs/nanologo.png", alt: "صورة 3" },
      { src: "/imgs/nanologo.png", alt: "صورة 3" },
      { src: "/imgs/nano.jpeg", alt: "صورة 4" },
    ];

    return (
        <div style={{
            //  maxWidth: '800px',
         margin: '50px auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>معرض الصور</h1>
            <LightGallery
                speed={500}
                plugins={[lgZoom, lgFullscreen, lgThumbnail]}
            >
                {images.map((image, index) => (
                    <a
                        key={index}
                        href={image.src}
                        data-lg-size="1400-900"
                        data-sub-html={`<h4>${image.alt}</h4>`}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{
                                width: '100%',
                                // maxHeight: '200px',
                                objectFit: 'cover',
                                marginBottom: '10px',
                                borderRadius: '8px',
                                cursor: 'pointer'
                            }}
                        />
                    </a>
                ))}
            </LightGallery>
        </div>
    );
};

export default GalleryPage;
