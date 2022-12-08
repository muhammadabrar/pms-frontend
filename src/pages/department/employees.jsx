import React from "react";
import EmployeeCard from "../../components/EmployeeCard";
import employees from "../../data/employees.json";
const Employees = () => {
  return (
    <>
      <div className="grid my-6 gap-4 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 ">
        {employees.map((data, i) => (
          <EmployeeCard data={data} key={i} delay={i * 100} />
        ))}
        <button
        title="Add New Employee"
          data-aos="zoom-in-up"
          data-aos-delay={employees.length * 100}
          className="border-dotted cursor-pointer border-2  flex justify-center items-center bg-gray-200 border-slate-300   hover:bg-slate-100 rounded-xl p-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="text-slate-300  border-slate-300 border-dotted border-2 rounded-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Employees;
