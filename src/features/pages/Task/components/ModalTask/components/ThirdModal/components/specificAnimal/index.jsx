import React from "react";
import {  Form } from "antd";
import AreaLivestockSelect from "../FormItemCreate/AreaLivestockSelect";
import ZoneAnimalSelect from "../FormItemCreate/ZoneAnimal";
import FieldAnimalSelect from "../FormItemCreate/FieldAnimalSelect";
import AnimalSelect from "../FormItemCreate/AnimalSelect";
import DateSelect from "../FormItemCreate/DateSelect";
import DescriptionInput from "../FormItemCreate/DescriptionInput";
import NameTaskInput from "../FormItemCreate/NameTaskInput";
import TaskTypeLivestockSelect from "../FormItemCreate/TaskTypeLivestockSelect";
import SupervisorSelect from "../FormItemCreate/SupervisorSelect";
import MaterialSelect from "../FormItemCreate/MaterialSelect";
import PrioritySelect from "../FormItemCreate/PrioritySelect";
import RemindSelect from "../FormItemCreate/RemindSelect";
import RepeatSelect from "../FormItemCreate/RepeatSelect";

function SpecificAnimal({
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
  handleLivestockValue,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  form,
  areaLivestockByZone,
  zoneAnimal,
  fieldByZone,
  name,
  startDate,
  endDate,
  description,
  priorityValue,
  supervisorValue,
  selectedFieldId,
  dataTaskTypeLivestock,
  livestockValue,
  materialsValue,
  remindValue,
  repeatValue,
  dataAnimal,
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
        <AreaLivestockSelect
          handleSelectAreaChange={handleSelectAreaChange}
          areaLivestockByZone={areaLivestockByZone}
          isDraft={isDraft}
        />
        <ZoneAnimalSelect
          handleSelectZoneChange={handleSelectZoneChange}
          zoneAnimal={zoneAnimal}
          isDraft={isDraft}
        />
        <FieldAnimalSelect
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
          selectedFieldId={selectedFieldId}
          isDraft={isDraft}
        />
        <AnimalSelect
          dataAnimal={dataAnimal}
          livestockValue={livestockValue}
          handleLivestockValue={handleLivestockValue}
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
        <TaskTypeLivestockSelect
          dataTaskTypeLivestock={dataTaskTypeLivestock}
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
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
        />
      </div>
    </Form>
  );
}

export default SpecificAnimal;
