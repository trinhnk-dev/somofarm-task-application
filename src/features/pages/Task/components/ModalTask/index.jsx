import React, { useState } from "react";
import { Button, Modal, Steps } from "antd";
import FirstModal from "./components/FirstModal";
import SecondModal from "./components/SecondModal";
import ThirdModal from "./components/ThirdModal";
import { steps } from "./modalTaskData";
import {
  ArrowLeftOutlined,
  CheckCircleOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useMobileSMMediaQuery } from "common/hooks/responsive";

const { Step } = Steps;

function ModalTask({
  currentStep,
  setCurrentStep,
  onTaskAdded,
  onDateChange,
  loadDataTask,
  handleBackOtherTask,
  handleTabChange,
}) {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDraft, setIsDraft] = useState(false);
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const handleIsDraft = () => {
    setIsDraft(true);
  };

  const handleIsTaskToDo = () => {
    setIsDraft(false);
  };

  const handleIsDraftOther = () => {
    setIsDraft(true);
  };

  const handleIsTaskOtherToDo = () => {
    setIsDraft(false);
  };

  const handleCloseModal = () => {
    setCurrentStep(-1);
  };

  const handleNext = (type) => {
    setSelectedType(type);
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setCurrentStep(currentStep + 1);
  };

  const isMobileSM = useMobileSMMediaQuery();

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <FirstModal onNext={handleNext} />;
      case 1:
        return (
          <SecondModal
            type={selectedType}
            onOptionSelect={handleOptionSelect}
          />
        );
      case 2:
        return (
          <ThirdModal
            loadDataTask={loadDataTask}
            option={selectedOption}
            onTaskAdded={onTaskAdded}
            onDateChange={onDateChange}
            handleTabChange={handleTabChange}
            handleCloseModal={handleCloseModal}
            handleIsDraft={handleIsDraft}
            handleIsTaskToDo={handleIsTaskToDo}
            handleIsDraftOther={handleIsDraftOther}
            handleIsTaskOtherToDo={handleIsTaskOtherToDo}
            isDraft={isDraft}
            setIsCreatingTask={setIsCreatingTask}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setCurrentStep(0)}>
        Thêm công việc
      </Button>
      <Modal
        title="Thêm công việc"
        visible={currentStep > -1}
        onCancel={() => setCurrentStep(-1)}
        footer={null}
        width={900}
      >
        <Steps current={currentStep} size="small">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div style={{ marginTop: 24 }}>{renderStepContent(currentStep)}</div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {currentStep > 0 &&
            (selectedOption === "other" ? (
              <Button
                style={{
                  margin: "0 8px",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={handleBackOtherTask}
              >
                <ArrowLeftOutlined />
                Trở lại
              </Button>
            ) : isMobileSM ? (
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={handleBack}
              >
                <ArrowLeftOutlined />
              </Button>
            ) : (
              <Button
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
                onClick={handleBack}
              >
                <ArrowLeftOutlined />
                Trở lại
              </Button>
            ))}
          {currentStep === steps.length - 1 &&
            (selectedOption === "other" ? (
              <div className="button-create">
                <Button
                  type="dashed"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsDraftOther}
                  disabled={isCreatingTask}
                >
                  Lưu bản nháp
                  <ProfileOutlined />
                </Button>
                <Button
                  type="primary"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsTaskOtherToDo}
                  disabled={isCreatingTask}
                >
                  Tạo công việc
                  <CheckCircleOutlined />
                </Button>
              </div>
            ) : isMobileSM ? (
              <div className="button-create">
                <Button
                  type="dashed"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsDraft}
                  disabled={isCreatingTask}
                >
                  Lưu nháp
                  <ProfileOutlined />
                </Button>
                <Button
                  type="primary"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsTaskToDo}
                  disabled={isCreatingTask}
                >
                  Tạo
                  <CheckCircleOutlined />
                </Button>
              </div>
            ) : (
              <div className="button-create">
                <Button
                  type="dashed"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsDraft}
                  disabled={isCreatingTask}
                >
                  Lưu bản nháp
                  <ProfileOutlined />
                </Button>
                <Button
                  type="primary"
                  form="createTask"
                  htmlType="submit"
                  onClick={handleIsTaskToDo}
                  disabled={isCreatingTask}
                >
                  Tạo công việc
                  <CheckCircleOutlined />
                </Button>
              </div>
            ))}
        </div>
      </Modal>
    </>
  );
}

export default ModalTask;
