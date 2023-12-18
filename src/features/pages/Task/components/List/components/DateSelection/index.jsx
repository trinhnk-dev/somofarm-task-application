import { DatePicker, Divider } from "antd";
import React from "react";

function DateSelectionComp({
  selectedDate,
  handleDateChange,
}) {
  return (
    <>
    <h6 style={{marginBottom: "7px", fontSize: "16px"}}>Xem theo ngày</h6>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        placeholder="Chọn ngày"
        format="DD-MM-YYYY"
        style={{width: "80%", marginBottom: "20px"}}
      />
      <Divider style={{margin: 0}}/>
    </>
  );
}

export default DateSelectionComp;
