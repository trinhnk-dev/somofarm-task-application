import React from "react";
import { Form } from "antd";
import AreaPlantSelect from "../FormItemCreate/AreaPlantSelect";
import ZonePlantSelect from "../FormItemCreate/ZonePlantSelect";
import FieldPlantSelect from "../FormItemCreate/FieldPlantSelect";
import DateSelect from "../FormItemCreate/DateSelect";
import DescriptionInput from "../FormItemCreate/DescriptionInput";
import NameTaskInput from "../FormItemCreate/NameTaskInput";
import TaskTypePlantSelect from "../FormItemCreate/TaskTypePlantSelect";
import SupervisorSelect from "../FormItemCreate/SupervisorSelect";
import MaterialSelect from "../FormItemCreate/MaterialSelect";
import PrioritySelect from "../FormItemCreate/PrioritySelect";
import RemindSelect from "../FormItemCreate/RemindSelect";
import RepeatSelect from "../FormItemCreate/RepeatSelect";

function WholeGarden({
  handleFormSubmit,
  isDraft,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  handleNameChange,
  handleSelectStartDate,
  handleSelectEndDate,
  handleDescriptionChange,
  handlePriorityChange,
  handleSupervisorValue,
  handleTaskTypeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  form,
  areaPlantByZone,
  zonePlant,
  fieldByZone,
  name,
  startDate,
  endDate,
  description,
  priorityValue,
  supervisorValue,
  selectedFieldId,
  dataTaskTypePlant,
  materialsValue,
  remindValue,
  repeatValue,
  supervisor,
  material,
  disabledDate,
  selectedDays,
  setSelectedDays,
}) {
  return (
    <Form
      layout="vertical"
      onFinish={handleFormSubmit}
      className="task-form"
      id="createTask"
      name="createTask"
      form={form}
    >
        <div className="form-left">
          <AreaPlantSelect
            handleSelectAreaChange={handleSelectAreaChange}
            areaPlantByZone={areaPlantByZone}
            isDraft={isDraft}
          />
          <ZonePlantSelect
            handleSelectZoneChange={handleSelectZoneChange}
            zonePlant={zonePlant}
            isDraft={isDraft}
          />
          <FieldPlantSelect
            handleSelectFieldChange={handleSelectFieldChange}
            fieldByZone={fieldByZone}
            selectedFieldId={selectedFieldId}
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
            isDraft={isDraft}
          />
          <DescriptionInput
            description={description}
            handleDescriptionChange={handleDescriptionChange}
          />
        </div>
        <div className="form-right">
          <NameTaskInput name={name} handleNameChange={handleNameChange} />
          <TaskTypePlantSelect
            dataTaskTypePlant={dataTaskTypePlant}
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
            endDate={endDate}
            selectedDays={selectedDays}
            setSelectedDays={setSelectedDays}
          />
        </div>
    </Form>
  );
}

export default WholeGarden;
