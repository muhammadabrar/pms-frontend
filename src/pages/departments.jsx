import React from "react";
import DepartmentCard from "../components/DepartmentCard";
import departments from "../data/departments.json";


const Departments = () => {
  return (
    <div data-aos="fade-left" className="bg-slate-50 shadow-inner  rounded-l-xl h-full flex-grow p-6 px-11 ">
      <div className="flex justify-between items-center p-5 bg-purple text-white rounded-xl">
        <h1 className="card-title">Departments</h1>
        <button className="btn btn-purple flex items-center">
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
      <div className="grid my-6 gap-4 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
        {departments.map((data, i) => (
          <DepartmentCard data={data} key={i} delay={i * 100}/>
        ))}
        
      </div>
    </div>
  );
};

export default Departments;
