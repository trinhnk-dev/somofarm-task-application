import { Form, Select } from 'antd'
import React from 'react'

function SupervisorSelect({supervisor, supervisorValue, handleSupervisorValue, isDraft}) {
  return (
    <Form.Item
          label="Người giám sát"
          name="supervisorId"
          required
          rules={[
            {
              required: !isDraft,
              message: "Vui lòng chọn người giám sát",
            },
          ]}
        >
          <Select
            placeholder="Chọn người giám sát"
            value={supervisorValue}
            onChange={handleSupervisorValue}
            options={
              supervisor && supervisor.data
                ? supervisor.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default SupervisorSelect
