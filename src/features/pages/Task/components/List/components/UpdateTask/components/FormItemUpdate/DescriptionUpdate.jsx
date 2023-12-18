import { Form, Input } from "antd";
import React from "react";

function DescriptionUpdate({
  description,
  handleDescriptionChange,
  editingTask,
}) {
  const { TextArea } = Input;
  return (
    <Form.Item
      label="Mô tả"
      name="description"
      initialValue={editingTask ? editingTask.description : ""}
    >
      <TextArea
        value={description}
        onChange={handleDescriptionChange}
        rows={5}
        placeholder="Thêm mô tả chi tiết cho công việc"
      />
    </Form.Item>
  );
}

export default DescriptionUpdate;
