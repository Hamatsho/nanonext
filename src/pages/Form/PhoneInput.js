import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useEffect, useState } from "react";
function Phone({onChange}) {
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("ye");
    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then(response => response.json())
            .then(data => {
                setCountry(data.userSelectValue?.isoCode);
            })
            .catch(error => {
                setCountry("ye");
            });
    }, []);

    return (
        <>
            <label>Phone</label>
            <PhoneInput
           
            className="ltr"
                country={country} 
                value={phone}
                onChange={onChange}
            />
        </>
    );
}
export default Phone;
