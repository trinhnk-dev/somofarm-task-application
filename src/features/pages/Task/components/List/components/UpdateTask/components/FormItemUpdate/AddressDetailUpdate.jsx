import { Form, Input } from "antd";
import React from "react";

function AddressDetailUpdate({ addressDetail, setAddressDetail, editingTask, isDraft }) {
  const { TextArea } = Input;
  return (
    <Form.Item
      label="Vị trí cụ thể"
      name="addressDetail"
      required
      rules={[
        {
          required: !isDraft,
          message: "Vui lòng nhập vị trí cụ thể",
        },
      ]}
      initialValue={editingTask ? editingTask.addressDetail : ""}
    >
      <TextArea
        placeholder="Nhập vị trí cụ thể"
        value={addressDetail}
        onChange={(e) => setAddressDetail(e.target.value)}
        rows={3}
      />
    </Form.Item>
  );
}

export default AddressDetailUpdate;
