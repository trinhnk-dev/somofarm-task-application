import { Card, Col, Progress, Row, Statistic } from "antd";
import CountUp from "react-countup";

const DisplayCard = ({ areaByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const filterActiveAreas = (areaByFarm) => {
    if (areaByFarm && areaByFarm.data) {
      const activeAreas = areaByFarm.data.filter(
        (area) => area.status === "Hiện"
      );
      return activeAreas.length;
    }
    return 0;
  };

  const activeAreaCount = filterActiveAreas(areaByFarm);
  const inActiveAreaCount = areaByFarm?.data?.length - activeAreaCount;

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
              title="Số khu vực đang mở"
              value={activeAreaCount}
              precision={2}
              formatter={formatter}
            />
            <Progress showInfo={false} percent={100} strokeColor="#1a659e" />
          </Card>
        </Col>

        {/* Inactive */}
        <Col lg={6} sm={10} xs={15} className="dashboard-card">
          <Card
            style={{
              boxShadow:
                "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
            }}
          >
            <Statistic
              title="Số khu vực đang đóng"
              value={inActiveAreaCount}
              precision={2}
              formatter={formatter}
            />
            <Progress showInfo={false} percent={100} strokeColor="#1a659e" />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default DisplayCard;
