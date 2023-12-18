import { Form, Select } from "antd";
import React from "react";

function MaterialSelect({
  materialsValue,
  handleMaterialChange,
  material,
}) {
  return (
    <Form.Item label="Dụng cụ" name="materialIds">
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

export default MaterialSelect;
