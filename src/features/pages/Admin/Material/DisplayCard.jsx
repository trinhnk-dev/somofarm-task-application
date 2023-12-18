import { Card, Col, Progress, Row, Statistic } from "antd";
import CountUp from "react-countup";

const DisplayCard = ({ activeMaterialCount, inActiveMaterialCount }) => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <>
      <Row gutter={10} style={{ justifyContent: "center" }}>
        {/* Active */}
        <Col lg={6} sm={10} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card
            style={{
              boxShadow:
                "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
            }}
          >
            <Statistic
              title="Số công cụ có thể sử dụng"
              value={activeMaterialCount}
              precision={2}
              formatter={formatter}
            />
            <Progress showInfo={false} percent={100} strokeColor="#f49cbb" />
          </Card>
        </Col>

        {/* Inactive */}
        <Col lg={6} sm={10} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card
            style={{
              boxShadow:
                "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
            }}
          >
            <Statistic
              title="Số công cụ chưa được sử dụng"
              value={inActiveMaterialCount}
              precision={2}
              formatter={formatter}
            />
            <Progress showInfo={false} percent={100} strokeColor="#f49cbb" />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default DisplayCard;
