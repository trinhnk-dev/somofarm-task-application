import { Form, Select } from "antd";
import React from "react";

function AnimalSelect({ dataAnimal, livestockValue, handleLivestockValue, isDraft }) {
  return (
    <Form.Item
      label="Mã vật nuôi"
      name="liveStockId"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng chọn mã vật nuôi",
        },
      ]}
    >
      <Select
        value={livestockValue}
        onChange={handleLivestockValue}
        placeholder="Chọn mã vật nuôi"
        options={dataAnimal?.map((item) => ({
          label: item.externalId,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
}

export default AnimalSelect;
