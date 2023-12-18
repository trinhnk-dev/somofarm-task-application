import { Form, Select } from 'antd'
import React from 'react'

function FieldOtherSelect({handleSelectFieldChange, fieldByZone}) {
  return (
    <Form.Item
          label="Chuồng / Vườn"
          name="fieldId"
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

export default FieldOtherSelect