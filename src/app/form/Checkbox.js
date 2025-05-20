import { useState } from "react";
const Checkbox = ({ field, onChange }) => {
    const [checked, setChecked] = useState(false);
    return (
        <>
          <label>{field.label}</label>
            <input
                type="checkbox"
                name={field.name}
                checked={checked}
                onChange={e => {
                    setChecked(e.target.value);
                    onChange({target:{
                      name:field.name,
                      value:e.target.checked
                    }});
                }}
            />
        </>
    );
};

export default Checkbox;
