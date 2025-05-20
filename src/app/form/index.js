import { useState, useEffect } from "react";
import { api } from "../../Services/api.js";
import { useLanguage } from "../../lang/LanguageContext.jsx";
import "./forms.css";
//import Select from "react-select";
//import countryList from "react-select-country-list";
//import { useMemo } from "react";

import Phone from "./PhoneInput.js";
import CountrySelect from "./CountrySelect.js";
//import LocationSelector from "./LocationSelector.js";
import FileUploader from "./FileUploader.js";
import RadioList from "./RadioList.js";
import Checkbox from "./Checkbox.js";
import CheckboxList from "./CheckboxList.js";
import ColorPicker from "./ColorPicker.js";
import MultiColorPicker from "./MultiColorPicker.js";
import MultiFileUploader from "./MultiFileUploader.js";
import NanoCaptcha from "./NanoCaptcha.js";
/*
function CountrySelector() {
    const options = useMemo(() => countryList().getData(), []);
    const [value, setValue] = useState(null);

    const changeHandler = value => {
        setValue(value);
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={changeHandler}
            placeholder="اختر الدولة"
        />
    );
}
*/
const Form = () => {
    const [fields, setFields] = useState([]);
    // const [form, setForm] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState("submitStatus");
    const { language } = useLanguage();
    useEffect(() => {
        api.get(`formbuilder/forms/1`, {
            headers: {
                "Accept-Language": language
            }
        })
            .then(res => {
                setLoading(false);
                // setForm(res.data);
                setFields(res.data.fields.data);
                /* const initialValues = {};
                res.data.data.forEach(field => {
                    initialValues[field.name] = "";
                });
                setValues(initialValues);
              */
                //setSubmitStatus(res.data.data.description);
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
                setSubmitStatus("فشل في تحميل الحقول");
            });
    }, [language]);

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    let countryExist = false;
    const inputs = fields.map((f, i) => {
        let Input = (
            <div>
                <label>{f.label ? f.label : "No label"} </label>
                <input
                    type={f.field_type.code === "datetime" ? "date" : "text"}
                    className="input"
                    name={f.name}
                    placeholder={f.field_type.code}
                    onChange={handleChange}
                    value={values[f.name]}
                />
                <p style={{ color: "red" }}>
                    E : {errors[f.name] ? errors[f.name] : ""}{" "}
                </p>
            </div>
        );
        switch (f.field_type.code) {
            case "phone":
                {
                    Input = (
                        <Phone
                            onChange={phone =>
                                setValues({ ...values, [f.name]: phone })
                            }
                        />
                    );
                }
                break;
            case "country_select":
            case "state_select":
                {
                    if (countryExist) {
                        return null;
                    } else countryExist = true;
                    return <CountrySelect handle={handleChange} />;
                }
                break;
            case "radio_list":
                return <RadioList field={f} onChange={handleChange} />;
                break;
            case "file_uploader":
                return (
                    <>
                        <label>{f.label} </label>
                        <FileUploader field={f} onChange={handleChange} />
                        <p style={{ color: "red" }}>E : {errors[f.name]} </p>
                    </>
                );
                break;
            case "checkbox":
                return <Checkbox field={f} onChange={handleChange} />;
            case "checkbox_list":
                return <CheckboxList field={f} onChange={handleChange} />;
                break;
            case "color_picker":
                return <ColorPicker field={f} onChange={handleChange} />;
                break;
            case "multi_color_picker":
                return <MultiColorPicker field={f} onChange={handleChange} />;
                break;
            case "multi_files":
                return <MultiFileUploader field={f} onChange={handleChange} />;
                break;
            case "nano_captcha":
                return <NanoCaptcha field={f} onChange={handleChange} />;
                break;
        }

        return Input;
    });

    if (loading) {
        return <div>loading.....</div>;
    }
    if (error) {
        return <div>{error} </div>;
    }
    /*  function submit(e) {
        e.preventDefault();
        api.post(`formbuilder/forms/add`, {
            ...values,
            form_id: 1
        })
            .then(res => {
                let err = res.data.errors;
                setErrors(err);
                setSubmitStatus(res.data.message + res.data.error);
            })
            .catch(error => {
                setSubmitStatus(error.message);
            });
    }*/
    function submit(e) {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            // إذا كان File نضيفه مباشرة، غير كذا نحوله لنص
            if (value instanceof File) {
                formData.append(key, value);
                setSubmitStatus("Fiile");
            } else {
                formData.append(key, value ?? ""); // نعالج null
            }
        });

        formData.append("form_id", 1);

        api.post(`formbuilder/forms/add`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                let err = res.data.errors;
                setErrors(err);
                setSubmitStatus(res.data.message + res.data.error);
            })
            .catch(error => {
                setSubmitStatus(error.message);
            });
    }

    return (
        <div className="forms rtl  containerMe">
            <div>
                <form onSubmit={submit} encType="multipart/form-data">
                    {inputs}
                    <button type="submit">Submit</button>
                    <p>{submitStatus} </p>
                </form>
            </div>

            {values.country ? values.country : "hhhh"}
            {values.state ? values.state : "hhhh"}
            {values.city ? values.city : "hhhh"}
        </div>
    );
};

export default Form;
