import React from "react";
import { Form } from "antd";
import dayjs from "dayjs";
import AreaByFarmSelect from "../FormItemCreate/AreaByFarmSelect";
import ZoneByAreaSelect from "../FormItemCreate/ZoneByAreaSelect";
import FieldOtherSelect from "../FormItemCreate/FieldOtherSelect";
import AddressDetailInput from "../FormItemCreate/AddressDetailInput";
import DateSelect from "../FormItemCreate/DateSelect";
import DescriptionInput from "../FormItemCreate/DescriptionInput";
import NameTaskInput from "../FormItemCreate/NameTaskInput";
import TaskTypeActiveSelect from "../FormItemCreate/TaskTypeActiveSelect";
import SupervisorSelect from "../FormItemCreate/SupervisorSelect";
import MaterialSelect from "../FormItemCreate/MaterialSelect";
import PrioritySelect from "../FormItemCreate/PrioritySelect";
import RemindSelect from "../FormItemCreate/RemindSelect";
import RepeatSelect from "../FormItemCreate/RepeatSelect";

function OtherTaskType({
  handleFormOtherSubmit,
  isDraft,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  addressDetail,
  handleNameChange,
  handleAddressDetail,
  handlePriorityChange,
  handleSupervisorValue,
  handleSelectStartDate,
  handleSelectEndDate,
  handleDescriptionChange,
  handleTaskTypeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  form,
  areaByFarm,
  zoneByArea,
  fieldByZone,
  name,
  startDate,
  endDate,
  description,
  priorityValue,
  supervisorValue,
  taskTypeActiveOther,
  supervisor,
  materialsValue,
  material,
  remindValue,
  repeatValue,
  disabledDate,
  selectedDays,
  setSelectedDays,
}) {
  const calculateDaysDifference = (startDate, endDate) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, "days");
  };
  return (
    <Form
      layout="vertical"
      onFinish={handleFormOtherSubmit}
      className="task-form"
      id="createTask"
      name="createTask"
      form={form}
    >
      <div className="form-left">
        <AreaByFarmSelect
          handleSelectAreaChange={handleSelectAreaChange}
          areaByFarm={areaByFarm}
          isDraft={isDraft}
        />
        <ZoneByAreaSelect
          handleSelectZoneChange={handleSelectZoneChange}
          zoneByArea={zoneByArea}
        />
        <FieldOtherSelect
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
        />
        <AddressDetailInput
          addressDetail={addressDetail}
          handleAddressDetail={handleAddressDetail}
          isDraft={isDraft}
        />
        <PrioritySelect
          priorityValue={priorityValue}
          handlePriorityChange={handlePriorityChange}
        />
        <DateSelect
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
          calculateDaysDifference={calculateDaysDifference}
          isDraft={isDraft}
        />
        <DescriptionInput
          description={description}
          handleDescriptionChange={handleDescriptionChange}
        />
      </div>
      <div className="form-right">
        <NameTaskInput name={name} handleNameChange={handleNameChange} />
        <TaskTypeActiveSelect
          taskTypeActiveOther={taskTypeActiveOther}
          handleTaskTypeChange={handleTaskTypeChange}
          isDraft={isDraft}
        />
        <SupervisorSelect
          supervisor={supervisor}
          supervisorValue={supervisorValue}
          handleSupervisorValue={handleSupervisorValue}
          isDraft={isDraft}
        />
        <MaterialSelect
          materialsValue={materialsValue}
          handleMaterialChange={handleMaterialChange}
          material={material}
        />
        <RemindSelect
          remindValue={remindValue}
          handleSelectRemind={handleSelectRemind}
        />
        <RepeatSelect
          repeatValue={repeatValue}
          handleSelectRepeat={handleSelectRepeat}
          startDate={startDate}
          endDate={endDate}
          calculateDaysDifference={calculateDaysDifference}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
    </Form>
  );
}

export default OtherTaskType;
