import React from "react";
import AreaLivestockUpdate from "../FormItemUpdate/AreaLivestockUpdate";
import ZoneAnimalUpdate from "../FormItemUpdate/ZoneAnimalUpdate";
import FieldAnimalUpdate from "../FormItemUpdate/FieldAnimalUpdate";
import NameTaskUpdate from "../FormItemUpdate/NameTaskUpdate";
import TaskTypeLivestockUpdate from "../FormItemUpdate/TaskTypeLivestockUpdate";
import SupervisorUpdate from "../FormItemUpdate/SupervisorUpdate";
import MaterialUpdate from "../FormItemUpdate/MaterialUpdate";
import PriorityUpdate from "../FormItemUpdate/PriorityUpdate";
import RemindUpdate from "../FormItemUpdate/RemindUpdate";
import AnimalUpdate from "../FormItemUpdate/AnimalUpdate";
import DateUpdate from "../FormItemUpdate/DateUpdate";
import DescriptionUpdate from "../FormItemUpdate/DescriptionUpdate";
import RepeatUpdate from "../FormItemUpdate/RepeatUpdate";
import IsImportantUpdate from "../FormItemUpdate/IsImportantUpdate";

function UpdateSpecificAnimal({
  editingTask,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
  handleLivestockChange,
  handlePriorityChange,
  handleSelectStartDate,
  handleSelectEndDate,
  handleNameChange,
  handleSupervisorChange,
  handleDescriptionChange,
  handleTaskTypeChange,
  handleMaterialChange,
  handleSelectRemind,
  handleSelectRepeat,
  handleSelectImportant,
  areaLivestockByZone,
  zoneAnimal,
  fieldByZone,
  selectedLivestockId,
  dataAnimal,
  priorityValue,
  nameValue,
  supervisorValue,
  description,
  dataTaskTypeLivestock,
  supervisor,
  materialsValue,
  material,
  remindValue,
  repeatValue,
  importantValue,
  disabledDate,
  startDate,
  endDate,
  selectedDays,
  setSelectedDays,
  initialSelectedDays,
  setInitialSelectedDays,
  isDraft,
  form,
}) {
  return (
    <>
      <div className="form-left">
        <AreaLivestockUpdate
          handleSelectAreaChange={handleSelectAreaChange}
          areaLivestockByZone={areaLivestockByZone}
          editingTask={editingTask}
          isDraft={isDraft}
        />
        <ZoneAnimalUpdate
          handleSelectZoneChange={handleSelectZoneChange}
          zoneAnimal={zoneAnimal}
          editingTask={editingTask}
          isDraft={isDraft}
        />
        <FieldAnimalUpdate
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
          editingTask={editingTask}
          isDraft={isDraft}
        />
        <AnimalUpdate
          selectedLivestockId={selectedLivestockId}
          handleLivestockChange={handleLivestockChange}
          dataAnimal={dataAnimal}
          editingTask={editingTask}
          isDraft={isDraft}
        />
        <PriorityUpdate
          priorityValue={priorityValue}
          handlePriorityChange={handlePriorityChange}
          editingTask={editingTask}
        />
        <DateUpdate
          editingTask={editingTask}
          disabledDate={disabledDate}
          handleSelectStartDate={handleSelectStartDate}
          handleSelectEndDate={handleSelectEndDate}
          startDate={startDate}
          endDate={endDate}
          isDraft={isDraft}
        />
        <DescriptionUpdate
          description={description}
          handleDescriptionChange={handleDescriptionChange}
          editingTask={editingTask}
        />
      </div>
      <div className="form-right">
        <NameTaskUpdate
          editingTask={editingTask}
          nameValue={nameValue}
          handleNameChange={handleNameChange}
        />
        <TaskTypeLivestockUpdate
          dataTaskTypeLivestock={dataTaskTypeLivestock}
          handleTaskTypeChange={handleTaskTypeChange}
          editingTask={editingTask}
          isDraft={isDraft}
        />
        <SupervisorUpdate
          supervisor={supervisor}
          supervisorValue={supervisorValue}
          handleSupervisorChange={handleSupervisorChange}
          editingTask={editingTask}
          isDraft={isDraft}
        />
        <MaterialUpdate
          materialsValue={materialsValue}
          handleMaterialChange={handleMaterialChange}
          material={material}
          editingTask={editingTask}
        />
        <RemindUpdate
          remindValue={remindValue}
          handleSelectRemind={handleSelectRemind}
          editingTask={editingTask}
        />
        <RepeatUpdate
          repeatValue={repeatValue}
          handleSelectRepeat={handleSelectRepeat}
          editingTask={editingTask}
          startDate={startDate}
          endDate={endDate}
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          initialSelectedDays={initialSelectedDays}
          setInitialSelectedDays={setInitialSelectedDays}
          form={form}
        />
        {editingTask?.status === "Từ chối" ? (
          <IsImportantUpdate
            editingTask={editingTask}
            importantValue={importantValue}
            handleSelectImportant={handleSelectImportant}
          />
        ) : null}
      </div>
    </>
  );
}

export default UpdateSpecificAnimal;
