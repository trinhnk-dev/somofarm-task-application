import { Form, Input } from 'antd'
import React from 'react'

function DescriptionInput({description, handleDescriptionChange}) {
  const { TextArea } = Input;
  return (
    <Form.Item label="Mô tả" name="description">
          <TextArea
            value={description}
            onChange={handleDescriptionChange}
            rows={5}
            placeholder="Thêm mô tả chi tiết cho công việc"
          />
        </Form.Item>
  )
}

export default DescriptionInput
