import { Form, Select } from 'antd'
import React from 'react'

function ZoneAnimalSelect({handleSelectZoneChange, zoneAnimal, isDraft}) {
  return (
    <Form.Item
          label="Vùng"
          required
          rules={[
            {
              required: !isDraft,
              message: "Vui lòng chọn vùng",
            },
          ]}
          name="zoneId"
        >
          <Select
            onChange={handleSelectZoneChange}
            placeholder="Chọn vùng"
            options={
              zoneAnimal && zoneAnimal.data
                ? zoneAnimal.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default ZoneAnimalSelect
