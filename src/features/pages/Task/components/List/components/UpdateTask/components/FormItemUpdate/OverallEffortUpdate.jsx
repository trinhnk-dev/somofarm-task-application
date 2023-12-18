import { Form, Select } from "antd";
import React from "react";

function OverallEffortUpdate({
  overallEffortHour,
  handleOverallEffortHour,
  overallEfforMinutes,
  handleOverallEfforMinutes,
  editingTask,
}) {
  return (
    <Form.Item
      label="Thời gian làm việc phải bỏ ra"
      style={{ marginBottom: 0 }}
      required
      rules={[
        {
          required: true,
          message: "Vui lòng chọn thời gian làm việc phải bỏ ra",
        },
      ]}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Form.Item
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn giờ làm việc",
            },
          ]}
          name="overallEffortHour"
          initialValue={
            editingTask
              ? {
                  label: `${parseInt(
                    editingTask.overallEffortHour,
                    10
                  )} giờ`,
                  value: parseInt(editingTask.overallEffortHour, 10),
                }
              : ""
          }
          style={{ width: "49%" }}
        >
          <Select
            placeholder="Chọn giờ"
            value={overallEffortHour}
            onChange={handleOverallEffortHour}
          >
            {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
              <Select.Option key={hour} value={hour.toString()}>
                {hour < 10 ? `0${hour}` : hour} giờ
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phút làm việc",
            },
          ]}
          name="overallEfforMinutes"
          initialValue={
            editingTask
              ? {
                  label: `${parseInt(
                    editingTask.overallEfforMinutes,
                    10
                  )} phút`,
                  value: parseInt(editingTask.overallEfforMinutes, 10),
                }
              : ""
          }
          style={{ width: "49%" }}
        >
          <Select
            placeholder="Chọn phút"
            value={overallEfforMinutes}
            onChange={handleOverallEfforMinutes}
          >
            {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
              <Select.Option key={minute} value={minute.toString()}>
                {minute < 10 ? `0${minute}` : minute} phút
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
    </Form.Item>
  );
}

export default OverallEffortUpdate;
