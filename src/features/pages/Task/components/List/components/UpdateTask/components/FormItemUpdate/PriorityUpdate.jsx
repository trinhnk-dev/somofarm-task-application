import { Form, Select } from 'antd'
import React from 'react'

function PriorityUpdate({priorityValue, handlePriorityChange, editingTask}) {
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
          initialValue={editingTask ? editingTask.priority : ""}
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

export default PriorityUpdate
