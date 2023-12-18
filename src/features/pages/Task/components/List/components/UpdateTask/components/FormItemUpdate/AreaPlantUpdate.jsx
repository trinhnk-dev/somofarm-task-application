import { Form, Select } from "antd";
import React from "react";

function AreaPlantUpdate({
  handleSelectAreaChange,
  areaPlantByZone,
  editingTask,
  isDraft
}) {
  return (
    <Form.Item
      label="Khu vực"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng chọn khu vực",
        },
      ]}
      name="areaId"
      initialValue={editingTask ? editingTask.areaId : ""}
    >
      <Select
        onChange={handleSelectAreaChange}
        placeholder="Chọn khu vực"
        options={
          areaPlantByZone && areaPlantByZone.data
            ? areaPlantByZone.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
      />
    </Form.Item>
  );
}

export default AreaPlantUpdate;
