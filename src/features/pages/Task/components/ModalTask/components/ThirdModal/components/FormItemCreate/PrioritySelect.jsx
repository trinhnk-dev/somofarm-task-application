import { Form, Select } from 'antd'
import React from 'react'

function PrioritySelect({priorityValue, handlePriorityChange}) {
  return (
    <Form.Item
          label="Độ ưu tiên"
          name="priority"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn độ ưu tiên",
            },
          ]}
        >
          <Select
            value={priorityValue}
            onChange={handlePriorityChange}
            placeholder="Chọn độ ưu tiên"
          >
            <Select.Option value="Thấp">Thấp</Select.Option>
            <Select.Option value="Trung bình">Trung bình</Select.Option>
            <Select.Option value="Cao">Cao</Select.Option>
          </Select>
        </Form.Item>
  )
}

export default PrioritySelect
