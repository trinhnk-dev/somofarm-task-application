import { Form, Select } from "antd";
import React from "react";

const IsImportantUpdate = ({
  editingTask,
  importantValue,
  handleSelectImportant,
}) => {
  return (
    <Form.Item label="Cho phép tiếp tục từ chối" name="isImportant">
      <Select
        value={importantValue}
        onChange={handleSelectImportant}
        placeholder="Cho phép"
      >
        <Select.Option value={false}>Cho phép</Select.Option>
        <Select.Option value={true}>Không cho phép</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default IsImportantUpdate;
