import Select from "react-select";
import React, { useState, useEffect } from "react";

const CheckboxList = ({ field, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const opts = field.options.map(option => ({
            label: option.o_label,
            value: option.o_key
        }));
        setOptions(opts);

        // إعداد الخيارات الافتراضية إن وُجدت
        if (field.default) {
            const defaults = opts.filter(opt => field.default.includes(opt.value));
            setSelectedOptions(defaults);
            handleChange(defaults);
        }
    }, [field.options]);

    function handleChange(selected) {
        setSelectedOptions(selected);
        const values = selected.map(option => option.value);
        onChange({
            target: {
                name: field.name,
                value: values // أو خليه مصفوفة إذا النموذج يدعم ذلك
            }
        });
    }

    return (
        <div>
            <label>{field.label}</label>
            <Select
                options={options}
                value={selectedOptions}
                onChange={handleChange}
                isMulti
                placeholder={field.label}
            />
        </div>
    );
};

export default CheckboxList;
