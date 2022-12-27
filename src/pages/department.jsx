import React, { useState, useEffect } from "react";
import Employees from "./department/employees";
import Tasks from "./department/tasks";
import departments from "../data/departments.json";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
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
              <form>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Search"
                    required
                  />
                  <button
                    type="submit"
                    className="text-white absolute right-1 bottom-2.5 font-medium rounded-lg text-sm px-4 py-2 "
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            {/* <div>
<div className="col-3">
            <input className="effect-9" type="text" placeholder="effect-9"/>
              <span className="focus-border">
                <i></i>
              </span>
          </div>
</div> */}
          </div>
          <div className="my-6 pb-2 border-b">
            <div>
              <NavLink
                to={`/departments/department/${id}`}
                onClick={() => setpage(1)}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "font-bold pb-2 text-purple border-b-2 border-purple-700 hover:text-purple-700 hover:border-b-2  hover:border-purple-700"
                    : " pb-2 font-bold text-gray-400 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
                }
              >
                Employees
              </NavLink>
              <NavLink
                to={`/departments/department/tasks/${id}`}
                onClick={() => setpage(2)}
                className={({ isActive, isPending }) =>
                  isActive
                    ? "pb-2 mx-6 font-bold text-purple border-b-2 border-purple-700 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
                    : "pb-2 mx-6 font-bold text-gray-400 hover:text-purple-700 hover:border-b-2 hover:border-purple-700"
                }
              >
                Tasks
              </NavLink>
            </div>
          </div>

          <Outlet />
        </div>

        <div className="dep-sidebar p-4">
          {!loading && data ? (
            <>
              <div className="border-b py-2">
                <p className="text-sm font-semibold text-gray-400 ">
                  Department Overview
                </p>
                <h1 className="font-semibold text-xl">{data.department}</h1>
                <p className="text-sm text-gray-500 pt-4">
                  <span className="text-black">Manager:</span> Shayan
                </p>
                <p className="text-sm text-gray-500">
                  <span className="text-black">Employees:</span> 8
                </p>
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
