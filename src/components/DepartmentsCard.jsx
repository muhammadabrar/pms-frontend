import React from "react";
import AddIcon from "@mui/icons-material/Add";
import DepartmentCard from "./DepartmentCard";
const DepartmentsCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Departments</h1>
        <button className="p-2 flex hover:bg-purple-600 hover:text-white rounded font-medium bg-purple-100 text-purple">
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
          </svg>{" "}
          Add Department
        </button>
      </div>
      <div className="card-body">
        <div className="grid gap-4 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
          <DepartmentCard />
        </div>
      </div>
    </div>
  );
};

export default DepartmentsCard;
