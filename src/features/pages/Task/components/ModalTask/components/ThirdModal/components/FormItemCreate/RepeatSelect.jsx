import { Form, Select } from "antd";
import dayjs from "dayjs";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { vi } from "date-fns/locale";

function RepeatSelect({
  repeatValue,
  handleSelectRepeat,
  startDate,
  endDate,
  selectedDays,
  setSelectedDays,
}) {
  const onDayClick = (day) => {
    const formattedDay = dayjs(day).format("YYYY-MM-DD");
    const index = selectedDays.indexOf(formattedDay);

    if (index > -1) {
      // Ngày đã chọn: loại bỏ khỏi mảng
      setSelectedDays(selectedDays.filter((_, i) => i !== index));
    } else {
      // Ngày chưa chọn: thêm vào mảng
      setSelectedDays([...selectedDays, formattedDay]);
    }
  };

  const disabledDate = (current) => {
    const currentDayjs = dayjs(current);

    // Tính khoảng cách ngày
    const daysDifference = dayjs(endDate.format("YYYY-MM-DD")).diff(startDate.format("YYYY-MM-DD"), "day");


    // Disable ngày từ quá khứ đến endDate
    if (
      currentDayjs.isBefore(dayjs(), "day") ||
      currentDayjs.isSame(dayjs(endDate), "day") ||
      currentDayjs.isBefore(dayjs(endDate), "day")
    ) {
      return true;
    }

    // Disable các ngày sau ngày đã chọn dựa vào khoảng cách ngày
    for (let selectedDay of selectedDays) {
      let dayAfterSelected = dayjs(selectedDay);
      for (let i = 1; i <= daysDifference; i++) {
        if (currentDayjs.isSame(dayAfterSelected.add(i, "day"), "day")) {
          return true;
        }
      }
    }

    let daysAvailableBefore = 0;
    let daysAvailableAfter = 0;

    for (let i = 1; i <= daysDifference; i++) {
      let dayBefore = currentDayjs.subtract(i, "day").format("YYYY-MM-DD");
      if (!selectedDays.includes(dayBefore)) {
        daysAvailableBefore++;
      }

      let dayAfter = currentDayjs.add(i, "day").format("YYYY-MM-DD");
      if (!selectedDays.includes(dayAfter)) {
        daysAvailableAfter++;
      }
    }

    // Nếu không đủ ngày trống trước hoặc sau ngày hiện tại để hoàn thành công việc, thì ngày đó cũng sẽ bị disabled
    if (
      daysAvailableBefore < daysDifference ||
      daysAvailableAfter < daysDifference
    ) {
      return true;
    }

    return false;
  };

  const RenderFooter = () => {
    return (
      <div>
        <strong>Ngày đã chọn:</strong>
        {selectedDays.length === 0 ? (
          <p>Chưa có ngày nào được chọn.</p>
        ) : (
          <ul>
            {selectedDays.map((day) => (
              <li key={day}>{dayjs(day).format("DD/MM/YYYY")}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  const css = `
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: blue;
    color: blue;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
`;

  return (
    <>
      <Form.Item label="Lặp lại" name="isRepeat">
        <Select
          value={repeatValue}
          onChange={handleSelectRepeat}
          placeholder="Không"
        >
          <Select.Option value="Không">Không</Select.Option>
          <Select.Option value="Có">Có</Select.Option>
        </Select>
      </Form.Item>
      {repeatValue && (
        <>
          <Form.Item
            label="Lặp những ngày"
            name="dates"
            rules={[
              {
                required: selectedDays.length === 0,
                message: "Vui lòng chọn ngày lặp",
              },
            ]}
          >
            <style>{css}</style>
            <DayPicker
              mode="multiple"
              selected={selectedDays.map((day) => new Date(day))} // Chuyển đổi chuỗi ngày thành đối tượng Date
              // onSelect={onSelectDay}
              disabled={!endDate || !endDate.isValid() || disabledDate}
              onDayClick={onDayClick}
              formatters="YYYY-MM-DD"
              locale={vi}
              modifiersClassNames={{
                selected: "my-selected",
                today: "my-today",
              }}
              modifiersStyles={{
                disabled: { fontSize: "100%" },
              }}
              footer={<RenderFooter />}
            />
          </Form.Item>
        </>
      )}
    </>
  );
}

export default RepeatSelect;
