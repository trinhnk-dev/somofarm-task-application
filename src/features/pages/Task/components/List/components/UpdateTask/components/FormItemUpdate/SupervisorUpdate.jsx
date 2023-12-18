import { Form, Select } from "antd";
import React from "react";

function SupervisorUpdate({
  supervisor,
  editingTask,
  isDraft,
  supervisorValue,
  handleSupervisorChange,
}) {
  const supervisorData = editingTask.suppervisorId === 0 ? "Chọn người giám sát" : editingTask.suppervisorId
  return (
    <Form.Item
      label="Người giám sát"
      name="supervisorId"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng chọn người giám sát",
        },
      ]}
      initialValue={supervisorData}
    >
      <Select
        value={supervisorValue}
        onChange={handleSupervisorChange}
        placeholder="Chọn người giám sát"
        options={
          supervisor && supervisor.data
            ? supervisor.data.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            : null
        }
      />
    </Form.Item>
  );
}

export default SupervisorUpdate;
