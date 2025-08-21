import { useState } from "react";
import type { Task } from "../interface/task.interface";
import axios from "axios";

const CommonTaskModal: React.FC<{
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  task?: Task;
  title: string;
}> = ({ setOpenModal, title, task }) => {
  const userId = localStorage.getItem("id");
  const [addTaskObj, setAddtaskObj] = useState<Task>(
    task || {
      description: "",
      status: "Pending",
      title: "",
    }
  );
  const [openTaskTypeOption, setOpenTaskTypeOption] = useState<boolean>(false);

  const allMandatoryFieldSelect =
    addTaskObj.description.trim() !== "" &&
    addTaskObj.status &&
    addTaskObj.title.trim() !== "";

  const handleSaveTaskClick = async () => {
    try {
      if (task) {
        const res = await axios.put(
          `http://localhost:8080/api/task/update/${task._id}`,
          {
            title: addTaskObj.title,
            status: addTaskObj.status,
            description: addTaskObj.description,
            userId: userId,
          },
          { withCredentials: true }
        );

        setOpenModal(false);

        console.log("Edited:", res.data);
      } else {
        const res = await axios.post(
          `http://localhost:8080/api/task/add`,
          {
            title: addTaskObj.title,
            status: addTaskObj.status,
            description: addTaskObj.description,
            userId: userId,
          },
          { withCredentials: true }
        );
        setOpenModal(false);
        console.log("Added:", res.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="h-fit w-[25rem] bg-gray-50  p-[30px]">
      <div className=" h-[40px] items-center text-black  font-medium text-xl py-2">
        {title}
      </div>
      <div className="mt-2">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="titlename"
            type="text"
            placeholder="Enter Entity name"
            value={addTaskObj.title}
            onChange={(e) => {
              setAddtaskObj((prev) => ({ ...prev, title: e.target.value }));
            }}
          />
        </div>

        <div className="mb-4 relative w-full">
          <button
            id="dropdownDefaultButton"
            type="button"
            className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 justify-between"
            onClick={() => setOpenTaskTypeOption(!openTaskTypeOption)}
          >
            {addTaskObj.status || "Task Type"}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {openTaskTypeOption && (
            <div
              id="dropdown"
              className="absolute top-full left-0 z-50 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-full dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <div
                    onClick={() => {
                      setAddtaskObj((prev) => ({
                        ...prev,
                        status: "Compeleted",
                      }));
                      setOpenTaskTypeOption(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Completed
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      setAddtaskObj((prev) => ({ ...prev, status: "Pending" }));
                      setOpenTaskTypeOption(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Pending
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Description
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes"
            placeholder="Enter description here"
            rows={4}
            value={addTaskObj.description}
            onChange={(e) => {
              setAddtaskObj((prev) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => {
            setOpenModal(false);
          }}
          type="button"
          className="h-[40px] items-center justify-centerfont-medium text-sm px-4 py-2 focus:outline-none hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700  text-black "
        >
          Cancel
        </button>
        <button
          disabled={!allMandatoryFieldSelect}
          onClick={handleSaveTaskClick}
          type="button"
          className="h-[40px] items-center justify-centerfont-medium text-sm px-4 py-2 focus:outline-none hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700  text-black "
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CommonTaskModal;
