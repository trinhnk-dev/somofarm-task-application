import { Form, Select } from "antd";
import React from "react";

function ZonePlantUpdate({ handleSelectZoneChange, zonePlant, editingTask, isDraft }) {
  return (
    <Form.Item
      label="Vùng"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng chọn vùng",
        },
      ]}
      name="zoneId"
      initialValue={editingTask ? editingTask.zoneId : ""}
    >
      <Select
        onChange={handleSelectZoneChange}
        placeholder="Chọn vùng"
        options={
          zonePlant && zonePlant.data
            ? zonePlant.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
      />
    </Form.Item>
  );
}

export default ZonePlantUpdate;
