//import "./styles.css";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { api } from "../../Services/api.js";

const CountrySelect = ({ handle }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);

    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
        )
            .then(response => response.json())
            .then(data => {
                // setCountries(data.countries);
                // setSelectedCountry(data.userSelectValue);
            })
            .catch(error => {});
    }, []);
    useEffect(() => {
        api.get(`location/countrys`)
            .then(res => res.data.data)
            .then(data => {
                let countrys = data.map(c => {
                    return { label: c.name, value: c.id, id: c.id };
                });
                setCountries(countrys);
            })
            .catch(error => {});
    }, []);
    useEffect(() => {
        //setStates([]);
        // setSelectedState(null);
        if (selectedCountry) {
            api.get(`location/states`, {
                params: {
                    country_id: selectedCountry?.id
                        ? selectedCountry.id.toString()
                        : ""
                }
            })
                .then(res => res.data.data)
                .then(data => {
                    let states = data.map(s => ({
                        label: s.name,
                        value: s.id,
                        id: s.id
                    }));
                    setStates(states);
                })
                .catch(error => {});
            setStates([]);
            setSelectedState(null);
        }
    }, [selectedCountry]);
    return (
        <div className="">
            <label>country </label>
            <Select
                
                className="input select"
                options={countries}
                value={selectedCountry}
                onChange={selectedOption => {
                    selectedOption.name = "country";
                    handle({ target: selectedOption });
                    setSelectedCountry(selectedOption);
                }}
                placeholder="Contry"
            />
            <label>State </label>
            <Select
                className="input select"
                options={states}
                value={selectedState}
                onChange={selectedOption => {
                    selectedOption.name = "state";
                    handle({ target: selectedOption });
                    setSelectedState(selectedOption);
                }}
                isDisabled={!selectedCountry}
                placeholder="اختر المدينة"
            />
        </div>
    );
};
// const CountrySelect = () => {
//     const [countries, setCountries] = useState([]);
//     const [selectedCountry, setSelectedCountry] = useState({});

//     useEffect(() => {
//         fetch(
//             "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
//         )
//             .then(response => response.json())
//             .then(data => {
//                 setCountries(data.countries);
//                 setSelectedCountry(data.userSelectValue);
//             })
//             .catch(error => {});
//     }, []);
//     return (
//         <div>
//             <Select
//                 options={countries}
//                 value={selectedCountry}
//                 onChange={selectedOption => setSelectedCountry(selectedOption)}
//             />

//         </div>
//     );
// };

export default CountrySelect;
