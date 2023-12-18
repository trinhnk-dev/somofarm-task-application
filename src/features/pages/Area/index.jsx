import { useSelector } from 'react-redux'
import AddArea from './components/AddArea/AddArea'
import DisplayArea from './components/DisplayArea/DisplayArea'
import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getMemberById } from 'features/slice/user/memberSlice'
import { getAreaByFarmId } from 'features/slice/area/areaByFarmSlice'
import { authServices } from 'services/authServices'
import {
  createArea,
  deleteArea,
  updateArea,
} from 'features/slice/area/areaSlice'

const Area = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const loading = useSelector((state) => state.areaByFarm.loading)
  const farmId = member?.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAreaByFarmId(farmId))
  }, [dispatch, farmId])

  const onFinishCreate = (values) => {
    const finalValues = {
      farmId: farmId,
      ...values,
    }
    dispatch(createArea(finalValues)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    const finalValues = {
      farmId: farmId,
      ...values,
    }
    dispatch(updateArea(finalValues)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteArea(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getAreaByFarmId(farmId))
  }

  return (
    <>
      <AddArea onFinishCreate={onFinishCreate} handleSearch={handleSearch} />
      <DisplayArea
        loading={loading}
        areaByFarm={areaByFarm}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
        searchTerm={searchTerm}
      />
    </>
  )
}
export default Area
