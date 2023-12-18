import { Form, Select } from "antd";
import React from "react";

function PlantSelect({ dataPlant, plantValue, handlePlantValue, isDraft }) {
  return (
    <Form.Item
      label="Mã cây trồng"
      name="plantId"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng nhập mã cây trồng",
        },
      ]}
    >
      <Select
        value={plantValue}
        onChange={handlePlantValue}
        placeholder="Chọn mã cây trồng"
        options={dataPlant?.map((item) => ({
          label: item.externalId,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
}

export default PlantSelect;
