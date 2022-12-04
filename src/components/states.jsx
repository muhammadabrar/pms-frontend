import React from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const States = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between">
        <div className=" bg-white shadow rounded-xl w-full mr-6">
          <a
            href="#"
            className="flex p-4 items-start justify-between border-b pb-2 border-gray-700"
          >
            <div>
              <h1 className="text-3xl text-black font-bold">12</h1>
              <p className="font-bold text-sm text-gray-500">Employees</p>
            </div>
            <div className="p-4 mr-4 rounded-full bg-purple-100 text-purple ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
          </a>

          <div className="py-2 px-4 text-end">
            <a href="#" className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Employee
            </a>
          </div>
        </div>
        <div className=" bg-white shadow rounded-xl w-full mr-6">
          <div className="flex p-4 items-start justify-between border-b pb-2 border-gray-700">
            <div>
              <h1 className="text-3xl text-black font-bold">10</h1>
              <p className="font-bold text-sm text-gray-500">emploayes</p>
            </div>
            <div className="p-4 mr-4 rounded-full bg-brown-100 text-brown ">
              <AssignmentIcon />
            </div>
          </div>

          <div className="py-2 px-4 text-end">
            <a href="#" className="inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Task
            </a>
          </div>
        </div>
        <div className=" bg-white shadow rounded-xl w-full mr-4">
          <div className="flex p-4 items-start justify-between border-b pb-2 border-gray-700">
            <div>
              <h1 className="text-3xl text-black font-bold">05</h1>
              <p className="font-bold text-sm text-gray-500">Managers</p>
            </div>
            <div className="p-4 mr-4 rounded-full bg-green-100 text-green ">
            <AssignmentIndIcon/>
            </div>
          </div>

          <div className="py-2 px-4 text-end">
            <a href="#" className="inline-flex">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Add Managers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default States;
