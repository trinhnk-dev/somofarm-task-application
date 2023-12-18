import { Form, Select } from 'antd'
import React from 'react'

function FieldAnimalUpdate({handleSelectFieldChange, fieldByZone, editingTask, isDraft}) {
  return (
    <Form.Item
          label="Chuồng"
          name="fieldId"
          required
          rules={[
            {
              required: !isDraft,
              message: "Vui lòng chọn chuồng",
            },
          ]}
          initialValue={editingTask ? editingTask.fieldId : 0}
        >
          <Select
            onChange={handleSelectFieldChange}
            placeholder="Chọn chuồng"
            options={
              fieldByZone && fieldByZone.data
                ? fieldByZone.data.map((item) => ({
                    label: item.nameCode,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default FieldAnimalUpdate
