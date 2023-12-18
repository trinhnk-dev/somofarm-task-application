import { Form, Select } from 'antd'
import React from 'react'

function ZoneByAreaUpdate({handleSelectZoneChange, zoneByArea, editingTask}) {
  return (
    <Form.Item
          label="Vùng"
          name="zoneId"
          // initialValue={editingTask ? editingTask.zoneId : null}
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

export default ZoneByAreaUpdate