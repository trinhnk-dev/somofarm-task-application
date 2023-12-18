import { Card, Col, Row, Statistic } from 'antd'
import CountUp from 'react-countup'

const DisplayCard = ({ fieldAnimal, animalByFarm }) => {
  const formatter = (value) => <CountUp end={value} separator="," />

  const filterActiveAnimalGroups = (fieldAnimal) => {
    if (fieldAnimal && fieldAnimal.data) {
      const activeAnimalGroups = fieldAnimal.data.filter(
        (field) => field.isDelete === false
      )
      return activeAnimalGroups.length
    }
    return 0
  }
  const activeAnimalGroup = filterActiveAnimalGroups(fieldAnimal)
  const inActiveAnimalGroup = fieldAnimal?.data?.length - activeAnimalGroup
  const animalByFarmCount = animalByFarm?.data?.length
  return (
    <>
      <Row gutter={10} style={{ justifyContent: "space-around" }}>
        <Col sm={7} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card className='card-animal' c>
            <Statistic
              title="Số chuồng đang mở"
              value={activeAnimalGroup}
              precision={2}
              formatter={formatter}
              
            />
          </Card>
        </Col>

        <Col sm={7} xs={15} className="dashboard-card" style={{marginBottom: "20px"}}>
          <Card className='card-animal'>
            <Statistic
              title="Số chuồng đang đóng"
              value={inActiveAnimalGroup}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>

        <Col sm={7} xs={15} className="dashboard-card" >
          <Card className='card-animal'>
            <Statistic
              title="Vật nuôi trong các chuồng"
              value={animalByFarmCount}
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
