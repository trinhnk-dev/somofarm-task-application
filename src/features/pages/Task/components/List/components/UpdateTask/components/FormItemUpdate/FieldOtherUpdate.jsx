import { Form, Select } from 'antd'
import React from 'react'

function FieldOtherUpdate({handleSelectFieldChange, fieldByZone, editingTask}) {
  return (
    <Form.Item
          label="Chuồng / Vườn"
          name="fieldId"
          // initialValue={editingTask ? editingTask.fieldId : null}
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

export default FieldOtherUpdate