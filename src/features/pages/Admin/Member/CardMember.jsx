import { Card, Col, Progress, Row, Statistic } from "antd";
import CountUp from "react-countup";

const CardMember = ({ memberByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />;

  const filterManager = (memberByFarm) => {
    if (memberByFarm && memberByFarm.data) {
      const manager = memberByFarm.data.filter(
        (mem) => mem.roleName === "Manager"
      );
      return manager.length;
    }
    return 0;
  };

  const filterSupervisor = (memberByFarm) => {
    if (memberByFarm && memberByFarm.data) {
      const supervisor = memberByFarm.data.filter(
        (mem) => mem.roleName === "Supervisor"
      );
      return supervisor.length;
    }
    return 0;
  };

  const managerCount = filterManager(memberByFarm);
  const supervisorCount = filterSupervisor(memberByFarm);

  return (
    <>
      <Row gutter={10} style={{ justifyContent: "center" }}>
        <Col lg={6} sm={10} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card
            style={{
              boxShadow:
                "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
            }}
          >
            <Statistic
              title="Số lượng người quản lý"
              value={managerCount}
              precision={2}
              formatter={formatter}
            />
            <Progress showInfo={false} percent={100} strokeColor="#02c39a" />
          </Card>
        </Col>

        <Col lg={6} sm={10} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card
            style={{
              boxShadow:
                "1px 1px 3px #0000001a, 1px 2px 3px #0000000f,1px 2px 3px #0000001a, 1px 2px 3px #0000000f",
            }}
          >
            <Statistic
              title="Số lượng người giám sát"
              value={supervisorCount}
              precision={2}
              formatter={formatter}
            />
            <Progress showInfo={false} percent={100} strokeColor="#02c39a" />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CardMember;
