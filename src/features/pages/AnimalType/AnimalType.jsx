import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import AddAnimalType from './AddAnimalType'
import DisplayAnimalType from './DisplayAnimalType'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  createHabitantType,
  deleteHabitantType,
  updateHabitantType,
} from 'features/slice/habitant/habitantTypeSlice'
import { authServices } from 'services/authServices'
import { getMemberById } from 'features/slice/user/memberSlice'

const AnimalType = () => {
  const dispatch = useDispatch()
  const animalType = useSelector((state) => state.animalType.data)
  const loading = useSelector((state) => state.animalType.loading)
  const member = useSelector((state) => state.member.data)
  const farmId = member?.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAnimalType(farmId))
  }, [dispatch, farmId])

  const onFinishCreateAnimalType = (values) => {
    dispatch(createHabitantType(values)).then(() => {
      loadDataAnimalType()
    })
  }

  const onFinishUpdateAnimalType = (values) => {
    dispatch(updateHabitantType(values)).then(() => {
      loadDataAnimalType()
    })
  }

  const onFinishDeleteAnimalType = (id) => {
    dispatch(deleteHabitantType(id)).then(() => {
      loadDataAnimalType()
    })
  }

  const loadDataAnimalType = () => {
    dispatch(getAnimalType(farmId))
  }

  return (
    <>
      <AddAnimalType
        farmId={farmId}
        onFinishCreateAnimalType={onFinishCreateAnimalType}
        handleSearch={handleSearch}
      />
      <DisplayAnimalType
        loading={loading}
        animalType={animalType}
        onFinishDeleteAnimalType={onFinishDeleteAnimalType}
        onFinishUpdateAnimalType={onFinishUpdateAnimalType}
        loadDataAnimalType={loadDataAnimalType}
        searchTerm={searchTerm}
      />
    </>
  )
}
export default AnimalType
