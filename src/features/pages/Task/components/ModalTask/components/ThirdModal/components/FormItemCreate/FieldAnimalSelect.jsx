import { Form, Select } from 'antd'
import React from 'react'

function FieldAnimalSelect({handleSelectFieldChange, fieldByZone, selectedFieldId, isDraft}) {
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
        >
          <Select
            onChange={handleSelectFieldChange}
            value={selectedFieldId}
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

export default FieldAnimalSelect
