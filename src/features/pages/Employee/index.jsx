import { getEmployeeByFarmId } from 'features/slice/employee/employeeByFarmSlice'
import { getMemberById } from 'features/slice/user/memberSlice'
import { useDispatch } from 'react-redux'
import DisplayEmployee from './components/DisplayEmployee/DisplayEmployee'
import AddEmployee from './components/AddEmployee/AddEmployee'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { authServices } from 'services/authServices'
import { getTaskTypeActive } from 'features/slice/task/taskTypeActiveSlice'
import {
  createEmployee,
  deleteEmployee,
  updateEmployee,
} from 'features/slice/employee/employeeSlice'
import {
  createEmployeeByExcel,
  getEmployeeExcel,
} from 'features/slice/employee/employeeExcelSlice'
import {
  getEmployeeEffortByEmployeeId,
  getEmployeeEffortExcel,
} from 'features/slice/employee/employeeEffortSlice'

const Employee = () => {
  const dispatch = useDispatch()
  const member = useSelector((state) => state.member.data)
  const employeeByFarm = useSelector((state) => state.employeeByFarm.data)
  const loading = useSelector((state) => state.employeeByFarm.loading)

  const taskTypeActive = useSelector((state) => state.taskTypeActive.data)

  const farmId = member?.farmId
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  useEffect(() => {
    dispatch(getMemberById(authServices.getUserId()))
    dispatch(getEmployeeByFarmId(farmId))
    dispatch(getTaskTypeActive())
  }, [dispatch, farmId])

  const onFinishCreate = (values) => {
    dispatch(createEmployee(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateEmployee(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      loadData()
    })
  }

  // Excel
  const getEmployeeByExcel = () => {
    dispatch(getEmployeeExcel(farmId))
  }

  const getEmployeeEffort = (value) => {
    dispatch(getEmployeeEffortExcel(value))
  }

  const getAnyEmployeeEffort = (value) => {
    dispatch(getEmployeeEffortByEmployeeId(value))
  }

  const onFinishCreateEmployeeExcel = (value) => {
    dispatch(createEmployeeByExcel(value)).then(() => {
      loadData()
    })
  }

  // LoadData
  const loadData = () => {
    dispatch(getEmployeeByFarmId(farmId))
  }

  return (
    <>
      <AddEmployee
        handleSearch={handleSearch}
        farmId={farmId}
        taskTypeActive={taskTypeActive}
        onFinishCreate={onFinishCreate}
        getEmployeeByExcel={getEmployeeByExcel}
        getEmployeeEffort={getEmployeeEffort}
        onFinishCreateEmployeeExcel={onFinishCreateEmployeeExcel}
      />
      <DisplayEmployee
        loading={loading}
        farmId={farmId}
        taskTypeActive={taskTypeActive}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
        employeeByFarm={employeeByFarm}
        searchTerm={searchTerm}
        loadData={loadData}
        getAnyEmployeeEffort={getAnyEmployeeEffort}
      />
    </>
  )
}
export default Employee
