import React, { useState, useEffect } from "react";
import Employees from "./department/employees";
import Tasks from "./department/tasks";
import departments from "../data/departments.json";
import { useParams } from "react-router-dom";
import RadialBar from "../components/radialBar";
const Department = () => {
  const [page, setpage] = useState(1);
  const { id } = useParams();
  const [data, setdata] = useState();
  const [loading, setloading] = useState(true);
  useEffect(() => {
    console.log(id);
    if (id) {
      departments.map((item) => {
        if (item.id == id) {
          setdata(item);
          setloading(false);
        }
      });
    }
  }, [id]);
  console.log(data);
  return (
    <>
      <div className="flex justify-between">
        <div
          data-aos="fade-up"
          className="content bg-slate-100 rounded-xl h-full flex-grow p-6"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">
              {page == 1 ? "Employees" : "Tasks"}
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
          <div className="my-6 border-b">
            <div>
              <button
                onClick={() => setpage(1)}
                className={
                  page == 1
                    ? "font-bold text-purple border-b-2 border-purple-700 "
                    : "font-bold text-gray-400 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
                }
              >
                Employees
              </button>
              <button
                onClick={() => setpage(2)}
                className={
                  page == 2
                    ? "mx-6 font-bold text-purple border-b-2 border-purple-700"
                    : "mx-6 font-bold text-gray-400 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
                }
              >
                Tasks
              </button>
            </div>
          </div>
          {page == 1 ? <Employees /> : <Tasks />}
        </div>
        <div className="dep-sidebar p-4">
          {!loading && data ? (
            <>
              <div className="border-b py-2">
                <p className="text-sm font-semibold text-gray-400 ">
                  Department Overview
                </p>
                <h1 className="font-semibold text-xl">{data.department}</h1>
                <p className="text-sm text-gray-500 pt-4"><span className="text-black">Manager:</span> Shayan</p>
                <p className="text-sm text-gray-500"><span className="text-black">Employees:</span> 8</p>


              </div>
              <div className="py-11">
                <RadialBar success_rating={data?.success_rating} />
              </div>
              <div>
                <h1 className="font-bold">Tasks </h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-4 my-4">
                  <div className="relative py-2 px-6 rounded-lg bg-slate-200">
                    <div className="absolute top-2 bottom-2 left-2 rounded-xl   w-1 bg-brown"></div>
                    <p className="text-sm leading-6 text-gray-400">Total</p>
                    <p className="text-3xl leading-8 font-sans border-purple-700 font-semibold">
                      50
                    </p>
                  </div>
                  <div className="relative py-2 px-6 rounded-lg bg-slate-200">
                    <div className="absolute top-2 bottom-2 left-2 rounded-xl   w-1 bg-purple-500"></div>
                    <p className="text-sm leading-6 text-gray-400">Completed</p>
                    <p className="text-3xl leading-8 font-sans border-purple-700 font-semibold">
                      40
                    </p>
                  </div>
                  <div className="relative py-2 px-6 rounded-lg bg-slate-200">
                    <div className="absolute top-2 bottom-2 left-2 rounded-xl   w-1 bg-blue-500"></div>
                    <p className="text-sm leading-6 text-gray-400">Progress</p>
                    <p className="text-3xl leading-8 font-sans border-purple-700 font-semibold">
                      10
                    </p>
                  </div>
                  <div className="relative py-2 px-6 rounded-lg bg-slate-200">
                    <div className="absolute top-2 bottom-2 left-2 rounded-xl   w-1 bg-green-500"></div>
                    <p className="text-sm leading-6 text-gray-400">Success</p>
                    <p className="text-3xl leading-8 font-sans border-purple-700 font-semibold">
                      35
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Department;
