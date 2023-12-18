import { Form, Select } from 'antd'
import React from 'react'

function FieldPlantSelect({handleSelectFieldChange, fieldByZone, selectedFieldId, isDraft}) {
  return (
    <Form.Item
          label="Vườn"
          name="fieldId"
          required
          rules={[
            {
              required: !isDraft,
              message: "Vui lòng chọn vườn",
            },
          ]}
        >
          <Select
          value={selectedFieldId}
            onChange={handleSelectFieldChange}
            placeholder="Chọn vườn"
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

export default FieldPlantSelect
