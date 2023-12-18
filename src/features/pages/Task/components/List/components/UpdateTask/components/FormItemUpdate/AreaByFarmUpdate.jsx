import { Form, Select } from "antd";
import React from "react";

function AreaByFarmUpdate({ handleSelectAreaChange, areaByFarm, editingTask }) {
  return (
    <Form.Item
      label="Khu vực"
      name="areaId"
      // initialValue={editingTask ? editingTask.areaId : undefined}
    >
      <Select
        onChange={handleSelectAreaChange}
        placeholder="Chọn khu vực"
        options={
          areaByFarm && areaByFarm.data
            ? areaByFarm.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
      />
    </Form.Item>
  );
}

export default AreaByFarmUpdate;
