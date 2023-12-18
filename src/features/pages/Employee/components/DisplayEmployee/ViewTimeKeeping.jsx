import React, { useState } from 'react'
import { Button, DatePicker, Drawer, Form, Radio, Space } from 'antd'
import { Descriptions } from 'antd'
import ListTaskDone from './ListTaskDone'
const ViewTimeKeeping = ({
  onClose,
  openDrawer,
  selectedDataDetail,
  getAnyEmployeeEffort,
  employeeEffortTotal,
}) => {
  const [showForm, setShowForm] = useState(false)

  const onFinish = (values) => {
    const dateString = values?.date?.format('MM-YYYY')
    const [month, year] = dateString.split('-')
    const finalValues = {
      month: month,
      year: year,
      employeeId: selectedDataDetail.id,
      code: selectedDataDetail.code,
    }
    getAnyEmployeeEffort(finalValues)
  }

  const handleDownloadClick = () => {
    setShowForm(true)
  }

  const [showTaskList, setShowTaskList] = useState(false)

  const toggleTaskList = () => {
    setShowTaskList(!showTaskList)
  }

  return (
    <Drawer
      title="Xem chi tiết giờ làm"
      placement="right"
      width={400}
      onClose={onClose}
      open={openDrawer}
      extra={
        <Space>
          <Button onClick={onClose}>Đóng</Button>
        </Space>
      }
    >
      {!showTaskList ? (
        <>
          <Descriptions
            layout="horizontal"
            bordered
            column={1}
            title="Chi tiết giờ làm"
            labelStyle={{
              width: '150px',
            }}
          >
            <Descriptions.Item label="Mã nhân viên">
              {selectedDataDetail?.code}
            </Descriptions.Item>
            <Descriptions.Item label="Tên nhân viên">
              {selectedDataDetail?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Thời gian làm thực tế">
              {employeeEffortTotal?.data?.actualEffortHour} giờ{' '}
              {employeeEffortTotal?.data?.actualEfforMinutes} phút
            </Descriptions.Item>
            <Descriptions.Item label="Tổng số công việc đã làm">
              <div
                onClick={toggleTaskList}
                style={{ cursor: 'pointer', color: '#1890ff' }}
                onMouseOver={({ target }) =>
                  (target.style.textDecoration = 'underline')
                }
                onMouseOut={({ target }) =>
                  (target.style.textDecoration = 'none')
                }
              >
                {employeeEffortTotal?.data?.totalTask}
              </div>
            </Descriptions.Item>
          </Descriptions>
          <Button
            type="primary"
            style={{ marginTop: '15px' }}
            onClick={handleDownloadClick}
          >
            Tải chi tiết giờ làm
          </Button>
          {showForm && (
            <Form onFinish={onFinish} style={{ marginTop: '10px' }}>
              <Form.Item
                name="date"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn tháng để tải',
                  },
                ]}
              >
                <DatePicker picker="month" />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Tải</Button>
              </Form.Item>
            </Form>
          )}
        </>
      ) : (
        <ListTaskDone
          toggleTaskList={toggleTaskList}
          selectedDataDetail={selectedDataDetail}
        />
      )}
    </Drawer>
  )
}
export default ViewTimeKeeping
