import React from 'react'
import {
  GrDocumentSound,
  GrInProgress,
  GrPauseFill,
  GrClose,
} from "react-icons/gr";
import { BsHourglassSplit } from "react-icons/bs";
import { GoMegaphone } from "react-icons/go";
import { CheckOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const DashboardBox = ({ taskByWeek, selectedDay, loading }) => {
  const calculateTotalTasks = () => {
    if (selectedDay !== null) {
      const dayTask = taskByWeek?.data[selectedDay]
      return {
        totalTaskToDo: dayTask.totalTaskToDo,
        totalTaskDoing: dayTask.totalTaskDoing,
        totalTaskClose: dayTask.totalTaskClose,
        totalTaskPending: dayTask.totalTaskPending,
      }
    } else {
      let totalTaskToDo = 0
      let totalTaskDoing = 0
      let totalTaskClose = 0
      let totalTaskPending = 0

      taskByWeek?.data?.forEach((task) => {
        totalTaskToDo += task.totalTaskToDo
        totalTaskDoing += task.totalTaskDoing
        totalTaskClose += task.totalTaskClose
        totalTaskPending += task.totalTaskPending
      })

      return {
        totalTaskToDo,
        totalTaskDoing,
        totalTaskClose,
        totalTaskPending,
      }
    }
  }

  let filteredData = taskByWeek?.data
    ? calculateTotalTasks(taskByWeek.data)
    : []

  if (selectedDay !== null && taskByWeek?.data) {
    const selectedTasks = taskByWeek.data[selectedDay]
    filteredData = calculateTotalTasks([selectedTasks])
  }


  return (
    <>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Chuẩn bị</p>
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                    color: "black"
                  }}
                  spin
                />
              }
            />
          ) : (
            <h5> {filteredData?.totalTaskToDo}</h5>
          )}
        </div>
        <div className="dashboard-logo">
          <div className="dashboard-todo">
            <GoMegaphone />
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Đang làm</p>
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                    color: "black"
                  }}
                  spin
                />
              }
            />
          ) : (
            <h5> {filteredData?.totalTaskDoing}</h5>
          )}
        </div>
        <div className="dashboard-logo">
          <div className="dashboard-doing">
            <BsHourglassSplit />
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Tạm hoãn</p>
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                    color: "black"
                  }}
                  spin
                />
              }
            />
          ) : (
            <h5> {filteredData?.totalTaskPending}</h5>
          )}
        </div>
        <div className="dashboard-logo">
          <div className="dashboard-pending">
            <GrPauseFill />
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-text">
          <p>Đã đóng</p>
          {loading ? (
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 24,
                    color: "black"
                  }}
                  spin
                />
              }
            />
          ) : (
            <h5> {filteredData?.totalTaskClose}</h5>
          )}
        </div>
        <div className="dashboard-logo">
          <div className="dashboard-close">
            <CheckOutlined />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardBox
