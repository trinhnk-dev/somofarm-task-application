import { useEffect } from 'react'
import AddMember from './AddMember'
import CardMember from './CardMember'
import TableMember from './TableMember'
import { useDispatch } from 'react-redux'
import {
  adminDeleteMember,
  createMember,
  updateMember,
} from 'features/slice/user/memberSlice'
import { useSelector } from 'react-redux'
import { Divider } from 'antd'
import { getMemberByFarmId } from 'features/slice/user/memberByFarm'

const StatisticMember = () => {
  const dispatch = useDispatch()
  const memberByFarm = useSelector((state) => state.memberByFarm.data)
  const loading = useSelector((state) => state.memberByFarm.loading)

  const farmId = localStorage.getItem('farmId')

  useEffect(() => {
    dispatch(getMemberByFarmId(farmId))
  }, [dispatch])

  const onFinishCreate = (values) => {
    dispatch(createMember(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateMember(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(adminDeleteMember(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getMemberByFarmId(farmId))
  }

  return (
    <>
      <AddMember farmId={farmId} onFinishCreate={onFinishCreate} />
      <CardMember memberByFarm={memberByFarm} />
      <Divider dashed />
      <TableMember
        memberByFarm={memberByFarm}
        onFinishDelete={onFinishDelete}
        loadData={loadData}
        onFinishUpdate={onFinishUpdate}
        loading={loading}
      />
    </>
  )
}
export default StatisticMember
