import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ areaByFarm, zoneByFarm, fieldAnimal, fieldPlant }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  return (
    <>
      <Row gutter={10} className='admin-row-card'>
        <Col lg={5} sm={11} xs={11} className='dashboard-card'>
          <Card className='card-area'>
            <Statistic
              title="Số khu vực"
              value={areaByFarm ? areaByFarm?.data?.length : ''}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col lg={5} sm={11} xs={11} className='dashboard-card'>
          <Card className='card-zone'>
            <Statistic
              title="Số vùng"
              value={zoneByFarm ? zoneByFarm?.data?.length : ''}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col lg={5} sm={11} xs={11} className='dashboard-card'>
          <Card className='card-barn'>
            <Statistic
              title="Số chuồng"
              value={fieldAnimal ? fieldAnimal?.data?.length : ''}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col lg={5} sm={11} xs={11} className='dashboard-card'>
          <Card className='card-garden'>
            <Statistic
              title="Số vườn"
              value={fieldPlant ? fieldPlant?.data?.length : ''}
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
