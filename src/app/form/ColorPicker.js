import React, { useState, useEffect } from "react";

const ColorPicker = ({ field, onChange }) => {
    const [color, setColor] = useState(field.default || "#000000");

    const isValidHex = (value) => /^#([0-9A-F]{3}){1,2}$/i.test(value);

    const updateColor = (newColor) => {
        setColor(newColor);
        onChange({
            target: {
                name: field.name,
                value: newColor
            }
        });
    };

    const handleColorInput = (e) => {
        const value = e.target.value;
        if (isValidHex(value)) {
            updateColor(value);
        } else {
            setColor(value); // تحديث العرض فقط بدون إرسال
        }
    };

    const handlePickerChange = (e) => {
        updateColor(e.target.value);
    };

    useEffect(() => {
        if (field.default && isValidHex(field.default)) {
            updateColor(field.default);
        }
    }, [field.default],updateColor);

    return (
        <div>
            <label>{field.label}</label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input
                    type="color"
                    value={isValidHex(color) ? color : "#000000"}
                    onChange={handlePickerChange}
                    style={{ width: "50px", height: "35px", border: "none", cursor: "pointer" }}
                />
                <input
                    type="text"
                    value={color}
                    onChange={handleColorInput}
                    placeholder="#RRGGBB"
                    style={{ width: "100px", padding: "5px" }}
                />
            </div>
        </div>
    );
};

export default ColorPicker;
