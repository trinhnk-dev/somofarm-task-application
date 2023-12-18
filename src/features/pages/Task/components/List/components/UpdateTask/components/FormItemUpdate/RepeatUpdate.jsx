import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { vi } from "date-fns/locale";
import "react-day-picker/dist/style.css";
import dayjs from "dayjs";

function RepeatUpdate({
  repeatValue,
  handleSelectRepeat,
  editingTask,
  startDate,
  endDate,
  selectedDays,
  setSelectedDays,
  initialSelectedDays,
  setInitialSelectedDays,
  shouldCheckRepeat,
  form,
}) {
  const disableRepeat = endDate ? !endDate.isValid() : null;
  let dateRepeateArray =
    editingTask && editingTask.dateRepeate
      ? editingTask.dateRepeate.map((date) => dayjs(date).format("YYYY-MM-DD"))
      : [];
  useEffect(() => {
    if (editingTask && editingTask.dateRepeate) {
      const formattedDays = editingTask.dateRepeate.map((date) =>
        dayjs(date).format("YYYY-MM-DD")
      );
      setInitialSelectedDays(formattedDays);
    }
  }, [editingTask]);

  useEffect(() => {
    // Xóa tất cả các ngày khi repeatValue chuyển sang false
    if (!repeatValue) {
      setInitialSelectedDays([]);
    }
  }, [repeatValue]);

  const modifiers = {
    selected: initialSelectedDays.map((day) => new Date(day)),
    today: new Date(),
  };

  const onDayClick = (day) => {
    const formattedDay = dayjs(day).format("YYYY-MM-DD");
    const indexInInitialSelectedDays =
      initialSelectedDays.indexOf(formattedDay);

    if (indexInInitialSelectedDays > -1) {
      // Ngày đã chọn trong initialSelectedDays: loại bỏ khỏi mảng
      setInitialSelectedDays(
        initialSelectedDays.filter((date) => date !== formattedDay)
      );
    } else {
      // Ngày chưa chọn trong initialSelectedDays: thêm vào mảng
      setInitialSelectedDays([...initialSelectedDays, formattedDay]);
    }

    const indexInSelectedDays = selectedDays.indexOf(formattedDay);
    const indexInitialSelectedDays = initialSelectedDays.indexOf(formattedDay);

    if (indexInSelectedDays > -1) {
      // Ngày đã chọn trong selectedDays: loại bỏ khỏi mảng
      setSelectedDays(selectedDays.filter((_, i) => i !== indexInSelectedDays));
    } else {
      // Ngày chưa chọn trong selectedDays: thêm vào mảng
      setSelectedDays([...selectedDays, formattedDay]);
      // setInitialSelectedDays([...initialSelectedDays, formattedDay]);
    }
    if (indexInitialSelectedDays > -1) {
      // Ngày đã chọn trong selectedDays: loại bỏ khỏi mảng
      setSelectedDays(
        selectedDays.filter((_, i) => i !== indexInitialSelectedDays)
      );
    } else {
      // Ngày chưa chọn trong selectedDays: thêm vào mảng
      setSelectedDays([...selectedDays, formattedDay]);
      // setInitialSelectedDays([...initialSelectedDays, formattedDay]);
    }
  };

  const disabledDate = (current) => {
    const currentDayjs = dayjs(current);

    const formattedStartDate = dayjs(editingTask.startDate).format("YYYY-MM-DD");
    const formattedEndDate = dayjs(editingTask.endDate).format("YYYY-MM-DD");


    // Tính khoảng cách ngày
    const daysDifference =
      startDate && endDate
        ? dayjs(endDate.format("YYYY-MM-DD")).diff(startDate.format("YYYY-MM-DD"), "day")
        : !startDate && endDate
        ? dayjs(endDate.format("YYYY-MM-DD")).diff(formattedStartDate, "day")
        : !startDate && !endDate
        ? dayjs(formattedEndDate).diff(formattedStartDate, "day")
        : startDate && !endDate
        ? dayjs(formattedEndDate).diff(startDate.format("YYYY-MM-DD"), "day")
        : null;
    // Disable ngày từ quá khứ đến endDate

    if (
      startDate
        ? currentDayjs.isBefore(dayjs(), "day") ||
          currentDayjs.isSame(dayjs(startDate), "day") ||
          currentDayjs.isBefore(dayjs(startDate), "day")
        : currentDayjs.isBefore(dayjs(), "day") ||
          currentDayjs.isSame(dayjs(editingTask.startDate), "day") ||
          currentDayjs.isBefore(dayjs(editingTask.startDate), "day")
    ) {
      return true;
    }

    if (
      endDate
        ? currentDayjs.isBefore(dayjs(), "day") ||
          currentDayjs.isSame(dayjs(endDate), "day") ||
          currentDayjs.isBefore(dayjs(endDate), "day")
        : currentDayjs.isBefore(dayjs(), "day") ||
          currentDayjs.isSame(dayjs(editingTask.endDate), "day") ||
          currentDayjs.isBefore(dayjs(editingTask.endDate), "day")
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

    for (let selectedDay of initialSelectedDays) {
      let dayAfterSelected = dayjs(selectedDay);
      for (let i = 1; i <= daysDifference; i++) {
        if (currentDayjs.isSame(dayAfterSelected.add(i, "day"), "day")) {
          return true;
        }
      }
    }

    let daysAvailableBefore = 0;
    let daysAvailableAfter = 0;
    let daysRepeatAvailableBefore = 0;
    let daysRepeatAvailableAfter = 0;

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

    for (let i = 1; i <= daysDifference; i++) {
      let dayBefore = currentDayjs.subtract(i, "day").format("YYYY-MM-DD");
      if (!initialSelectedDays.includes(dayBefore)) {
        daysRepeatAvailableBefore++;
      }

      let dayAfter = currentDayjs.add(i, "day").format("YYYY-MM-DD");
      if (!initialSelectedDays.includes(dayAfter)) {
        daysRepeatAvailableAfter++;
      }
    }

    // Nếu không đủ ngày trống trước hoặc sau ngày hiện tại để hoàn thành công việc, thì ngày đó cũng sẽ bị disabled
    if (
      daysAvailableBefore < daysDifference ||
      daysAvailableAfter < daysDifference
    ) {
      return true;
    }

    if (
      daysRepeatAvailableBefore < daysDifference ||
      daysRepeatAvailableAfter < daysDifference
    ) {
      return true;
    }
    return false;
  };

  const RenderFooter = () => {
    return (
      <div>
        <strong>Ngày đã chọn:</strong>
        {initialSelectedDays.length === 0 ? (
          <p>Chưa có ngày nào được chọn.</p>
        ) : (
          <ul>
            {initialSelectedDays.map((day) => (
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

  const validateRequireRepeat =
    repeatValue === true && initialSelectedDays.length === 0;

  return (
    <>
      <Form.Item
        label="Lặp lại"
        name="isRepeat"
        initialValue={
          editingTask
            ? {
                label: editingTask.isRepeat === true ? "Có" : "Không",
                value: repeatValue ? repeatValue : editingTask.isRepeat,
              }
            : ""
        }
      >
        <Select
          value={repeatValue}
          onChange={handleSelectRepeat}
          placeholder="Không"
        >
          <Select.Option value={false}>Không</Select.Option>
          <Select.Option value={true}>Có</Select.Option>
        </Select>
      </Form.Item>
      {repeatValue === true ? (
        <Form.Item
          label="Lặp những ngày"
          name="dates"
          rules={[
            {
              required: validateRequireRepeat,
              message: "Vui lòng chọn ngày lặp",
            },
          ]}
          initialValue={dateRepeateArray}
        >
          <style>{css}</style>
          <DayPicker
            mode="multiple"
            selected={initialSelectedDays.map((day) => new Date(day))} // Chuyển đổi chuỗi ngày thành đối tượng Date
            // onSelect={onSelectDay}
            disabled={!editingTask.endDate || disableRepeat || disabledDate}
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
            modifiers={modifiers}
            footer={<RenderFooter />}
          />
        </Form.Item>
      ) : null}
    </>
  );
}

export default RepeatUpdate;
