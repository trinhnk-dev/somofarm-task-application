import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getPlantByFarmId } from 'features/slice/plant/plantByFarmSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'
import { authServices } from 'services/authServices'
import { useEffect, useState } from 'react'
import {
  createPlant,
  deletePlant,
  updatePlant,
} from 'features/slice/plant/plantSlice'
import TableDisplayCrop from './components/DisplayCrop/TableDisplayCrop'
import AddPlant from './components/AddPlant/AddPlant'
import { getPlantTypeActive } from 'features/slice/plant/plantTypeActiveSlice'

const MyCrops = () => {
  const dispatch = useDispatch()
  const plantByFarm = useSelector((state) => state.plantByFarm.data)
  const loading = useSelector((state) => state.plantByFarm.loading)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const plantTypeActive = useSelector((state) => state.plantTypeActive.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member?.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getPlantByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getPlantTypeActive(farmId))
  }, [dispatch, farmId])

  const onFinishCreatePlant = (values) => {
    dispatch(createPlant(values)).then(() => {
      loadDataPlant()
    })
  }

  const onFinishUpdatePlant = (values) => {
    dispatch(updatePlant(values)).then(() => {
      loadDataPlant()
    })
  }

  const onFinishDeletePlant = (id) => {
    dispatch(deletePlant(id)).then(() => {
      loadDataPlant()
    })
  }

  const loadDataPlant = () => {
    dispatch(getPlantByFarmId(farmId))
  }

  return (
    <>
      <AddPlant
        areaByFarm={areaByFarm}
        onFinishCreatePlant={onFinishCreatePlant}
        handleSearch={handleSearch}
        plantTypeActive={plantTypeActive}
      />
      <TableDisplayCrop
        loading={loading}
        areaByFarm={areaByFarm}
        plantByFarm={plantByFarm}
        plantTypeActive={plantTypeActive}
        onFinishUpdatePlant={onFinishUpdatePlant}
        onFinishDeletePlant={onFinishDeletePlant}
        searchTerm={searchTerm}
      />
    </>
  )
}
export default MyCrops
