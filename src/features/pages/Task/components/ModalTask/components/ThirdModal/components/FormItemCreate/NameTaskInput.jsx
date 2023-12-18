import { Form, Input } from 'antd'
import React from 'react'

function NameTaskInput({name, handleNameChange}) {
  return (
    <Form.Item
          label="Tên công việc"
          name="name"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên công việc",
            },
          ]}
        >
          <Input value={name} onChange={handleNameChange} placeholder="Nhập tên công việc" />
        </Form.Item>
  )
}

export default NameTaskInput
