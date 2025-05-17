import React, { useState, useEffect } from "react";
import Select from "react-select";

const RadioList = ({ field, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

     
    useEffect(() => {
        if (!field?.options) return;

        const mappedOptions = field.options.map(option => ({
            label: option.o_label,
            value: option.o_key
        }));

        setOptions(mappedOptions);
    }, [field.options]);

      
    useEffect(() => {
        if (!options.length || !field.default) return;

        const defaultOption = options.find(opt => opt.value === field.default);
        if (defaultOption) {
            setSelectedOption(defaultOption);
            onChange({
                target: {
                    name: field.name,
                    value: defaultOption.value
                }
            });
        }
    }, [options, field.default]);

    const handleChange = (option) => {
        setSelectedOption(option);
        onChange({
            target: {
                name: field.name,
                value: option.value
            }
        });
    };

    return (
        <div>
            <label>{field?.label}</label>
            <Select
                className="input select"
                options={options}
                value={selectedOption}
                onChange={handleChange}
                placeholder={`اختر ${field?.label}`}
            />
        </div>
    );
};

export default RadioList;
