import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Menu, Popover, Skeleton } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  getTasks,
  deleteTask,
  refuseTask,
  changeStatusDoneToClose,
  changeStatusFromDoneToDoing,
  changeStatusToPendingAndCancel,
  changeStatusToDoing,
  createTaskClone,
  updateStatusFromToDoToDraft,
} from "features/slice/task/taskSlice";
import { getEffort } from "features/slice/effort/effortSlice";
import { taskTitle } from "./listTaskData";
import TaskDetail from "../TaskDetail";
import ModalTask from "../ModalTask";
import StatusTabs from "./components/StatusTabs";
import SearchComp from "./components/SearchComp";
import DateSelectionComp from "./components/DateSelection";
import Effort from "./components/Effort";
import TableTask from "./components/TableTask";
import CheckParent from "./components/CheckParent";
import UpdateTask from "./components/UpdateTask";
import ChangeDoneToDoing from "./components/ChangeDoneToDoing";
import ChangeDoingToPending from "./components/ChangeDoingToPendingAndCancel/ChangeDoingToPending";
import ViewReject from "../TaskDetail/ViewReject";
import ModalDelete from "./components/ModalDelete";
import ModalClose from "./components/ModalClose";
import ChangeStatusToCancel from "./components/ChangeStatusToCancel";
import CloneTask from "./components/CloneTask";
import Activity from "./components/Activity";
import { getActivityByTaskId } from "features/slice/activity/activitySlice";
import ModalReject from "./components/ModalReject";
import dayjs from "dayjs";
import ChangePendingToDoing from "./components/ChangePendingToDoing";
import ChangeToDoToDraft from "./components/ChangeToDoToDraft";

const List = () => {
  const [activity, setActivity] = useState([]);
  const [effort, setEffort] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [viewRejectModalVisible, setViewRejectModalVisible] = useState(false);
  const [editTaskModalVisible, setEditTaskModalVisible] = useState(false);
  const [activityModalVisible, setActivityModalVisible] = useState(false);
  const [effortVisible, setEffortVisible] = useState(false);
  const [cloneTaskModalVisible, setCloneTaskModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [closeModalVisible, setCloseModalVisible] = useState(false);
  const [pendingToDoingModalVisible, setPendingToDoingModalVisible] =
    useState(false);
  const [isImportant, setIsImportant] = useState(false);
  const [taskDoneToDoingVisible, setTaskDoneToDoingVisible] = useState(false);
  const [taskDoingToPendingModalVisible, setTaskDoingToPendingModalVisible] =
    useState(false);
  const [toDoToDraftModalVisible, setToDoToDraftModalVisible] = useState(false);
  const [taskToCancelModalVisible, setTaskToCancelModalVisible] =
    useState(false);
  const [description, setDescription] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [currentTaskId, setCurrentTaskId] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [taskNameSearch, setTaskNameSearch] = useState("");
  const [statusForEdit, setStatusForEdit] = useState(null);
  const [checkTaskParent, setCheckTaskParent] = useState(1);
  const [checkChangeToToDo, setCheckChangeToToDo] = useState(1);
  const [currentStep, setCurrentStep] = useState(-1);
  const [fileList, setFileList] = useState([]);
  const [deadlineForDone, setDeadlineForDone] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const [form] = Form.useForm();

  const task = useSelector((state) => state.task.data);

  const dataTotalPages = useSelector((state) => state.task.totalPages);

  const isHaveSubTask = useSelector((state) => state.effort.isHaveSubTask);

  const loading = useSelector((state) => state.task.loading);

  const dispatch = useDispatch();

  const loadDataTask = () => {
    dispatch(
      getTasks({
        pageIndex,
        status,
        date: selectedDate,
        taskName: taskNameSearch,
        checkTaskParent: checkTaskParent,
      })
    );
  };

  useEffect(() => {
    loadDataTask();
  }, [
    dispatch,
    pageIndex,
    status,
    selectedDate,
    taskNameSearch,
    checkTaskParent,
  ]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleBackOtherTask = () => {
    setCurrentStep(currentStep - 2);
  };

  const handleCheckImportant = (e) => {
    setIsImportant(e.target.checked);
  };

  const handleCheckChange = (value) => {
    setCheckTaskParent(value);
  };

  const onChange = (pagination) => {
    setPageIndex(pagination.current);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const disabledDate = (current) => {
    const endDate = selectedTask.endDate;
    return (
      current && dayjs(current).startOf("day") < dayjs(endDate).startOf("day")
    );
  };

  const handleSelectDeadlineForDone = (date) => {
    setDeadlineForDone(date);
  };

  const handleMenuClick = (e, record) => {
    if (e.key === "edit") {
      openEditTaskModal(record);
      setCheckChangeToToDo(false);
    } else if (e.key === "pending") {
      openChangeDoingToPendingModal(record);
    } else if (e.key === "changeToToDo") {
      openEditTaskModal(record);
      setCheckChangeToToDo(true);
    } else if (e.key === "changeToDraft") {
      openToDoToDraftModal(record.id);
    } else if (e.key === "cancel") {
      openChangeStatusToCancelModal(record);
    } else if (e.key === "changeToDoing") {
      openPendingToDoingModal(record);
    } else if (e.key === "viewReject") {
      openViewRejectModal(record);
    } else if (e.key === "reAssign") {
      openEditTaskModal(record);
    } else if (e.key === "reject") {
      openRejectModal(record.id);
    } else if (e.key === "close") {
      openCloseModal(record.id);
    } else if (e.key === "clone") {
      openCloneTaskModal(record.id);
    } else if (e.key === "delete") {
      openDeleteModal(record.id);
    }
  };

  const openCloseModal = (record) => {
    setSelectedTask(record);
    setCloseModalVisible(true);
  };

  const closeCloseModal = () => {
    setSelectedTask(null);
    setCloseModalVisible(false);
  };

  const openToDoToDraftModal = (record) => {
    setSelectedTask(record);
    setToDoToDraftModalVisible(true);
  };

  const closeToDoToDraftModal = () => {
    setSelectedTask(null);
    setToDoToDraftModalVisible(false);
  };

  const openPendingToDoingModal = (record) => {
    setSelectedTask(record);
    setPendingToDoingModalVisible(true);
  };

  const closePendingToDoingModal = () => {
    setSelectedTask(null);
    setPendingToDoingModalVisible(false);
  };

  const openCloneTaskModal = (record) => {
    setSelectedTask(record);
    setCloneTaskModalVisible(true);
  };

  const closeCloneTaskModal = () => {
    setSelectedTask(null);
    setCloneTaskModalVisible(false);
  };

  const openRejectModal = (record) => {
    setSelectedTask(record);
    setRejectModalVisible(true);
  };

  const closeRejectModal = () => {
    setSelectedTask(null);
    setRejectModalVisible(false);
    setIsImportant(false);
  };

  const openDeleteModal = (record) => {
    setSelectedTask(record);
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setSelectedTask(null);
    setDeleteModalVisible(false);
  };

  const openModal = (record) => {
    setSelectedTask(record);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  const openChangeDoingToPendingModal = (record) => {
    setTaskDoingToPendingModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeChangeDoingToPendingModal = () => {
    setTaskDoingToPendingModalVisible(false);
  };

  const openChangeStatusToCancelModal = (record) => {
    setTaskToCancelModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeChangeStatusToCancelModal = () => {
    setTaskToCancelModalVisible(false);
  };

  const handleChangeToDoToDraft = (id) => {
    setIsSubmit(true);
    dispatch(updateStatusFromToDoToDraft(id)).then(() => {
      loadDataTask();
      setToDoToDraftModalVisible(false);
      setIsSubmit(false);
    });
  };

  const handleRefuseTask = (id) => {
    setIsSubmit(true);
    dispatch(refuseTask({ taskId: id, important: isImportant })).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
      setRejectModalVisible(false);
      setIsSubmit(false);
    });
    setModalVisible(false);
    setViewRejectModalVisible(false);
  };

  const handleChangeDoneToDoing = (id) => {
    dispatch(
      changeStatusFromDoneToDoing({
        taskId: id,
        date: deadlineForDone,
        body: description,
      })
    ).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
    });
    setTaskDoneToDoingVisible(false);
    setModalVisible(false);
  };

  const handleChangeDoingToPendingTask = (id) => {
    setIsSubmit(true);
    const descriptionValue = {
      description: description,
      imageFile: fileList[0],
    };
    dispatch(
      changeStatusToPendingAndCancel({
        taskId: id,
        status: 5,
        body: descriptionValue,
      })
    ).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
      setIsSubmit(false);
    });
    setTaskDoingToPendingModalVisible(false);
  };

  const handleChangeStatusToCancelTask = (id) => {
    setIsSubmit(true);
    const descriptionValue = {
      description: description,
      imageFile: fileList[0],
    };
    dispatch(
      changeStatusToPendingAndCancel({
        taskId: id,
        status: 7,
        body: descriptionValue,
      })
    ).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
      setIsSubmit(false);
    });
    setTaskToCancelModalVisible(false);
  };

  const handleChangePendingAndCancelToDoing = (id) => {
    setIsSubmit(true);
    dispatch(changeStatusToDoing(id)).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
      setIsSubmit(false);
      setPendingToDoingModalVisible(false);
    });
  };

  const handleCloneTask = (id) => {
    setIsSubmit(true);
    dispatch(createTaskClone(id)).then(() => {
      loadDataTask();
      setPageIndex(1);
      setCloneTaskModalVisible(false);
      setIsSubmit(false);
    });
  };

  const handleDelete = (id) => {
    setIsSubmit(true);
    dispatch(deleteTask(id)).then(() => {
      loadDataTask();
      setPageIndex(1);
      setDeleteModalVisible(false);
      setIsSubmit(false);
    });
  };

  const handleChangeDoneToCloseTask = (id) => {
    setIsSubmit(true);
    dispatch(changeStatusDoneToClose(id)).then(() => {
      loadDataTask();
      handleDateChange();
      handleTaskAdded();
      setCloseModalVisible(false);
      setIsSubmit(false);
    });
  };

  const openChangeDoneToDoingModal = (record) => {
    setTaskDoneToDoingVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeChangeDoneToDoingModal = () => {
    setTaskDoneToDoingVisible(false);
  };

  const openViewRejectModal = (record) => {
    setSelectedTask(record);
    setViewRejectModalVisible(true);
    setCurrentTaskId(record.id);
  };

  const closeViewRejectModal = () => {
    setSelectedTask(null);
    setViewRejectModalVisible(false);
    setIsImportant(false);
  };

  const openEditTaskModal = (record) => {
    setEditingTask(record);
    setEditTaskModalVisible(true);
    setCurrentTaskId(record.id);
    setViewRejectModalVisible(false);
  };

  const closeEditTaskModal = () => {
    setEditingTask(null);
    setEditTaskModalVisible(false);
    if (editingTask.status === "Từ chối" && selectedTask) {
      setViewRejectModalVisible(true);
    } else {
      return;
    }
  };

  const handleActivityModalVisible = () => {
    setActivityModalVisible(false);
  };

  const openActivityModal = (record) => {
    setCurrentTaskId(record.id);
    setActivityModalVisible(true);
    setEditingTask(record);
    dispatch(getActivityByTaskId(record.id)).then((data) => {
      setActivity(data.payload);
    });
    const isStatusEffort =
      record &&
      (record.status === "Hoàn thành" || record.status === "Không hoàn thành");
    setStatusForEdit(isStatusEffort);
  };

  const handleEffortVisible = () => {
    setEffortVisible(false);
  };

  const openEffortModal = (record) => {
    setCurrentTaskId(record.id);
    setEffortVisible(true);
    dispatch(getEffort(record.id)).then((data) => {
      setEffort(data.payload.data.subtasks);
    });
  };

  const handleTabChange = (key) => {
    setPageIndex(1);
    setStatus(Number(key));
  };

  const handleTaskAdded = () => {
    setPageIndex(1);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setPageIndex(1);
  };

  const handleSearchChange = (taskName) => {
    setTaskNameSearch(taskName);
    setPageIndex(1);
  };

  const menu = (
    <div style={{ margin: "10px" }}>
      <DateSelectionComp
        selectedDate={selectedDate}
        handleDateChange={handleDateChange}
      />
      <CheckParent onCheckChange={handleCheckChange} />
    </div>
  );

  return (
    <div className="list">
      <div className="list-header">
        <ModalTask
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onTaskAdded={handleTaskAdded}
          onDateChange={handleDateChange}
          loadDataTask={loadDataTask}
          handleBackOtherTask={handleBackOtherTask}
        />
        <div className="list-header-item-right">
          <Popover content={menu} trigger="click" arrow placement="bottom">
            <Button type="primary" className="button-filter">
              <FilterOutlined /> Lọc{" "}
            </Button>
          </Popover>
          <SearchComp handleSearchChange={handleSearchChange} />
        </div>
      </div>
      <div className="list-checkTask">
        <StatusTabs onTabChange={handleTabChange} />
      </div>
      {loading === true ? (
        <Skeleton active />
      ) : (
        <TableTask
          taskTitle={taskTitle}
          task={task}
          openModal={openModal}
          onChange={onChange}
          pageIndex={pageIndex}
          dataTotalPages={dataTotalPages}
          handleMenuClick={handleMenuClick}
          editingTask={editingTask}
          editTaskModalVisible={editTaskModalVisible}
          openViewRejectModal={openViewRejectModal}
          openEditTaskModal={openEditTaskModal}
          closeEditTaskModal={closeEditTaskModal}
          openActivityModal={openActivityModal}
          openEffortModal={openEffortModal}
          openCloneTaskModal={openCloneTaskModal}
          openRejectModal={openRejectModal}
          openDeleteModal={openDeleteModal}
          openCloseModal={openCloseModal}
          openChangeDoingToPendingModal={openChangeDoingToPendingModal}
          openChangeStatusToCancelModal={openChangeStatusToCancelModal}
          openToDoToDraftModal={openToDoToDraftModal}
          handleTaskAdded={handleTaskAdded}
          handleDateChange={handleDateChange}
          loadDataTask={loadDataTask}
          currentTaskId={currentTaskId}
        />
      )}
      <TaskDetail
        visible={modalVisible}
        onCancel={closeModal}
        taskData={selectedTask}
        closeEditTaskModal={closeEditTaskModal}
        openChangeDoneToDoingModal={openChangeDoneToDoingModal}
      />
      <CloneTask
        selectedTaskId={selectedTask}
        cloneTaskModalVisible={cloneTaskModalVisible}
        closeCloneTaskModal={closeCloneTaskModal}
        handleCloneTask={handleCloneTask}
        isSubmit={isSubmit}
      />
      <ModalReject
        selectedTaskId={selectedTask}
        rejectModalVisible={rejectModalVisible}
        closeRejectModal={closeRejectModal}
        handleRefuseTask={handleRefuseTask}
        isImportant={isImportant}
        handleCheckImportant={handleCheckImportant}
        isSubmit={isSubmit}
      />
      <ModalDelete
        selectedTaskId={selectedTask}
        deleteModalVisible={deleteModalVisible}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        isSubmit={isSubmit}
      />
      <ModalClose
        selectedTaskId={selectedTask}
        closeModalVisible={closeModalVisible}
        closeCloseModal={closeCloseModal}
        handleChangeDoneToCloseTask={handleChangeDoneToCloseTask}
        isSubmit={isSubmit}
      />
      <ViewReject
        viewRejectModalVisible={viewRejectModalVisible}
        closeViewRejectModal={closeViewRejectModal}
        taskData={selectedTask}
        handleRefuseTask={handleRefuseTask}
        openEditTaskModal={openEditTaskModal}
        selectedTask={selectedTask}
        isImportant={isImportant}
        handleCheckImportant={handleCheckImportant}
      />
      <UpdateTask
        editTaskModalVisible={editTaskModalVisible}
        closeEditTaskModal={closeEditTaskModal}
        key={editingTask ? editingTask.id : null}
        editingTask={editingTask}
        handleTaskAdded={handleTaskAdded}
        handleDateChange={handleDateChange}
        loadDataTask={loadDataTask}
        currentTaskId={currentTaskId}
        closeModal={closeModal}
        closeViewRejectModal={closeViewRejectModal}
        checkChangeToToDo={checkChangeToToDo}
      />
      <Activity
        activityModalVisible={activityModalVisible}
        handleActivityModalVisible={handleActivityModalVisible}
        activity={activity}
        editingTask={editingTask}
        statusForEdit={statusForEdit}
      />
      <Effort
        effortVisible={effortVisible}
        handleEffortVisible={handleEffortVisible}
        effort={effort}
        isHaveSubTask={isHaveSubTask}
      />
      <ChangeDoneToDoing
        selectedTask={selectedTask}
        taskDoneToDoingVisible={taskDoneToDoingVisible}
        closeChangeDoneToDoingModal={closeChangeDoneToDoingModal}
        handleChangeDoneToDoing={handleChangeDoneToDoing}
        description={description}
        handleDescription={handleDescription}
        disabledDate={disabledDate}
        handleSelectDeadlineForDone={handleSelectDeadlineForDone}
      />
      <ChangeDoingToPending
        currentTaskId={currentTaskId}
        handleChangeDoingToPendingTask={handleChangeDoingToPendingTask}
        closeChangeDoingToPendingModal={closeChangeDoingToPendingModal}
        taskDoingToPendingModalVisible={taskDoingToPendingModalVisible}
        description={description}
        handleDescription={handleDescription}
        fileList={fileList}
        onFileChange={onFileChange}
        isSubmit={isSubmit}
      />
      <ChangeStatusToCancel
        currentTaskId={currentTaskId}
        handleChangeStatusToCancelTask={handleChangeStatusToCancelTask}
        closeChangeStatusToCancelModal={closeChangeStatusToCancelModal}
        taskToCancelModalVisible={taskToCancelModalVisible}
        description={description}
        handleDescription={handleDescription}
        fileList={fileList}
        onFileChange={onFileChange}
        isSubmit={isSubmit}
      />
      <ChangePendingToDoing
        selectedTaskId={selectedTask}
        pendingToDoingModalVisible={pendingToDoingModalVisible}
        closePendingToDoingModal={closePendingToDoingModal}
        handleChangePendingAndCancelToDoing={
          handleChangePendingAndCancelToDoing
        }
        isSubmit={isSubmit}
      />
      <ChangeToDoToDraft
        selectedTaskId={selectedTask}
        toDoToDraftModalVisible={toDoToDraftModalVisible}
        closeToDoToDraftModal={closeToDoToDraftModal}
        handleChangeToDoToDraft={handleChangeToDoToDraft}
        isSubmit={isSubmit}
      />
    </div>
  );
};

export default List;
