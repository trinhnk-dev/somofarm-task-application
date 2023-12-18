import {
  createFarm,
  deleteFarm,
  getFarm,
  updateFarm,
} from 'features/slice/farm/farmSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import DisplayFarm from './DisplayFarm'

const StatisticFarm = () => {
  const dispatch = useDispatch()
  const farm = useSelector((state) => state.farm.data)

  useEffect(() => {
    dispatch(getFarm())
  }, [dispatch])

  const onFinishCreate = (values) => {
    dispatch(createFarm(values)).then(() => {
      loadData()
    })
  }

  const onFinishUpdate = (values) => {
    dispatch(updateFarm(values)).then(() => {
      loadData()
    })
  }

  const onFinishDelete = (id) => {
    dispatch(deleteFarm(id)).then(() => {
      loadData()
    })
  }

  const loadData = () => {
    dispatch(getFarm())
  }

  return (
    <>
      <DisplayFarm
        farm={farm}
        onFinishCreate={onFinishCreate}
        onFinishDelete={onFinishDelete}
        onFinishUpdate={onFinishUpdate}
      />
    </>
  )
}
export default StatisticFarm
