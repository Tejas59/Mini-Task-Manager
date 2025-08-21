"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import CommonTaskModal from "./CommonTaskModel";
import type { Task } from "../interface/task.interface";
import { useNavigate } from "react-router-dom";

const TaskTable = () => {
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  const [data, setData] = useState<Task[] | null>(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const fetchData = useCallback(async () => {
    const response = await axios.get(
      `http://localhost:8080/api/task/${userId}`,
      { withCredentials: true }
    );
    const tasks: Task[] = response.data;

    setData(tasks);
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, openAddModal, openEditModal]);
  console.log({ data });
  const deleteTask = async (taskId: string) => {
    await axios.delete(`http://localhost:8080/api/task/delete/${taskId}`, {
      withCredentials: true,
    });
    await fetchData();
  };

  return (
    <div>
      <div className="h-[80px] w-full bg-gray-400 px-6 flex items-center justify-between">
        <button
          onClick={() => setOpenAddModal(true)}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          + Add Task
        </button>
        <button
          onClick={async () => {
            await axios.get("http://localhost:8080/api/auth/logout");
            localStorage.clear();
            navigate("/");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
        >
          Log out
        </button>
      </div>
      <div>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 bg-gray-50">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Edit</th>
              <th className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((taskObj) => (
              <tr key={taskObj._id} className="bg-gray-100 border-b">
                <td className="px-6 py-4">{taskObj.title}</td>
                <td className="px-6 py-4">{taskObj.description}</td>
                <td className="px-6 py-4">{taskObj.status}</td>

                <td
                  className="px-6 py-4 text-blue-600 cursor-pointer"
                  onClick={() => {
                    setSelectedTask(taskObj);
                    setOpenEditModal(true);
                  }}
                >
                  Edit
                </td>
                <td
                  className="px-6 py-4 text-red-600 cursor-pointer"
                  onClick={() => deleteTask(taskObj._id as string)}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <CommonTaskModal setOpenModal={setOpenAddModal} title="New Task" />
        </div>
      )}
      {openEditModal && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <CommonTaskModal
            setOpenModal={setOpenEditModal}
            title="Edit Task"
            task={selectedTask}
          />
        </div>
      )}
    </div>
  );
};

export default TaskTable;
