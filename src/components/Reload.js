"use client";
import { useRouter } from "next/navigation";
import React from "react";
const Reload = ({ onClick, message }) => {
    const router = useRouter();
    if (!onClick) {
        onClick = () => {
            setTimeout(function () {
                router.refresh();
            }, 1000);
        };
    }
    return (
        <div
            className="containerMe "
            key={message + "reload"}
            style={{ textAlign: "center", height: "100vh" }}
        >
            <div>
                <img
                    src="/imgs/nanologo.png"
                    width={"150px"}
                    height={"150px"}
                    alt=""
                />
            </div>
            <div className="c-grey p-20"> {message} </div>
            <button
                className="hideStyle p-10 m-auto w-100 "
                style={{
                    backgroundColor: "var(--three-color)",
                    color: "white",
                    borderRadius: "10px"
                }}
                onClick={onClick}
            >
                {" "}
                Try agin{" "}
            </button>
        </div>
    );
};

export default Reload;
/*
// components/Reload.jsx
"use client";

import React from "react";

export default function Reload({ message }) {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <p style={{ marginBottom: "1rem", color: "#b00", fontSize: "1.2rem" }}>
                {message}
            </p>
            <button
                onClick={() => location.reload()}
                style={{
                    padding: "0.6rem 1.2rem",
                    backgroundColor: "#0070f3",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "1rem"
                }}
            >
                إعادة المحاولة
            </button>
        </div>
    );
}
*/
