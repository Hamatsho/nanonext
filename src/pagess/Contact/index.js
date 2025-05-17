import React, { useEffect, useState } from "react";

import { api } from "../../Services/api.js";
import "./contact.css";
import { useLanguage } from "../../lang/LanguageContext.jsx";
const Contact = () => {
    const [fields, setFields] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [submitStatus, setSubmitStatus] = useState("");
    const { language } = useLanguage();
    useEffect(() => {
        api.get("cms/contact-forms/fields", {
            headers: {
                "Accept-Language": language
            }
        }) // غيّر الرابط حسب API الحقيقية
            .then(res => {
                if (res.data.status && res.data.data) {
                    setFields(res.data.data);
                    const initialValues = {};
                    res.data.data.forEach(field => {
                        initialValues[field.name] = "";
                    });
                    setValues(initialValues);
                }
            })
            .catch(() => setSubmitStatus("فشل في تحميل الحقول"));
    }, [language]);

    const validate = () => {
        const newErrors = {};
        fields.forEach(field => {
            const value = values[field.name];
            if (field.validation) {
                field.validation.forEach(rule => {
                    if (rule.validation_type === "required" && !value) {
                        newErrors[field.name] = rule.validation_error;
                    }
                    if (rule.validation_type === "email" && value) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            newErrors[field.name] = rule.validation_error;
                        }
                    }
                    if (rule.validation_type === "numeric" && value) {
                        if (!/^\d+$/.test(value)) {
                            newErrors[field.name] = rule.validation_error;
                        }
                    }
                });
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = e => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validate()) return;

        api.post("cms/contact-forms/send", values)
            .then(res => {
                if (res.data.status) {
                    setSubmitStatus({ msg: res.data.message, color: "green" });
                    setValues(
                        fields.reduce(
                            (acc, field) => ({ ...acc, [field.name]: "" }),
                            {}
                        )
                    );
                } else {
                    setSubmitStatus({ msg: res.data.errors[0], color: "red" });
                    setTimeout(function () {
                        setSubmitStatus(false);
                    }, 10000);
                }
            })
            .catch(err => {
                setSubmitStatus({ msg: err.message, color: "red" });
            });
    };

    const direction = {
        direction: language === "en" ? "ltr" : "rtl"
    };
    return (
        <div className={`contact `}>
            <div className="image">
                <div className="content">
                    <h3>Nano2soft</h3>
                    <p>
                        نانو 2 سوفت للبرمجيات خيارك التقني الأول . من فضلك
                        اخبرنا عن احتياجك من خلال تعبئة الحقول
                    </p>
                    <img src="/imgs/nanologo.png" alt="" />
                </div>
            </div>
            <div className="form">
                <div className="content">
                    <h3>
                        {" "}
                        {language === "en"
                            ? "You can contact us from here :"
                            : ": يمكنك التواصل معنا من هنا"}{" "}
                    </h3>
                    <form
                        className=""
                        onSubmit={handleSubmit}
                        accept-charset="utf-8"
                    >
                        {fields.map(field => (
                            <>
                                {field.type === "textarea" ? (
                                    <textarea
                                        name={field.name}
                                        value={values[field.name]}
                                        onChange={handleChange}
                                        placeholder={field.label}
                                        className="input"
                                        style={direction}
                                    />
                                ) : (
                                    <>
                                        <label
                                            style={{
                                                textAlign:
                                                    language === "en"
                                                        ? "left"
                                                        : "right"
                                            }}
                                        >
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type}
                                            name={field.name}
                                            value={values[field.name]}
                                            placeholder={field.label}
                                            onChange={handleChange}
                                            autoFocus={field.autofocus === "1"}
                                            className="input"
                                            style={direction}
                                        />
                                    </>
                                )}
                                {errors[field.name] && (
                                    <p>{errors[field.name]}</p>
                                )}
                            </>
                        ))}
                        {submitStatus && (
                            <div
                                style={{
                                    padding: "10px 0",
                                    color: submitStatus.color
                                }}
                            >
                                {submitStatus.msg}
                            </div>
                        )}

                        <button type="submit">
                          {language === "en"?"Send" : "إرسال"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
