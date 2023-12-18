import { Divider } from 'antd'
import DisplayCard from './DisplayCard'
import { TableAnimalGroup } from './TableAnimalGroup'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getFieldAnimalByFarmId } from 'features/slice/field/fieldAnimalSlice'
import { adminDeleteField } from 'features/slice/field/fieldSlice'
import { getAnimalByFarmId } from 'features/slice/animal/animalByFarmSlice'

const StatisticAnimalGroup = () => {
  const dispatch = useDispatch()
  const fieldAnimal = useSelector((state) => state.fieldAnimal.data)
  const loading = useSelector((state) => state.fieldAnimal.loading)

  const animalByFarm = useSelector((state) => state.animalByFarm.data)

  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getFieldAnimalByFarmId(farmId))
    dispatch(getAnimalByFarmId(farmId))
  }, [dispatch])

  const onFinishDelete = (id) => {
    dispatch(adminDeleteField(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFieldAnimalByFarmId(farmId))
  }

  return (
    <>
      <div className="animal-group-content content">
        <h3>Động vật</h3>
        <DisplayCard fieldAnimal={fieldAnimal} animalByFarm={animalByFarm} />
        <Divider dashed />
        <TableAnimalGroup
          loading={loading}
          fieldAnimal={fieldAnimal}
          onFinishDelete={onFinishDelete}
        />
      </div>
    </>
  )
}
export default StatisticAnimalGroup
