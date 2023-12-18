import { Form, Select } from "antd";
import React from "react";

function MaterialUpdate({
  materialsValue,
  handleMaterialChange,
  material,
  editingTask,
}) {
  return (
    <Form.Item
      label="Dụng cụ"
      name="materialId"
      initialValue={editingTask ? editingTask.materialId : []}
    >
      <Select
        placeholder="Chọn dụng cụ"
        mode="multiple"
        value={materialsValue}
        onChange={handleMaterialChange}
        options={
          material && material.data
            ? material.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
      />
    </Form.Item>
  );
}

export default MaterialUpdate;
