import React from "react";
import AreaByFarmUpdate from "../FormItemUpdate/AreaByFarmUpdate";
import ZoneByAreaUpdate from "../FormItemUpdate/ZoneByAreaUpdate";
import FieldOtherUpdate from "../FormItemUpdate/FieldOtherUpdate";
import AddressDetailUpdate from "../FormItemUpdate/AddressDetailUpdate";
import NameTaskUpdate from "../FormItemUpdate/NameTaskUpdate";
import TaskTypeActiveUpdate from "../FormItemUpdate/TaskTypeActiveUpdate";
import SupervisorUpdate from "../FormItemUpdate/SupervisorUpdate";
import MaterialUpdate from "../FormItemUpdate/MaterialUpdate";
import PriorityUpdate from "../FormItemUpdate/PriorityUpdate";
import RemindUpdate from "../FormItemUpdate/RemindUpdate";
import RepeatUpdate from "../FormItemUpdate/RepeatUpdate.jsx";
import DateUpdate from "../FormItemUpdate/DateUpdate";
import DescriptionUpdate from "../FormItemUpdate/DescriptionUpdate";
import IsImportantUpdate from "../FormItemUpdate/IsImportantUpdate";

function UpdateTaskTypeOther({
  editingTask,
  handleSelectAreaChange,
  handleSelectZoneChange,
  handleSelectFieldChange,
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
  areaByFarm,
  zoneByArea,
  fieldByZone,
  addressDetail,
  setAddressDetail,
  priorityValue,
  nameValue,
  supervisorValue,
  description,
  taskTypeActive,
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
}) {
  return (
    <>
      <div className="form-left">
        <AreaByFarmUpdate
          handleSelectAreaChange={handleSelectAreaChange}
          areaByFarm={areaByFarm}
          editingTask={editingTask}
        />
        <ZoneByAreaUpdate
          handleSelectZoneChange={handleSelectZoneChange}
          zoneByArea={zoneByArea}
          editingTask={editingTask}
        />
        <FieldOtherUpdate
          handleSelectFieldChange={handleSelectFieldChange}
          fieldByZone={fieldByZone}
          editingTask={editingTask}
        />
        <AddressDetailUpdate
          addressDetail={addressDetail}
          setAddressDetail={setAddressDetail}
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
        <TaskTypeActiveUpdate
          taskTypeActive={taskTypeActive}
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

export default UpdateTaskTypeOther;
