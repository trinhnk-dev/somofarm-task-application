import { Form, Select } from "antd";
import React from "react";

function RemindUpdate({ remindValue, handleSelectRemind, editingTask }) {
  const remindData =
    editingTask.remind === 0 ? "Không" : `Sau ${editingTask.remind} phút`;
  return (
    <Form.Item label="Nhắc lại" name="remind" initialValue={remindData}>
      <Select
        value={remindValue}
        onChange={handleSelectRemind}
        placeholder="Không"
      >
        <Select.Option value="0">Không</Select.Option>
        <Select.Option value="5">Sau 5 phút</Select.Option>
        <Select.Option value="10">Sau 10 phút</Select.Option>
        <Select.Option value="15">Sau 15 phút</Select.Option>
        <Select.Option value="20">Sau 20 phút</Select.Option>
      </Select>
    </Form.Item>
  );
}

export default RemindUpdate;
