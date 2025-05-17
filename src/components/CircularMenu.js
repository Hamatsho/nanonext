
import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import './circularMenu.css';
import { api } from '../Services/api';
function checkImg(path,callback) {
    const img = new Image()
    img.onload = () => callback(true)
    img.onerror = () => callback(false)
    img.src = path   
}

function ImgOrIcon({src,alt}) {
  const [isError, setIsError] = useState(false);
  checkImg(src, (img) =>  setIsError(!img));
  if(isError) {
      return <FontAwesomeIcon icon={faBars} />;
} else {
    return <img src={src} alt="noImg" width={"100%"} />;
  }
}
const CircularMenu = () => {
    const [isOpen, setIsOpen] = useState(false); // حالة فتح/إغلاق القائمة
    const [position, setPosition] = useState({ top: 100, left:0 }); // موقع القائمة
    const menuRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleMouseDown = (e) => {
        const menu = menuRef.current;
        if (!menu) return;

        const startY = e.clientY;
        const startTop = position.top ;
        const handleMouseMove = (moveEvent) => {
            const deltaY = moveEvent.clientY - startY ;
          
            let newTop =  startTop + deltaY;
            if(newTop < 100)
              newTop = 0;
            else if(newTop > 400) {
              newTop = 400
            } 
            

            setPosition({
              top: newTop,
            });
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener("touchmove", handleMouseMove);
            window.removeEventListener("touchend", handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener("touchmove", handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
    };
const [data, setData] = useState([])
    useEffect(() => {
      api.get("basic/settings")
      .then((data) => {
        setData(data.data.social_links);
        console.log(data);
        
      }).catch((error) => {

      })
    },[])
    const ui = data.map((link) => {
      if(!link.icon) {
        link.icon = `fab fa-${link.name.toLowerCase()}`;
      }
      return (
        <a
          href={link.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={link.icon} ></i>
          {link.icon ? "": link.name}
          {/* <FontAwesomeIcon icon={faFacebook} /> */}
        </a>
      );
    })
    return (
      <div
   
        className={`circular-menu ${isOpen ? "open" : ""}`}
        ref={menuRef}
        style={{ top: position.top, }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* زر التحكم في القائمة */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {
            isOpen ? (
              <FontAwesomeIcon icon={faClose}  />
            ) : (
              <ImgOrIcon src="/imgs/socialIcon.jpg" />
            )
          }
        </div>

        {isOpen && (
          <div className="menu-items">
            {ui}
          </div>
        )}
      </div>
    );
};

export default CircularMenu;
