import { useDispatch, useSelector } from 'react-redux'
import AddAndSearchAnimalGroup from './components/AddAndSearchAnimalGroup/AddAndSearchAnimalGroup'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'
import DisplayAnimalGroup from './components/DisplayAnimalGroup/DisplayAnimalGroup'
import { useEffect, useState } from 'react'
import { getMemberById } from 'features/slice/user/memberSlice'
import { authServices } from 'services/authServices'
import {
  createField,
  deleteField,
  updateField,
} from 'features/slice/field/fieldSlice'
import { getFieldAnimalByFarmId } from 'features/slice/field/fieldAnimalSlice'

const AnimalGroup = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const farmId = member?.farmId
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const fieldAnimal = useSelector((state) => state.fieldAnimal.data)
  const loading = useSelector((state) => state.fieldAnimal.loading)

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getFieldAnimalByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
  }, [dispatch, farmId])

  const onFinishCreate = (values) => {
    dispatch(createField(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateField(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteField(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFieldAnimalByFarmId(farmId))
  }

  return (
    <>
      <AddAndSearchAnimalGroup
        areaByFarm={areaByFarm}
        onFinishCreate={onFinishCreate}
        handleSearch={handleSearch}
      />
      <DisplayAnimalGroup
        loading={loading}
        areaByFarm={areaByFarm}
        fieldAnimal={fieldAnimal}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
        searchTerm={searchTerm}
      />
    </>
  )
}
export default AnimalGroup
