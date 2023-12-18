import React, { useState } from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function StatusTabs({ onTabChange }) {
  
  return (
    <Tabs
      defaultActiveKey="0"
      onChange={onTabChange}
      className="custom-tabs"
    >
      <TabPane tab="Bản nháp" key="0"></TabPane>
      <TabPane tab="Chuẩn bị" key="1"></TabPane>
      <TabPane tab="Đã giao" key="2"></TabPane>
      <TabPane tab="Đang thực hiện" key="3"></TabPane>
      <TabPane tab="Hoàn thành" key="4"></TabPane>
      <TabPane tab="Tạm hoãn" key="5"></TabPane>
      <TabPane tab="Từ chối" key="6"></TabPane>
      <TabPane tab="Hủy bỏ" key="7"></TabPane>
      <TabPane tab="Đã đóng" key="8"></TabPane>
    </Tabs>
  );
}

export default StatusTabs;
