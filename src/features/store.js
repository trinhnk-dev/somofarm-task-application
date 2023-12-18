import { configureStore } from '@reduxjs/toolkit'
import farmReducer from './slice/farm/farmSlice'
import farmByIdReducer from './slice/farm/farmByIdSlice'
import plantReducer from './slice/plant/plantSlice'
import animalReducer from './slice/animal/animalSlice'
import animalTypeReducer from './slice/animal/animalTypeSlice'
import animalTypeActiveReducer from './slice/animal/animalTypeActiveSlice'
import animalByFarmReducer from './slice/animal/animalByFarmSlice'
import areaReducer from './slice/area/areaSlice'
import areaByFarmReducer from './slice/area/areaByFarmSlice'
import areaLivestockByZoneReducer from './slice/area/areaLivestockWithZoneSlice'
import areaPlantByZoneReducer from './slice/area/areaPlantWithZoneSlice'
import zoneReducer from './slice/zone/zoneSlice'
import zoneByFarmReducer from './slice/zone/zoneByFarmSlice'
import zonePlantReducer from './slice/zone/zonePlantSlice'
import zoneAnimalReducer from './slice/zone/zoneAnimalSlice'
import zoneTypeReducer from './slice/zone/zoneTypeSlice'
import zoneByAreaReducer from './slice/zone/zoneByAreaSlice'
import taskTypeReducer from './slice/task/taskTypeSlice'
import taskTypeActiveReducer from './slice/task/taskTypeActiveSlice'
import taskForCalendarReducer from './slice/task/taskForCalendarSlice'
import taskTypePlantReducer from './slice/task/taskTypePlantSlice'
import taskTypeLivestockReducer from './slice/task/taskTypeAnimalSlice'
import taskTypeActiveOtherReducer from './slice/task/taskTypeOtherSlice'
import taskTypeByIdReducer from './slice/task/taskTypeByIdSlice'
import taskTypeTemplateReducer from './slice/task/taskTypeTemplate'
import taskTypeExcelReducer from './slice/task/taskTypeExcelSlice'
import taskDoneReducer from './slice/task/taskDoneSlice'
import taskFarmReducer from './slice/task/taskFarmSlice'
import taskMonthReducer from './slice/task/taskMonthSlice'
import taskTopAreaReducer from './slice/task/taskTopAreaSlice'
import taskCompleteRateReducer from './slice/task/taskCompleteRateSlice'
import supervisorReducer from './slice/supervisor/supervisorSlice'
import employeeReducer from './slice/employee/employeeSlice'
import employeeByTaskReducer from './slice/employee/employeeByTask'
import employeeExcelReducer from './slice/employee/employeeExcelSlice'
import employeeEffortReducer from './slice/employee/employeeEffortSlice'
import employeeEffortTotalReducer from './slice/employee/employeeEffortTotalSlice'
import materialReducer from './slice/material/materialSlice'
import materialByIdReducer from './slice/material/materialById'
import materialExcelReducer from './slice/material/materialExcelSlice'
import materialActiveReducer from './slice/material/materialActiveByFarmSlice'
import fieldReducer from './slice/field/fieldSlice'
import fieldPlantReducer from './slice/field/fieldPlantSlice'
import fieldAnimalReducer from './slice/field/fieldAnimalSlice'
import fieldByZoneReducer from './slice/field/fieldByZoneSlice'
import fieldListAnimalReducer from './slice/field/fieldListAnimal'
import fieldListPlantReducer from './slice/field/fieldListPlant'
import plantTypeReducer from './slice/plant/plantTypeSlice'
import plantTypeActiveReducer from './slice/plant/plantTypeActiveSlice'
import plantByFarmReducer from './slice/plant/plantByFarmSlice'
import taskReducer from './slice/task/taskSlice'
import taskByIdReducer from './slice/task/taskByIdSlice'
import taskByWeekReducer from './slice/task/taskByWeekSlice'
import taskTopEmployeeReducer from './slice/task/taskTopEmployeeSlice'
import evidenceReducer from './slice/task/taskEvidenceSlice'
import activityReducer from './slice/activity/activitySlice'
import effortReducer from './slice/effort/effortSlice'
import effortInWeekReducer from './slice/effort/effortInWeekSlice'
import habitantTypeReducer from './slice/habitant/habitantTypeSlice'
import memberReducer from './slice/user/memberSlice'
import adminReducer from './slice/user/adminSlice'
import passwordReducer from './slice/user/passwordSlice'
import memberByFarmReducer from './slice/user/memberByFarm'
import statusReducer from './slice/status/statusSlice'
import hubReducer from './slice/hub/hubSlice'
import notificationReducer from './slice/notification/notificationSlice'
import notificationCountReducer from './slice/notification/notificationCountSlice'
import notificationIsNewReducer from './slice/notification/notificationIsNewSlice'
import notificationReadReducer from './slice/notification/notificationReadSlice'
import notifyChangeReducer from './slice/notification/notifyChangeSlice'
import employeeByFarmReducer from './slice/employee/employeeByFarmSlice'
import locationReducer from './slice/location/locationSlice'

export const store = configureStore({
  reducer: {
    farm: farmReducer,
    farmById: farmByIdReducer,
    plant: plantReducer,
    animal: animalReducer,
    area: areaReducer,
    areaByFarm: areaByFarmReducer,
    areaLivestockByZone: areaLivestockByZoneReducer,
    areaPlantByZone: areaPlantByZoneReducer,
    zone: zoneReducer,
    zoneByFarm: zoneByFarmReducer,
    zoneByArea: zoneByAreaReducer,
    zonePlant: zonePlantReducer,
    zoneAnimal: zoneAnimalReducer,
    zoneType: zoneTypeReducer,
    supervisor: supervisorReducer,
    employee: employeeReducer,
    employeeByTask: employeeByTaskReducer,
    material: materialReducer,
    materialActive: materialActiveReducer,
    materialById: materialByIdReducer,
    materialExcel: materialExcelReducer,
    field: fieldReducer,
    fieldPlant: fieldPlantReducer,
    fieldAnimal: fieldAnimalReducer,
    fieldListAnimal: fieldListAnimalReducer,
    fieldListPlant: fieldListPlantReducer,
    fieldByZone: fieldByZoneReducer,
    plantType: plantTypeReducer,
    plantTypeActive: plantTypeActiveReducer,
    plantByFarm: plantByFarmReducer,
    animalType: animalTypeReducer,
    animalTypeActive: animalTypeActiveReducer,
    animalByFarm: animalByFarmReducer,
    task: taskReducer,
    taskById: taskByIdReducer,
    taskByWeek: taskByWeekReducer,
    taskForCalendar: taskForCalendarReducer,
    taskType: taskTypeReducer,
    taskTypeExcel: taskTypeExcelReducer,
    taskTypeById: taskTypeByIdReducer,
    taskTypeTemplate: taskTypeTemplateReducer,
    taskTypeActive: taskTypeActiveReducer,
    taskTypePlant: taskTypePlantReducer,
    taskTypeLivestock: taskTypeLivestockReducer,
    taskTypeActiveOther: taskTypeActiveOtherReducer,
    taskDone: taskDoneReducer,
    taskFarm: taskFarmReducer,
    taskMonth: taskMonthReducer,
    taskTopArea: taskTopAreaReducer,
    taskCompleteRate: taskCompleteRateReducer,
    taskTopEmployee: taskTopEmployeeReducer,
    evidence: evidenceReducer,
    activity: activityReducer,
    effort: effortReducer,
    effortInWeek: effortInWeekReducer,
    habitantType: habitantTypeReducer,
    member: memberReducer,
    memberByFarm: memberByFarmReducer,
    admin: adminReducer,
    status: statusReducer,
    hub: hubReducer,
    notification: notificationReducer,
    notificationCount: notificationCountReducer,
    notificationIsNew: notificationIsNewReducer,
    notificationRead: notificationReadReducer,
    notifyChange: notifyChangeReducer,
    employeeByFarm: employeeByFarmReducer,
    employeeExcel: employeeExcelReducer,
    employeeEffort: employeeEffortReducer,
    employeeEffortTotal: employeeEffortTotalReducer,
    location: locationReducer,
    password: passwordReducer,
  },
})
