import React, { useEffect, useState } from "react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import { Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getZoneByAreaAnimal } from "features/slice/zone/zoneAnimalSlice";
import { getZoneByAreaPlant } from "features/slice/zone/zonePlantSlice";
import { getFieldByZone } from "features/slice/field/fieldByZoneSlice";
import { getTaskTypeLivestock } from "features/slice/task/taskTypeAnimalSlice";
import { getTaskTypePlant } from "features/slice/task/taskTypePlantSlice";
import { getSupervisor } from "features/slice/supervisor/supervisorSlice";
import { getAnimalActive } from "features/slice/animal/animalSlice";
import { getPlantActive } from "features/slice/plant/plantSlice";
import { createTaskDraft, createTaskToDo } from "features/slice/task/taskSlice";
import { getMemberById } from "features/slice/user/memberSlice";
import { authServices } from "services/authServices";
import SpecificAnimal from "./components/specificAnimal";
import WholeBarn from "./components/wholeBarn";
import SpecificPlant from "./components/specificPlant";
import WholeGarden from "./components/wholeGarden";
import { getMaterialActiveByFarmId } from "features/slice/material/materialActiveByFarmSlice";
import { getAreaWithZoneTypeLivestock } from "features/slice/area/areaLivestockWithZoneSlice";
import { getAreaWithZoneTypePlant } from "features/slice/area/areaPlantWithZoneSlice";
import OtherTaskType from "./components/OtherTaskType";
import { getAreaActiveByFarmId } from "features/slice/area/areaByFarmSlice";
import { getZoneByAreaId } from "features/slice/zone/zoneByAreaSlice";
import { getTaskTypeActiveOther } from "features/slice/task/taskTypeOtherSlice";

dayjs.extend(customParseFormat);

function ThirdModal({
  loadDataTask,
  option,
  onTaskAdded,
  onDateChange,
  handleCloseModal,
  handleIsDraft,
  handleIsTaskToDo,
  handleIsDraftOther,
  handleIsTaskOtherToDo,
  isDraft,
  setIsCreatingTask,
}) {
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [supervisorValue, setSupervisorValue] = useState(0);
  const [repeatValue, setRepeatValue] = useState(false);
  const [selectedTaskTypeId, setSelectedTaskTypeId] = useState(0);
  const [plantValue, setPlantValue] = useState(0);
  const [livestockValue, setLivestockValue] = useState(0);
  const [addressDetail, setAddressDetail] = useState(null);
  const [remindValue, setRemindValue] = useState(0);
  const [materialsValue, setMaterialsValue] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [shouldCheckRepeat, setShouldCheckRepeat] = useState(true);
  const [clearSelectedDays, setClearSelectedDays] = useState(false);

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const member = useSelector((state) => state.member.data);

  const farmId = member?.farmId;

  const areaByFarm = useSelector((state) => state.areaByFarm.data);

  const areaLivestockByZone = useSelector(
    (state) => state.areaLivestockByZone.data
  );
  const areaPlantByZone = useSelector((state) => state.areaPlantByZone.data);

  const zoneByArea = useSelector((state) => state.zoneByArea.data);

  const zoneAnimal = useSelector((state) => state.zoneAnimal.data);

  const zonePlant = useSelector((state) => state.zonePlant.data);

  const animal = useSelector((state) => state.animal.data);
  const dataAnimal = animal?.data;

  const plant = useSelector((state) => state.plant.data);
  const dataPlant = plant?.data;

  const fieldByZone = useSelector((state) => state.fieldByZone.data);

  const taskTypeActiveOther = useSelector(
    (state) => state.taskTypeActiveOther.data
  );

  const taskTypeLivestock = useSelector(
    (state) => state.taskTypeLivestock.data
  );
  const dataTaskTypeLivestock = taskTypeLivestock?.data;

  const taskTypePlant = useSelector((state) => state.taskTypePlant.data);
  const dataTaskTypePlant = taskTypePlant?.data;

  const supervisor = useSelector((state) => state.supervisor.data);

  const material = useSelector((state) => state.materialActive.data);

  useEffect(() => {
    dispatch(getAreaActiveByFarmId(farmId));
    dispatch(getAreaWithZoneTypeLivestock(farmId));
    dispatch(getAreaWithZoneTypePlant(farmId));
    dispatch(getTaskTypeActiveOther());
    dispatch(getTaskTypeLivestock());
    dispatch(getTaskTypePlant());
    dispatch(getSupervisor(farmId));
    dispatch(getMaterialActiveByFarmId(farmId));
    dispatch(getMemberById(authServices.getUserId()));
  }, [farmId]);

  useEffect(() => {
    if (selectedAreaId) {
      dispatch(getZoneByAreaId(selectedAreaId));
      dispatch(getZoneByAreaAnimal(selectedAreaId));
      dispatch(getZoneByAreaPlant(selectedAreaId));
    }
  }, [selectedAreaId]);

  useEffect(() => {
    if (selectedZoneId) {
      dispatch(getFieldByZone(selectedZoneId));
    }
  }, [selectedZoneId]);

  useEffect(() => {
    if (selectedFieldId) {
      dispatch(getAnimalActive(selectedFieldId));
      dispatch(getPlantActive(selectedFieldId));
    }
  }, [selectedFieldId]);

  useEffect(() => {
    if (endDate && startDate && startDate.isAfter(endDate)) {
      form.setFieldsValue({
        endDate: null,
        dates: null,
      });
    }
  }, [startDate, endDate]);

  const handleSelectAreaChange = (value) => {
    setSelectedAreaId(value);
    setSelectedZoneId(value);
    setSelectedFieldId(value);
    form.setFieldsValue({
      zoneId: null,
      fieldId: null,
      liveStockId: null,
      plantId: null,
    });
  };

  const handleSelectZoneChange = (value) => {
    setSelectedZoneId(value);
    setSelectedFieldId(value);
    form.setFieldsValue({
      fieldId: null,
      liveStockId: null,
      plantId: null,
    });
  };

  const handleSelectFieldChange = (value) => {
    setSelectedFieldId(value);
    form.setFieldsValue({
      liveStockId: null,
      plantId: null,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSelectStartDate = (date) => {
    setStartDate(date);
  };

  const handleSelectEndDate = (date) => {
    const selectedDate = dayjs(date).second(0);
    setEndDate(selectedDate);
    setSelectedDays([])

    const startDate = form.getFieldValue("startDate");
    if (selectedDate.isAfter(startDate)) {
      form.setFieldsValue({ endDate: selectedDate });
      form.setFields([
        {
          name: "endDate",
          errors: [],
        },
      ]);
      const repeatDates = form.getFieldValue("dates");
      if (
        repeatDates &&
        repeatDates.some((date) => selectedDate.isAfter(dayjs(date)))
      ) {
        form.setFieldsValue({ dates: null });
      }
      form.setFields([
        {
          name: "dates",
          value: form.getFieldValue("dates"),
          errors: [],
        },
      ]);
    } else {
      form.setFieldsValue({ endDate: null });
      form.setFields([
        {
          name: "endDate",
          errors: ["Vui lòng chọn lại"],
        },
      ]);
      form.setFieldsValue({ dates: null });
      form.setFields([
        {
          name: "dates",
          value: form.getFieldValue("dates"),
          errors: ["Không thể chọn ngày lặp"],
        },
      ]);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriorityChange = (value) => {
    setPriorityValue(value);
  };

  const handleSupervisorValue = (value) => {
    setSupervisorValue(value);
  };

  const handleTaskTypeChange = (value) => {
    setSelectedTaskTypeId(value);
  };

  const handlePlantValue = (value) => {
    setPlantValue(value);
  };

  const handleLivestockValue = (value) => {
    setLivestockValue(value);
  };

  const handleMaterialChange = (value) => {
    setMaterialsValue(value);
  };

  const handleSelectRemind = (value) => {
    setRemindValue(parseInt(value, 10));
  };

  const handleSelectRepeat = (value) => {
    setRepeatValue(value === "Có");
    setShouldCheckRepeat(value === "Có");
  };

  const handleAddressDetail = (e) => {
    setAddressDetail(e.target.value);
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const transformData = (originalData) => {
    const transformedData = {
      materialIds: originalData.materialIds,
      dates: originalData.dates,
      farmTask: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        supervisorId: originalData.supervisorId,
        managerId: originalData.managerId,
        fieldId: originalData.fieldId,
        isRepeat: originalData.isRepeat,
        taskTypeId: originalData.taskTypeId,
        plantId: originalData.plantId,
        liveStockId: originalData.liveStockId,
        remind: originalData.remind,
        addressDetail: originalData.addressDetail,
        isPlant: originalData.isPlant,
        isSpecific: originalData.isSpecific,
      },
    };

    return transformedData;
  };

  const handleCreateTaskToDo = (values) => {
    form
      .validateFields()
      .then(() => {
        setIsCreatingTask(true);
        const startDateFormatted = dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");
        const endDateFormatted = dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");

        const remindValueToSend = remindValue || 0;

        const repeatValueToSend = repeatValue || false;

        const materialToSend = materialsValue || [];

        if (
          shouldCheckRepeat &&
          repeatValueToSend &&
          (!selectedDays || selectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dates",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const finalValues = {
          ...values,
          name: name,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          description: description,
          priority: priorityValue,
          supervisorId: supervisorValue,
          managerId: member.id,
          fieldId: selectedFieldId,
          isRepeat: repeatValueToSend,
          taskTypeId: selectedTaskTypeId,
          plantId: plantValue,
          liveStockId: livestockValue,
          addressDetail: addressDetail,
          remind: remindValueToSend,
          dates: selectedDays,
          materialIds: materialToSend,
          isPlant:
            option === "specificPlant" || option === "wholeGarden"
              ? true
              : false,
          isSpecific:
            option === "specificAnimal" || option === "specificPlant"
              ? true
              : false,
        };

        const transformedValues = transformData(finalValues);

        dispatch(createTaskToDo(transformedValues)).then(() => {
          loadDataTask();
          onDateChange();
          onTaskAdded();
          handleCloseModal();
          setIsCreatingTask(false);
        });
      })
      .catch((errorInfo) => {
        setIsCreatingTask(false);
      });
    handleCloseModal();
  };

  const handleCreateDraft = (values) => {
    form
      .validateFields()
      .then(() => {
        setIsCreatingTask(true);
        const startDateFormatted = dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");
        const endDateFormatted = dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");

        const startDateToSend = startDate ? startDateFormatted : null;
        const endDateToSend = endDate ? endDateFormatted : null;

        const remindValueToSend = remindValue || 0;

        const repeatValueToSend = repeatValue || false;

        const materialToSend = materialsValue || [];

        if (
          shouldCheckRepeat &&
          repeatValueToSend &&
          (!selectedDays || selectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dates",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const finalValues = {
          ...values,
          name: name,
          startDate: startDateToSend,
          endDate: endDateToSend,
          description: description,
          priority: priorityValue,
          supervisorId: supervisorValue,
          managerId: member.id,
          fieldId: selectedFieldId,
          isRepeat: repeatValueToSend,
          taskTypeId: selectedTaskTypeId,
          plantId: plantValue,
          liveStockId: livestockValue,
          addressDetail: addressDetail,
          remind: remindValueToSend,
          dates: selectedDays,
          materialIds: materialToSend,
          isPlant:
            option === "specificPlant" || option === "wholeGarden"
              ? true
              : false,
          isSpecific:
            option === "specificAnimal" || option === "specificPlant"
              ? true
              : false,
        };

        const transformedValues = transformData(finalValues);

        dispatch(createTaskDraft(transformedValues)).then(() => {
          loadDataTask();
          onDateChange();
          onTaskAdded();
          handleCloseModal();
          setIsCreatingTask(false);
        });
      })
      .catch((errorInfo) => {
        setIsCreatingTask(false);
      });
  };

  const handleFormSubmit = () => {
    if (isDraft) {
      handleCreateDraft();
    } else {
      handleCreateTaskToDo();
    }
  };

  const transformDataOther = (originalData) => {
    const transformedData = {
      materialIds: originalData.materialIds,
      dates: originalData.dates,
      farmTask: {
        name: originalData.name,
        startDate: originalData.startDate,
        endDate: originalData.endDate,
        description: originalData.description,
        priority: originalData.priority,
        supervisorId: originalData.supervisorId,
        managerId: originalData.managerId,
        fieldId: originalData.fieldId,
        isRepeat: originalData.isRepeat,
        taskTypeId: originalData.taskTypeId,
        plantId: originalData.plantId,
        liveStockId: originalData.liveStockId,
        remind: originalData.remind,
        addressDetail: originalData.addressDetail,
        areaId: originalData.areaId,
        zoneId: originalData.zoneId,
        isPlant: originalData.isPlant,
        isSpecific: originalData.isSpecific,
      },
    };

    return transformedData;
  };

  const handleCreateTaskOtherToDo = (values) => {
    form
      .validateFields()
      .then(() => {
        setIsCreatingTask(true);
        const startDateFormatted = dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");
        const endDateFormatted = dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");

        const remindValueToSend = remindValue || 0;

        const repeatValueToSend = repeatValue || false;

        const materialToSend = materialsValue || [];

        if (
          shouldCheckRepeat &&
          repeatValueToSend &&
          (!selectedDays || selectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dates",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const area = areaByFarm.data
          ? areaByFarm.data.find((area) => area.id === selectedAreaId)
          : null;
        const zone = zoneByArea.data
          ? zoneByArea.data.find((zone) => zone.id === selectedZoneId)
          : null;
        const field = fieldByZone.data
          ? fieldByZone.data.find((field) => field.id === selectedFieldId)
          : null;

        const areaName = area ? area.name : null;
        const zoneName = zone ? zone.name : null;
        const fieldName = field ? field.nameCode : null;

        const formattedAddress = `${
          areaName
            ? areaName + (zoneName || fieldName || addressDetail ? ", " : "")
            : ""
        }${
          zoneName ? zoneName + (fieldName || addressDetail ? ", " : "") : ""
        }${fieldName ? fieldName + (addressDetail ? ", " : "") : ""}${
          addressDetail ? addressDetail : ""
        }`;

        const finalValues = {
          ...values,
          name: name,
          startDate: startDateFormatted,
          endDate: endDateFormatted,
          description: description,
          priority: priorityValue,
          supervisorId: supervisorValue,
          managerId: member.id,
          fieldId: null,
          isRepeat: repeatValueToSend,
          taskTypeId: selectedTaskTypeId,
          plantId: plantValue,
          liveStockId: livestockValue,
          remind: remindValueToSend,
          dates: selectedDays,
          materialIds: materialToSend,
          addressDetail: formattedAddress,
          areaId: null,
          zoneId: null,
          isPlant: null,
          isSpecific: false,
        };

        const transformedValues = transformDataOther(finalValues);

        dispatch(createTaskToDo(transformedValues)).then(() => {
          loadDataTask();
          onDateChange();
          onTaskAdded();
          handleCloseModal();
          setIsCreatingTask(false);
        });
      })
      .catch((errorInfo) => {
        setIsCreatingTask(false);
      });
  };

  const handleCreateTaskOtherDraft = (values) => {
    form
      .validateFields()
      .then(() => {
        setIsCreatingTask(true);
        const startDateFormatted = dayjs(startDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");
        const endDateFormatted = dayjs(endDate)
          .second(0)
          .format("YYYY-MM-DD[T]HH:mm:ss");

        const startDateToSend = startDate ? startDateFormatted : null;
        const endDateToSend = endDate ? endDateFormatted : null;

        const remindValueToSend = remindValue || 0;

        const repeatValueToSend = repeatValue || false;

        const materialToSend = materialsValue || [];

        if (
          shouldCheckRepeat &&
          repeatValueToSend &&
          (!selectedDays || selectedDays.length === 0)
        ) {
          form.setFields([
            {
              name: "dates",
              errors: ["Vui lòng chọn ngày lặp lại"],
            },
          ]);
          return;
        }

        const area = areaByFarm.data
          ? areaByFarm.data.find((area) => area.id === selectedAreaId)
          : null;
        const zone = zoneByArea.data
          ? zoneByArea.data.find((zone) => zone.id === selectedZoneId)
          : null;
        const field = fieldByZone.data
          ? fieldByZone.data.find((field) => field.id === selectedFieldId)
          : null;

        const areaName = area ? area.name : null;
        const zoneName = zone ? zone.name : null;
        const fieldName = field ? field.nameCode : null;

        const formattedAddress = `${areaName ? areaName + ", " : ""}${
          zoneName ? zoneName + ", " : ""
        }${fieldName ? fieldName + ", " : ""}${
          addressDetail ? addressDetail.trim() : ""
        }`;

        const addressToSend =
          formattedAddress.trim() !== "" ? formattedAddress : "";

        const finalValues = {
          ...values,
          name: name,
          startDate: startDateToSend,
          endDate: endDateToSend,
          description: description,
          priority: priorityValue,
          supervisorId: supervisorValue,
          managerId: member.id,
          fieldId: selectedFieldId,
          isRepeat: repeatValueToSend,
          taskTypeId: selectedTaskTypeId,
          plantId: plantValue,
          liveStockId: livestockValue,
          remind: remindValueToSend,
          dates: selectedDays,
          materialIds: materialToSend,
          addressDetail: addressToSend,
          areaId: null,
          zoneId: null,
          isPlant: null,
          isSpecific: false,
        };

        const transformedValues = transformDataOther(finalValues);

        dispatch(createTaskDraft(transformedValues)).then(() => {
          loadDataTask();
          onDateChange();
          onTaskAdded();
          handleCloseModal();
          setIsCreatingTask(false);
        });
      })
      .catch((errorInfo) => {
        setIsCreatingTask(false);
      });
  };

  const handleFormOtherSubmit = () => {
    if (isDraft) {
      handleCreateTaskOtherDraft();
    } else {
      handleCreateTaskOtherToDo();
    }
  };

  if (option === "other") {
    return (
      <OtherTaskType
        handleIsDraftOther={handleIsDraftOther}
        handleIsTaskOtherToDo={handleIsTaskOtherToDo}
        handleFormOtherSubmit={handleFormOtherSubmit}
        isDraft={isDraft}
        selectedAreaId={selectedAreaId}
        handleSelectAreaChange={handleSelectAreaChange}
        handleSelectZoneChange={handleSelectZoneChange}
        handleSelectFieldChange={handleSelectFieldChange}
        handleAddressDetail={handleAddressDetail}
        handleNameChange={handleNameChange}
        handleSelectStartDate={handleSelectStartDate}
        handleSelectEndDate={handleSelectEndDate}
        handleDescriptionChange={handleDescriptionChange}
        handlePriorityChange={handlePriorityChange}
        handleSupervisorValue={handleSupervisorValue}
        handleTaskTypeChange={handleTaskTypeChange}
        handleMaterialChange={handleMaterialChange}
        handleSelectRemind={handleSelectRemind}
        handleSelectRepeat={handleSelectRepeat}
        form={form}
        areaByFarm={areaByFarm}
        zoneByArea={zoneByArea}
        fieldByZone={fieldByZone}
        addressDetail={addressDetail}
        supervisor={supervisor}
        material={material}
        name={name}
        startDate={startDate}
        endDate={endDate}
        description={description}
        priorityValue={priorityValue}
        supervisorValue={supervisorValue}
        selectedFieldId={selectedFieldId}
        taskTypeActiveOther={taskTypeActiveOther}
        plantValue={plantValue}
        livestockValue={livestockValue}
        materialsValue={materialsValue}
        remindValue={remindValue}
        repeatValue={repeatValue}
        disabledDate={disabledDate}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    );
  } else if (option === "specificAnimal") {
    return (
      <SpecificAnimal
        handleIsDraft={handleIsDraft}
        handleIsTaskToDo={handleIsTaskToDo}
        handleFormSubmit={handleFormSubmit}
        isDraft={isDraft}
        selectedAreaId={selectedAreaId}
        handleSelectAreaChange={handleSelectAreaChange}
        handleSelectZoneChange={handleSelectZoneChange}
        handleSelectFieldChange={handleSelectFieldChange}
        handleNameChange={handleNameChange}
        handleSelectStartDate={handleSelectStartDate}
        handleSelectEndDate={handleSelectEndDate}
        handleDescriptionChange={handleDescriptionChange}
        handlePriorityChange={handlePriorityChange}
        handleSupervisorValue={handleSupervisorValue}
        handleTaskTypeChange={handleTaskTypeChange}
        handleLivestockValue={handleLivestockValue}
        handleMaterialChange={handleMaterialChange}
        handleSelectRemind={handleSelectRemind}
        handleSelectRepeat={handleSelectRepeat}
        form={form}
        areaLivestockByZone={areaLivestockByZone}
        zoneAnimal={zoneAnimal}
        fieldByZone={fieldByZone}
        dataAnimal={dataAnimal}
        name={name}
        startDate={startDate}
        endDate={endDate}
        description={description}
        priorityValue={priorityValue}
        supervisorValue={supervisorValue}
        selectedFieldId={selectedFieldId}
        dataTaskTypeLivestock={dataTaskTypeLivestock}
        livestockValue={livestockValue}
        materialsValue={materialsValue}
        remindValue={remindValue}
        repeatValue={repeatValue}
        supervisor={supervisor}
        material={material}
        disabledDate={disabledDate}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    );
  } else if (option === "wholeBarn") {
    return (
      <WholeBarn
        handleIsDraft={handleIsDraft}
        handleIsTaskToDo={handleIsTaskToDo}
        handleFormSubmit={handleFormSubmit}
        isDraft={isDraft}
        selectedAreaId={selectedAreaId}
        handleSelectAreaChange={handleSelectAreaChange}
        handleSelectZoneChange={handleSelectZoneChange}
        handleSelectFieldChange={handleSelectFieldChange}
        handleNameChange={handleNameChange}
        handleSelectStartDate={handleSelectStartDate}
        handleSelectEndDate={handleSelectEndDate}
        handleDescriptionChange={handleDescriptionChange}
        handlePriorityChange={handlePriorityChange}
        handleSupervisorValue={handleSupervisorValue}
        handleTaskTypeChange={handleTaskTypeChange}
        handleLivestockValue={handleLivestockValue}
        handleMaterialChange={handleMaterialChange}
        handleSelectRemind={handleSelectRemind}
        handleSelectRepeat={handleSelectRepeat}
        form={form}
        areaLivestockByZone={areaLivestockByZone}
        zoneAnimal={zoneAnimal}
        fieldByZone={fieldByZone}
        dataAnimal={dataAnimal}
        name={name}
        startDate={startDate}
        endDate={endDate}
        description={description}
        priorityValue={priorityValue}
        supervisorValue={supervisorValue}
        selectedFieldId={selectedFieldId}
        dataTaskTypeLivestock={dataTaskTypeLivestock}
        materialsValue={materialsValue}
        remindValue={remindValue}
        repeatValue={repeatValue}
        supervisor={supervisor}
        material={material}
        disabledDate={disabledDate}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    );
  } else if (option === "specificPlant") {
    return (
      <SpecificPlant
        handleIsDraft={handleIsDraft}
        handleIsTaskToDo={handleIsTaskToDo}
        handleFormSubmit={handleFormSubmit}
        isDraft={isDraft}
        selectedAreaId={selectedAreaId}
        handleSelectAreaChange={handleSelectAreaChange}
        handleSelectZoneChange={handleSelectZoneChange}
        handleSelectFieldChange={handleSelectFieldChange}
        handleNameChange={handleNameChange}
        handleSelectStartDate={handleSelectStartDate}
        handleSelectEndDate={handleSelectEndDate}
        handleDescriptionChange={handleDescriptionChange}
        handlePriorityChange={handlePriorityChange}
        handleSupervisorValue={handleSupervisorValue}
        handleTaskTypeChange={handleTaskTypeChange}
        handlePlantValue={handlePlantValue}
        handleMaterialChange={handleMaterialChange}
        handleSelectRemind={handleSelectRemind}
        handleSelectRepeat={handleSelectRepeat}
        form={form}
        areaPlantByZone={areaPlantByZone}
        zonePlant={zonePlant}
        fieldByZone={fieldByZone}
        name={name}
        startDate={startDate}
        endDate={endDate}
        description={description}
        priorityValue={priorityValue}
        supervisorValue={supervisorValue}
        selectedFieldId={selectedFieldId}
        dataTaskTypePlant={dataTaskTypePlant}
        plantValue={plantValue}
        dataPlant={dataPlant}
        materialsValue={materialsValue}
        remindValue={remindValue}
        repeatValue={repeatValue}
        supervisor={supervisor}
        material={material}
        disabledDate={disabledDate}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    );
  } else if (option === "wholeGarden") {
    return (
      <WholeGarden
        handleIsDraft={handleIsDraft}
        handleIsTaskToDo={handleIsTaskToDo}
        handleFormSubmit={handleFormSubmit}
        isDraft={isDraft}
        selectedAreaId={selectedAreaId}
        handleSelectAreaChange={handleSelectAreaChange}
        handleSelectZoneChange={handleSelectZoneChange}
        handleSelectFieldChange={handleSelectFieldChange}
        handleNameChange={handleNameChange}
        handleSelectStartDate={handleSelectStartDate}
        handleSelectEndDate={handleSelectEndDate}
        handleDescriptionChange={handleDescriptionChange}
        handlePriorityChange={handlePriorityChange}
        handleSupervisorValue={handleSupervisorValue}
        handleTaskTypeChange={handleTaskTypeChange}
        handlePlantValue={handlePlantValue}
        handleMaterialChange={handleMaterialChange}
        handleSelectRemind={handleSelectRemind}
        handleSelectRepeat={handleSelectRepeat}
        form={form}
        areaPlantByZone={areaPlantByZone}
        zonePlant={zonePlant}
        fieldByZone={fieldByZone}
        name={name}
        startDate={startDate}
        endDate={endDate}
        description={description}
        priorityValue={priorityValue}
        supervisorValue={supervisorValue}
        selectedFieldId={selectedFieldId}
        dataTaskTypePlant={dataTaskTypePlant}
        materialsValue={materialsValue}
        remindValue={remindValue}
        repeatValue={repeatValue}
        supervisor={supervisor}
        material={material}
        disabledDate={disabledDate}
        selectedDays={selectedDays}
        setSelectedDays={setSelectedDays}
      />
    );
  }
  return null;
}

export default ThirdModal;
