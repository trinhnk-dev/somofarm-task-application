import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ fieldPlant, plantByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />
  const filterActiveCropGroups = (fieldPlant) => {
    if (fieldPlant && fieldPlant.data) {
      const activeCropGroups = fieldPlant.data.filter(
        (field) => field.isDelete === false
      )
      return activeCropGroups.length
    }
    return 0
  }
  const activeCropGroup = filterActiveCropGroups(fieldPlant)
  const inActiveCropGroup = fieldPlant?.data?.length - activeCropGroup
  const plantByFarmCount = plantByFarm?.data?.length

  return (
    <>
      <Row gutter={10} style={{ justifyContent: "space-around" }}>
        <Col sm={7} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card className='card-plant'>
            <Statistic
              title="Số vườn đang mở"
              value={activeCropGroup}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col sm={7} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card className='card-plant'>
            <Statistic
              title="Số vườn đang đóng"
              value={inActiveCropGroup}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col sm={7} xs={15} className="dashboard-card" >
          <Card className='card-plant'>
            <Statistic
              title="Cây trồng trong các vườn"
              value={plantByFarmCount}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  )
}
export default DisplayCard
