import { Button, DatePicker, Form, Modal } from 'antd'

const FormDownloadEffort = ({
  isModalOpenEffort,
  closeModalEffort,
  farmId,
  getEmployeeEffort,
}) => {
  const onFinish = (values) => {
    const dateString = values?.date?.format('MM-YYYY')
    const [month, year] = dateString.split('-')

    const finalValues = {
      farmId: farmId,
      month: month,
      year: year,
    }
    getEmployeeEffort(finalValues)
    closeModalEffort()
  }

  return (
    <>
      <Modal
        title="Tải xuống bảng giờ làm"
        open={isModalOpenEffort}
        onCancel={closeModalEffort}
        footer={[
          <Button form="downloadEffort" type="dashed" htmlType="reset">
            Làm mới
          </Button>,
          <Button
            form="downloadEffort"
            type="primary"
            danger
            onClick={closeModalEffort}
          >
            Huỷ
          </Button>,
          <Button form="downloadEffort" type="primary" htmlType="submit">
            Hoàn thành
          </Button>,
        ]}
      >
        <Form
          layout="vertical"
          className="first-step-animal"
          id="downloadEffort"
          onFinish={onFinish}
        >
          <Form.Item
            name="date"
            label="Chọn tháng"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tháng',
              },
            ]}
          >
            <DatePicker picker="month" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default FormDownloadEffort
