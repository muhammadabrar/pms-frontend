import React from "react";
import TaskCard from "../components/TaskCard";
import tasks from "../data/tasks.json";
const Tasks = () => {

  return (
    <div className="flex justify-between">
      <div
        data-aos="fade-left"
        className="content bg-slate-100 rounded-l-xl h-full flex-grow p-6"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Tasks
          </h1>
          <div className="search flex rounded-full bg-slate-400 items-center">
            <div className="relative">
              <input
                type="text"
                className=" w-full text-sm input focus:shadow-purple-500 shadow-md text-gray-900 rounded-full
                  bg-slate-200 "
                placeholder="Search..."
              />
              <button
                type="submit"
                className="text-white absolute right-0 bottom-0 font-medium text-sm px-4 py-2"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
 
        <div className="grid my-6 gap-4 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 ">
        {tasks.map((data, i) => (
          <TaskCard data={data} key={i} delay={i * 100} />
        ))}
        <button
        title="Add New Task"

          data-aos="zoom-in-up"
          data-aos-delay={tasks.length * 100}
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
      </div>
      
    </div>
  );
};

export default Tasks;
