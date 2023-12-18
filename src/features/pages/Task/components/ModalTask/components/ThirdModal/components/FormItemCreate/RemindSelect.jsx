import { Form, Select } from 'antd'
import React from 'react'

function RemindSelect({remindValue, handleSelectRemind}) {
  return (
    <Form.Item label="Nhắc nhở trước khi bắt đầu" name="remind">
          <Select
            value={remindValue.toString()}
            onChange={handleSelectRemind}
            placeholder="Không"
          >
            <Select.Option value="0">Không</Select.Option>
            <Select.Option value="5">5 phút</Select.Option>
            <Select.Option value="10">10 phút</Select.Option>
            <Select.Option value="15">15 phút</Select.Option>
            <Select.Option value="20">20 phút</Select.Option>
          </Select>
        </Form.Item>
  )
}

export default RemindSelect
