import React from "react";
import EmployeeCard from "./EmployeeCard";

const EmployeesCard = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h1 className="card-title">Employees</h1>
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
          Add Employee
        </button>
      </div>
      <div className="card-body">
        <div className="divide-y">
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
          <EmployeeCard />
        </div>
      </div>
    </div>
  );
};

export default EmployeesCard;
