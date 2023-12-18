import { Form, Input } from "antd";
import React from "react";

function AddressDetailInput({ addressDetail, handleAddressDetail, isDraft }) {

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
    >
      <Input
        placeholder="Nhập vị trí cụ thể"
        value={addressDetail}
        onChange={handleAddressDetail}
      />
    </Form.Item>
  );
}

export default AddressDetailInput;
