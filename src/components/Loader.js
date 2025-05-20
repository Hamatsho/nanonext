"use client"
 const Loader = ({height})=> (
        <div
        className="loader-parent"
        style={{height:height? height:"80vh"}}
        > 
           <div className="loader"></div>
        </div>
    );
    
    export default Loader;