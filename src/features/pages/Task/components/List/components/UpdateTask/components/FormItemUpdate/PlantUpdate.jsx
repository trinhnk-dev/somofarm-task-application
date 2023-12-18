import { Form, Select } from "antd";
import React from "react";

function PlantUpdate({
  selectedPlantId,
  handlePlantChange,
  dataPlant,
  editingTask,
  isDraft,
}) {
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
      initialValue={
        editingTask
          ? {
              label: editingTask.externalId,
              value: selectedPlantId ? selectedPlantId : editingTask.plantId,
            }
          : ""
      }
    >
      <Select
        value={selectedPlantId}
        onChange={handlePlantChange}
        placeholder="Chọn mã cây trồng"
        options={dataPlant?.map((item) => ({
          label: item.externalId,
          value: item.id,
        }))}
      />
    </Form.Item>
  );
}

export default PlantUpdate;
