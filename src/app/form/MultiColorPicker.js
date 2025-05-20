import React, { useState, useEffect } from "react";

const MultiColorPicker = ({ field, onChange }) => {
    const [colors, setColors] = useState(
        field.default ? field.default.split(" | ") : ["#000000"]
    );

    const isValidHex = (value) => /^#([0-9A-F]{3}){1,2}$/i.test(value);

    const updateColors = (newColors) => {
        setColors(newColors);
        onChange({
            target: {
                name: field.name,
                value: newColors.join(" | ")
            }
        });
    };

    const handleColorChange = (index, value) => {
        const newColors = [...colors];
        newColors[index] = value;
        updateColors(newColors);
    };

    const addColor = () => {
        updateColors([...colors, "#000000"]);
    };

    const removeColor = (index) => {
        const newColors = colors.filter((_, i) => i !== index);
        updateColors(newColors);
    };

    useEffect(() => {
        if (field.default) {
            updateColors(field.default.split(" | "));
        }
    }, [field.default]);

    return (
        <div>
            <label>{field.label}</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {colors.map((color, index) => (
                    <div key={index} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <input
                            type="color"
                            value={isValidHex(color) ? color : "#000000"}
                            onChange={(e) => handleColorChange(index, e.target.value)}
                        />
                        <input
                            type="text"
                            value={color}
                            onChange={(e) => handleColorChange(index, e.target.value)}
                            style={{ width: "100px", padding: "5px" }}
                        />
                        <button type="button" onClick={() => removeColor(index)}>
                            حذف
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addColor}>
                    + إضافة لون
                </button>
            </div>
        </div>
    );
};

export default MultiColorPicker;
