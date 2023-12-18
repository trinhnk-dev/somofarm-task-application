import LayoutWithRoute from 'common/components/Sidebar/LayoutWithRoute'
import SignIn from 'features/authentication/SignIn'
import AnimalGroup from 'features/pages/Animals/AnimalGroup'
import Animals from 'features/pages/Animals/Animals'
import Area from 'features/pages/Area'
import CropGroup from 'features/pages/Plants/CropGroup'
import MyCrops from 'features/pages/Plants/MyCrops'
import Task from 'features/pages/Task'
import Zone from 'features/pages/Zone'
import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Material from 'features/pages/Material'
import Schedule from 'features/pages/Schedule'
import AdminPrivateRoute from './AdminPrivateRoute'
import NonAuthenRoute from './NonAuthenRoute'
import PageNotFound from 'features/pages/PageNotFound/PageNotFound'
import { authServices } from 'services/authServices'
import StatisticFarm from 'features/pages/Admin/Farm/StatisticFarm'
import AdminLayoutWithRoute from 'common/components/Sidebar/AdminLayoutWithRoute'
import StatisticArea from 'features/pages/Admin/Area/StatisticArea'
import StatisticZone from 'features/pages/Admin/Zone/StatisticZone'
import StatisticMember from 'features/pages/Admin/Member/StatisticMember'
import Employee from 'features/pages/Employee'
import Home from 'features/pages/Dashboard/Dashboard'
import Dashboard from 'features/pages/Admin/Dashboard/Dashboard'
import StatisticAnimalGroup from 'features/pages/Admin/AnimalGroup/StatisticAnimalGroup'
import StatisticCropGroup from 'features/pages/Admin/CropGroup/StatisticCropGroup'
import StatisticTask from 'features/pages/Admin/Task/StatisticTask'
import StatisticMaterial from 'features/pages/Admin/Material/StatisticMaterial'
import AnimalType from 'features/pages/AnimalType/AnimalType'
import PlantType from 'features/pages/PlantType/PlantType'
import TaskType from 'features/pages/TaskType/TaskType'
import FarmDash from 'features/pages/Admin/FarmDash/FarmDash'
import ProfileAdmin from 'features/pages/Admin/Profile/ProfileAdmin'

const AppRoute = () => {
  return (
    <Routes>
      {/* =============Non Authen====== */}
      {authServices.getToken() === null && (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<SignIn />} />

          <Route path="/*" element={<Navigate to="/page-not-found" />} />
          <Route path="/page-not-found" element={<PageNotFound />} />
        </>
      )}

      {/* Manager */}
      {authServices.getToken() !== null &&
        authServices.getRole() === 'Manager' && (
          <>
            <Route path="/" element={<Navigate to="/home" replace />} />
          </>
        )}

      {/* Default manager */}

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Home />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/schedule"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Schedule />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/task"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Task />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/task-type"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <TaskType />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/area"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Area />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/zone"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Zone />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/animals"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Animals />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/animal-type"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <AnimalType />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/animal-group"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <AnimalGroup />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/plants"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <MyCrops />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/plant-type"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <PlantType />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/crop-group"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <CropGroup />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/material"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Material />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <PrivateRoute>
            <LayoutWithRoute>
              <Employee />
            </LayoutWithRoute>
          </PrivateRoute>
        }
      />

      {/* Admin */}
      {authServices.getToken() !== null &&
        authServices.getRole() === 'Admin' && (
          <>
            <Route
              path="/"
              element={<Navigate to="/statistic-farm" replace />}
            />
          </>
        )}

      {/* Default admin */}

      <Route
        path="/dashboard"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <Dashboard />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      {/* <Route
        path="/statistic-task"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticTask />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      /> */}

      <Route
        path="/statistic-farm"
        element={
          <AdminPrivateRoute>
            {/* <AdminLayoutWithRoute> */}
            <StatisticFarm />
            {/* </AdminLayoutWithRoute> */}
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/farm-dash"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <FarmDash />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-area"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticArea />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-zone"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticZone />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-animal-group"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticAnimalGroup />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-crop-group"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticCropGroup />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-material"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticMaterial />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/statistic-member"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <StatisticMember />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      <Route
        path="/admin-profile"
        element={
          <AdminPrivateRoute>
            <AdminLayoutWithRoute>
              <ProfileAdmin />
            </AdminLayoutWithRoute>
          </AdminPrivateRoute>
        }
      />

      {/* Login */}

      <Route
        path="/login"
        element={
          <NonAuthenRoute>
            <SignIn />
          </NonAuthenRoute>
        }
      />

      {/* Page not found */}
      <Route path="/*" element={<Navigate to="/page-not-found" />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      {/* ------------------------------------ */}
    </Routes>
  )
}

export default AppRoute
