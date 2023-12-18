import { Form, Select } from 'antd'
import React from 'react'

function EmployeeSelect({employeesValue, handleEmployeeChange, dataEmployee}) {
  return (
    <Form.Item
          label="Người thực hiện"
          name="employeeIds"
          required
          rules={[
            {
              required: true,
              message: "Vui lòng chọn người thực hiện",
            },
          ]}
        >
          <Select
            mode="multiple"
            value={employeesValue}
            onChange={handleEmployeeChange}
            placeholder="Chọn người thực hiện"
            options={
              dataEmployee && dataEmployee.data
                ? dataEmployee.data.map((item) => ({
                    label: item.name,
                    value: item.id,
                  }))
                : null
            }
          />
        </Form.Item>
  )
}

export default EmployeeSelect
