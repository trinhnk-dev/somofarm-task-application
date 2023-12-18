import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import TableCropGroup from './TableCropGroup'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getFieldPlantByFarmId } from 'features/slice/field/fieldPlantSlice'
import { useEffect } from 'react'
import { adminDeleteField } from 'features/slice/field/fieldSlice'
import { getPlantByFarmId } from 'features/slice/plant/plantByFarmSlice'

const StatisticCropGroup = () => {
  const dispatch = useDispatch()
  const fieldPlant = useSelector((state) => state.fieldPlant.data)
  const loading = useSelector((state) => state.fieldPlant.loading)

  const plantByFarm = useSelector((state) => state.plantByFarm.data)

  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getFieldPlantByFarmId(farmId))
    dispatch(getPlantByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteField(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFieldPlantByFarmId(farmId))
  }
  return (
    <>
      <div className="animal-group-content content">
        <h3>Thực vật</h3>
        <DisplayCard fieldPlant={fieldPlant} plantByFarm={plantByFarm} />
        <Divider dashed />
        <TableCropGroup
          fieldPlant={fieldPlant}
          onFinishDelete={onFinishDelete}
          loading={loading}
        />
      </div>
    </>
  )
}

export default StatisticCropGroup
