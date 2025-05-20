"use client";

import { useState } from "react";

import "./contact.css"
import { useLanguage } from "@/lang/LanguageContext";

function Form() {
    const [fields, setFields] = useState({ data: [] });
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        let inputs = fields.map((field,i) => {
            if(field.type === "textarea") {
                return <textarea className="input" 
                    placeholder={field.label}
                ></textarea>
            } else {
                <input type={field.type} 
                        placeholder={field.label}
                        autoFocus={field.autoFocus == "1" ? true: false}
                        {  ...field.validation.map((v) => {
                            
                        })}
                />
            }
        })
    return (
       <form action="" method="get" accept-charset="utf-8" >

       </form>
    )
}

const Contact = () => {
    const [data, setData] = useState({
       name:"",
       email:"",
       phone:"",
       message:"" 
    })
     function submit(event) {
        event.preventDefault();
        console.log(data);
  }
  const {language} = useLanguage()
  const direction = {
    direction:language === "en"? "ltr": "rtl"
  }
    return (
        <div className="discount" id="discount">
		<div className="image">
			<div className="content">
				<h2>We have a discount</h2>
				<p>.We are helping the people poor.We are helping the people poor.We are helping the people poor.We are helping the people poor.We are helping the people poor.We are helping the people poor.We are helping the people poor</p>
				<img src="/imgs/nanologo.png" alt="" />
			</div>
		</div> 
		<div className="form">
			<div className="content">
				<h2>يمكنك التواصل معنا    </h2>
				<form onSubmit={submit} acceptCharset="utf-8">
					<input className="input" type="text" placeholder={language === "en"? "Your Name" : "الاسم"}
                    value={data.name}
                    onChange={(event)=> {
                        setData({...data, name:event.target.value})
                    }}
                    required
                    // autoFocus
                    style={ direction}
                    />
					<input  required className="input" type="email" placeholder={language === "en"? "Your Email" : "البريد الإلكتروني"}
                      
                      value={data.email}
                    onChange={(event)=> {
                        setData({...data, email:event.target.value})
                    }}
                      style={ direction}
                    />
					<input  required className="input" type="text" placeholder={language === "en"? "Your Phone" : "رقم الهاتف"} 
                          value={data.phone}
                          onChange={(event)=> {
                        setData({...data, phone:event.target.value})
                    }}
                      style={ direction}
                    />
					<textarea  required className="input" placeholder={language === "en"? "Tell Us About Your Needs " : "أخبرنا عن احتياجك"} 
                          value={data.message}
                         onChange={(event)=> {
                        setData({...data, message:event.target.value})
                    }}
                      style={ direction}
                    ></textarea>
					<input type="submit" value={language === "en"? "Send": "إرسال"} />
				</form>
			</div>
		</div>
		
	</div>
    )
}
export default Contact;