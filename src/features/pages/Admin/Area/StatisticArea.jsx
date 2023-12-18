import { useDispatch, useSelector } from 'react-redux'
import TableArea from './TableArea'
import { useEffect } from 'react'
import { getAreaByFarmId } from 'features/slice/area/areaByFarmSlice'
import DisplayCard from './DisplayCard'
import { Divider } from 'antd'
import { adminDeleteArea } from 'features/slice/area/areaSlice'

const StatisticArea = () => {
  const dispatch = useDispatch()

  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const loading = useSelector((state) => state.areaByFarm.loading)
  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getAreaByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteArea(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getAreaByFarmId(farmId))
  }

  return (
    <>
      <div className="animal-group-content content">
        <h3>Khu vực</h3>
        <DisplayCard areaByFarm={areaByFarm} />
        <Divider dashed />
        <TableArea
          areaByFarm={areaByFarm}
          onFinishDelete={onFinishDelete}
          loading={loading}
        />
      </div>
    </>
  )
}
export default StatisticArea
