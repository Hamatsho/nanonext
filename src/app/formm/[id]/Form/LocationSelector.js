import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

// دالة لتوليد صورة العلم باستخدام كود الدولة
const getFlagUrl = countryCode =>
    `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;
/*
const customSingleValue = ({ data }) => (
    <div className="flex items-center gap-2">
        <img
            src={getFlagUrl(data.value)}
            alt={data.label}
            style={{ width: "20px", height: "15px", objectFit: "cover" }}
        />
        {data.label}
    </div>
);

const customOption = props => {
    const { data, innerRef, innerProps } = props;
    return (
        <div
            ref={innerRef}
            {...innerProps}
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100"
        >
            <img
                src={getFlagUrl(data.value)}
                alt={data.label}
                style={{
                    width: "20px",
                    height: "15px",
                    objectFit: "cover",
                    backGroundColor: "red"
                }}
            />
            {data.label}
        </div>
    );
};
*/
const LocationSelector = ({ onChangeCountry, onChangeState, onChangeCity }) => {
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [countryOptions, setCountryOptions] = useState([]);
    const [stateOptions, setStateOptions] = useState([]);
    const [cityOptions, setCityOptions] = useState([]);
    //CountrySelect.js
    //const [countries2, setCountries2] = useState([]);
    const [values, setValues] = useState([]);
    // const [selectedCountry2, setSelectedCountry2] = useState({});
    const selectedData = {
        country: selectedCountry?.label || null,
        countryCode: selectedCountry?.value || null,
        state: selectedState?.label || null,
        stateCode: selectedState?.value || null,
        city: selectedCity?.label || null
    };
    useEffect(() => {
        fetch(
            "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code&language=ar"
        )
            .then(response => response.json())
            .then(data => {
                //setCountries2(data.countries);
                setCountryOptions(data.countries);
                // setSelectedCountry2(data.userSelectValue);
                setSelectedCountry(data.userSelectValue);
                onChangeCountry({
                    name: "country",
                    value: data.userSelectValue.label
                });
            })
            .catch(error => {
                const countries = Country.getAllCountries();
                setCountryOptions(
                    countries.map(country => ({
                        label: country.name,
                        value: country.isoCode
                    }))
                );
            });
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const states = State.getStatesOfCountry(selectedCountry.value);
            setStateOptions(
                states.map(state => ({
                    label: state.name,
                    value: state.isoCode
                }))
            );
            setSelectedState(null);
            onChangeCountry({ name: "state", value: null });
            setSelectedCity(null);
            setCityOptions([]);
        }
    }, [selectedCountry]);

    useEffect(() => {
        if (selectedCountry && selectedState) {
            const cities = City.getCitiesOfState(
                selectedCountry.value,
                selectedState.value
            );
            setCityOptions(
                cities.map(city => ({
                    label: city.name,
                    value: city.name
                }))
            );
            setSelectedCity(null);
            onChangeCountry({ name: "city", value: null });
        }
    }, [selectedState]);

    return (
        <div className="flex  gap-4 max-w-md mx-auto">
            <label>Country</label>
            <Select
                className="rtl"
                name="country"
                options={countryOptions}
                value={selectedCountry}
                onChange={selectedOption => {
                    setValues([...values, selectedOption]);
                    setSelectedCountry(selectedOption);
                    onChangeCountry({
                        name: "country",
                        value: selectedOption?.label
                    });
                }}
                placeholder="اختر الدولة"
            />
            <label>State</label>
            <Select
                className="rtl"
                options={stateOptions}
                value={selectedState}
                onChange={selectedOption => {
                    setSelectedState(selectedOption);
                    onChangeCountry({
                        name: "state",
                        value: selectedOption?.label
                    });
                }}
                placeholder="اختر الولاية / المحافظة"
                isDisabled={!selectedCountry}
            />
            <label>City</label>
            <Select
                options={cityOptions}
                value={selectedCity}
                onChange={selectedOption => {
                    setSelectedCity(selectedOption);
                    onChangeCountry({
                        name: "city",
                        value: selectedOption?.label
                    });
                }}
                placeholder="اختر المدينة"
                isDisabled={!selectedState}
            />
        </div>
    );
};

export default LocationSelector;
