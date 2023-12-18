import { Form, Select } from 'antd'
import React from 'react'

function ZoneByAreaSelect({handleSelectZoneChange, zoneByArea}) {
  return (
    <Form.Item
          label="Vùng"
          name="zoneId"
        >
          <Select
            onChange={handleSelectZoneChange}
            placeholder="Chọn vùng"
            options={
              zoneByArea && zoneByArea.data
                ? zoneByArea.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default ZoneByAreaSelect