import { Form, Input } from "antd";
import React from "react";

function NameTaskUpdate({ editingTask, nameValue, handleNameChange }) {
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
      initialValue={editingTask ? editingTask.name : ""}
    >
      <Input
        placeholder="Nhập tên công việc"
        value={nameValue}
        onChange={handleNameChange}
      />
    </Form.Item>
  );
}

export default NameTaskUpdate;
