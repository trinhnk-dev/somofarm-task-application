import { Layout } from "antd";
import SideMenu from "./SideMenu";
import { Header } from "antd/es/layout/layout";
import HeaderComp from "../Header";
import { useTabletMediaQuery } from "common/hooks/responsive";
import SidebarOnHeader from "./../Header/components/HeaderOption/SidebarOnHeader/index";
import { Link } from "react-router-dom";
import logoSomo from "../../../assets/logo_Somo.png";

const { Content } = Layout;

const LayoutWithRoute = ({ children }) => {
  const isTablet = useTabletMediaQuery();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideMenu />
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: "#fff",
          }}
        >
          {isTablet ? (
            <div className="header-logo">
              <Link to="/" className="logoSomo">
                <img src={logoSomo} alt="logo" />
              </Link>
            </div>
          ) : null}
          <div className="header-right">
            {isTablet ? <SidebarOnHeader /> : null}
            <HeaderComp />
          </div>
        </Header>
        <Content style={{ margin: "20px 16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWithRoute;
