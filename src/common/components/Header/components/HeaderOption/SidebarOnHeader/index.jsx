import { Button, Menu, Popover } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarOutlined,
  AimOutlined,
  BorderOutlined,
  TableOutlined,
  MenuOutlined,
  AppstoreOutlined,
  FormatPainterOutlined,
  BarChartOutlined,
  AuditOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { GiCow, GiPlantRoots, GiPig, GiPlantWatering } from "react-icons/gi";
import { GrUserWorker, GrObjectGroup } from "react-icons/gr";

const rootSubmenuKeys = ["tasks", "location", "animal", "plant"];

const SidebarOnHeader = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const location = useLocation();

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <div className="header-tablet">
      <div className="menu-popover">
        <Popover
          placement="bottom"
          content={
            <Menu
              theme="light"
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
            >
              <Menu.Item key="/home">
                <BarChartOutlined />
                <span>Trang chủ</span>
                <Link to="/home"></Link>
              </Menu.Item>

              {/* <Menu.Item key="/schedule">
                <CalendarOutlined />
                <span>Lịch trình</span>
                <Link to="/schedule"></Link>
              </Menu.Item> */}

              <SubMenu
                key="tasks"
                icon={<FileTextOutlined />}
                title="Công việc"
              >
                <Menu.Item key="/task">
                  <AimOutlined />
                  <span>Công việc</span>
                  <Link to="/task"></Link>
                </Menu.Item>
                <Menu.Item key="/task-type">
                  <AuditOutlined />
                  <span>Loại công việc</span>
                  <Link to="/task-type"></Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="/employee">
                <GrUserWorker />
                <span style={{ marginLeft: "10px" }}>Nhân viên</span>
                <Link to="/employee"></Link>
              </Menu.Item>

              <SubMenu key="location" icon={<BorderOutlined />} title="Vị trí">
                <Menu.Item key="area">
                  <BorderOutlined />
                  <span>Khu vực</span>
                  <Link to="/area"></Link>
                </Menu.Item>

                <Menu.Item key="zone">
                  <TableOutlined />
                  <span>Vùng</span>
                  <Link to="/zone"></Link>
                </Menu.Item>
              </SubMenu>

              {/* Động vật */}
              <SubMenu key="animal" icon={<GiCow />} title="Động vật">
                <Menu.Item key="/animals">
                  <GiCow />
                  <span style={{ marginLeft: "10px" }}>Vật nuôi</span>
                  <Link to="/animals"></Link>
                </Menu.Item>

                <Menu.Item key="/animal-type">
                  <GiPig />
                  <span style={{ marginLeft: "10px" }}>Loại vật nuôi</span>
                  <Link to="/animal-type"></Link>
                </Menu.Item>

                <Menu.Item key="/animal-group">
                  <GrObjectGroup />
                  <span style={{ marginLeft: "10px" }}>Chuồng</span>
                  <Link to="/animal-group"></Link>
                </Menu.Item>
              </SubMenu>

              {/* Thực vật */}
              <SubMenu key="plant" icon={<GiPlantRoots />} title="Thực vật">
                <Menu.Item key="/plants">
                  <GiPlantRoots />
                  <span style={{ marginLeft: "10px" }}>Cây trồng</span>
                  <Link to="/plants"></Link>
                </Menu.Item>

                <Menu.Item key="/plant-type">
                  <GiPlantWatering />
                  <span style={{ marginLeft: "10px" }}>Loại cây trồng</span>
                  <Link to="/plant-type"></Link>
                </Menu.Item>

                <Menu.Item key="/crop-group">
                  <AppstoreOutlined />
                  <span style={{ marginLeft: "10px" }}>Vườn</span>
                  <Link to="/crop-group"></Link>
                </Menu.Item>
              </SubMenu>

              <Menu.Item key="/material">
                <FormatPainterOutlined />
                <span>Công cụ</span>
                <Link to="/material"></Link>
              </Menu.Item>
            </Menu>
          }
          trigger="click"
        >
          <Button>
            <MenuOutlined />
          </Button>
        </Popover>
      </div>
    </div>
  );
};

export default SidebarOnHeader;
