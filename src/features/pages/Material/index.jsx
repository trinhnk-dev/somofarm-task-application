import { useDispatch } from 'react-redux'
import AddMaterial from './components/AddMaterial/AddMaterial'
import DisplayMaterial from './components/DisplayMaterial/DisplayMaterial'
import { useSelector } from 'react-redux'
import {
  createMaterial,
  deleteMaterial,
  getMaterialByFarmId,
  updateMaterial,
} from 'features/slice/material/materialSlice'
import { useEffect, useState } from 'react'
import { authServices } from 'services/authServices'
import { getMemberById } from 'features/slice/user/memberSlice'
import {
  createMaterialByExcel,
  getMaterialExcel,
} from 'features/slice/material/materialExcelSlice'

const Material = () => {
  const dispatch = useDispatch()
  const material = useSelector((state) => state.material.data)

  const loading = useSelector((state) => state.material.loading)
  const member = useSelector((state) => state.member.data)
  const farmId = member?.farmId

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }
  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getMaterialByFarmId(farmId))
  }, [dispatch, farmId])

  const onFinishCreate = (values) => {
    dispatch(createMaterial(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateMaterial(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteMaterial(id)).then(() => {
      loadData()
    })
  }

  // Excel
  const getMaterialByExcel = () => {
    dispatch(getMaterialExcel(farmId))
  }

  const onFinishCreateMaterialExcel = (value) => {
    const finalValues = {
      ...value,
      farmId: farmId,
    }

    dispatch(createMaterialByExcel(finalValues)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getMaterialByFarmId(farmId))
  }

  return (
    <>
      <AddMaterial
        onFinishCreate={onFinishCreate}
        farmId={farmId}
        handleSearch={handleSearch}
        getMaterialByExcel={getMaterialByExcel}
        onFinishCreateMaterialExcel={onFinishCreateMaterialExcel}
      />
      <DisplayMaterial
        loading={loading}
        material={material}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
        farmId={farmId}
        loadData={loadData}
        searchTerm={searchTerm}
      />
    </>
  )
}
export default Material
