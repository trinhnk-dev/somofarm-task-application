import { Form, Select } from 'antd'
import React from 'react'

function TaskTypeActiveSelect({taskTypeActiveOther, handleTaskTypeChange, isDraft}) {
  return (
    <Form.Item
          label="Loại công việc"
          name="taskTypeId"
          required
          rules={[
            {
              required: !isDraft,
              message: "Vui lòng chọn loại công việc",
            },
          ]}
        >
          <Select
            placeholder="Chọn loại công việc"
            options={
              taskTypeActiveOther && taskTypeActiveOther.data
                ? taskTypeActiveOther.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
            onChange={handleTaskTypeChange}
          />
        </Form.Item>
  )
}

export default TaskTypeActiveSelect