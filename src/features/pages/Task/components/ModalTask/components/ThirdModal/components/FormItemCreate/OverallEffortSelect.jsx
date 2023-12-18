import { Form, Select } from 'antd'
import React from 'react'

function OverallEffortSelect({overallEffortHour, handleOverallEffortHour, overallEfforMinutes, handleOverallEfforMinutes}) {
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
              name="overallEffortHour"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn giờ làm việc",
                },
              ]}
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
              name="overallEfforMinutes"
              required
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phút làm việc",
                },
              ]}
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
  )
}

export default OverallEffortSelect
