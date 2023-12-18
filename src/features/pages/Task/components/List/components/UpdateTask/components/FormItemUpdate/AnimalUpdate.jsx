import { Form, Select } from "antd";
import React from "react";

function AnimalUpdate({
  selectedLivestockId,
  handleLivestockChange,
  dataAnimal,
  editingTask,
  isDraft,
}) {
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
      initialValue={
        editingTask
          ? {
              label: editingTask.externalId,
              value: selectedLivestockId ? selectedLivestockId : editingTask.livestockId,
            }
          : ""
      }
    >
      <Select
        value={selectedLivestockId}
        onChange={handleLivestockChange}
        placeholder="Chọn mã vật nuôi"
        options={dataAnimal?.map((item) => ({
          label: item.externalId,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
}

export default AnimalUpdate;
