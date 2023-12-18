import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAnimalByFarmId } from 'features/slice/animal/animalByFarmSlice'
import { useDispatch } from 'react-redux'
import { getMemberById } from 'features/slice/user/memberSlice'
import { authServices } from 'services/authServices'
import {
  createAnimal,
  deleteAnimal,
  updateAnimal,
} from 'features/slice/animal/animalSlice'
import { getAnimalType } from 'features/slice/animal/animalTypeSlice'
import { getAreaActiveByFarmId } from 'features/slice/area/areaByFarmSlice'
import TableDisplayAnimal from './components/DisplayAnimal/TableDisplayAnimal'
import AddAnimal from './components/AddAnimal/AddAnimal'
import { getAnimalTypeActive } from 'features/slice/animal/animalTypeActiveSlice'

const Animals = () => {
  const dispatch = useDispatch()
  const animalByFarm = useSelector((state) => state.animalByFarm.data)
  const loading = useSelector((state) => state.animalByFarm.loading)
  const areaByFarm = useSelector((state) => state.areaByFarm.data)
  const animalTypeActive = useSelector((state) => state.animalTypeActive.data)
  const member = useSelector((state) => state.member.data)
  const farmId = member?.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getAnimalByFarmId(farmId))
    dispatch(getAreaActiveByFarmId(farmId))
    dispatch(getAnimalType(farmId))
    dispatch(getAnimalTypeActive(farmId))
  }, [dispatch, farmId])

  const onFinishCreateAnimal = (values) => {
    dispatch(createAnimal(values)).then(() => {
      loadDataAnimal()
    })
  }

  const onFinishUpdateAnimal = (values) => {
    dispatch(updateAnimal(values)).then(() => {
      loadDataAnimal()
    })
  }

  const onFinishDeleteAnimal = (id) => {
    dispatch(deleteAnimal(id)).then(() => {
      loadDataAnimal()
    })
  }

  const loadDataAnimal = () => {
    dispatch(getAnimalByFarmId(farmId))
  }

  return (
    <>
      <AddAnimal
        areaByFarm={areaByFarm}
        onFinishCreateAnimal={onFinishCreateAnimal}
        handleSearch={handleSearch}
        animalTypeActive={animalTypeActive}
      />
      <TableDisplayAnimal
        loading={loading}
        areaByFarm={areaByFarm}
        animalByFarm={animalByFarm}
        animalTypeActive={animalTypeActive}
        onFinishDeleteAnimal={onFinishDeleteAnimal}
        onFinishUpdateAnimal={onFinishUpdateAnimal}
        searchTerm={searchTerm}
      />
    </>
  )
}

export default Animals
