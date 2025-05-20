import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

function DateTimePicker() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            showTimeSelect
            dateFormat="Pp"
        />
    );
}

export default DateTimePicker;