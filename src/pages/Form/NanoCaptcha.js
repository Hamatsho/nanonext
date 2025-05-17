import React, { useState, useEffect } from "react";
import { api } from "../../Services/api.js";
const NanoCaptcha = () => {
    const [captchaKey, setCaptchaKey] = useState("");
    const [captchaImg, setCaptchaImg] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [resultMessage, setResultMessage] = useState("Message");

  /*  const getCaptcha = async () => {
        try {
            const response = await fetch(
                "https://account.now-ye.com/api/v1/captcha/captcha"
            );
            const data = await response.json();
            setCaptchaKey(data.data.key);
            setCaptchaImg(data.data.img);
            setResultMessage("");
            setInputValue("");
        } catch (error) {
            setResultMessage("فشل تحميل الكابتشا.");
        }
    };
*/
   const getCaptcha = () => {
        api.get(`captcha/captcha`)
            .then(res => {
                const data = res.data.data;
                setCaptchaKey(data.key);
                setCaptchaImg(data.img);
                setResultMessage("تم التحديث");
                setInputValue("");
            })
            .catch(error => {
                setResultMessage("فشل تحميل الكابتشا.");
            });
    };
    const validateCaptcha = async (e) => {
        e.preventDefault()
        if (!inputValue) {
            setResultMessage("الرجاء إدخال الكود.");
            return;
        }

      /*  try {
            const response = await fetch(
                "https://account.now-ye.com/api/v1/captcha/captcha/check",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ key: captchaKey, value: inputValue })
                }
            );
            const result = await response.json();

            if (result.status) {
                setResultMessage("تم التحقق بنجاح!");
            } else {
                setResultMessage("التحقق فشل. حاول مرة أخرى.");
                getCaptcha(); // إعادة تحميل الكابتشا لو فشل
            }
        } catch (error) {
            setResultMessage("حدث خطأ أثناء التحقق.");
        }
        */
        api.post(`captcha/captcha/check`, {
            captcha_key: captchaKey,
            value: inputValue
        })
            .then(res => {
                setResultMessage(res.data.message);
            })
            .catch(error => {
                setResultMessage(error.message);
                getCaptcha();
            });
            
    };

    useEffect(() => {
        getCaptcha();
    }, []);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>تحقق من الكابتشا</h1>

            <div style={{ marginBottom: "20px" }}>
                {captchaImg && (
                    <img
                        src={captchaImg}
                        alt="Captcha"
                        style={{
                            border: "1px solid #ccc",
                            marginBottom: "10px"
                        }}
                    />
                )}
                <br />
                <button onClick={getCaptcha}>تحديث الكابتشا</button>
            </div>

            <input
                type="text"
                placeholder="أدخل الكود هنا"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                style={{ padding: "10px", margin: "5px", fontSize: "16px" }}
            />
            <br />
            <button
                onClick={validateCaptcha}
                style={{ padding: "10px", fontSize: "16px" }}
            >
                تحقق
            </button>

            <p style={{ marginTop: "20px" }}>{resultMessage}</p>
        </div>
    );
};

export default NanoCaptcha;
