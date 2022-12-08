import React from "react";

const TaskDetail = () => {
  return (
    <div className="TUC  h-full bg-white rounded-xl">
      <div className="TUC-img ">
        <div className="rounded-full shadow-lg TUC-Employee-img">
          <div className="img-circle ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 shadow-lg bg-white rounded-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <img
            className="rounded-full  img dp"
            src="https://robohash.org/omnisanimivoluptas.jpg?size=256x256&set=set1"
          />
        </div>
      </div>
      <div className="text-center border-b pb-4">
        <h1 className="text-xl font-semibold">Tamma Weld</h1>
        <p className="text-sm text-gray-500 font-semibold">
          Community Specialist
        </p>
      </div>
      <div className="border-b p-2">
        <h1 className=" font-semibold">Department</h1>
        <p className="text-sm text-gray-500 font-semibold">Department name</p>
      </div>
      <div className="border-b p-2">
        <h1 className=" font-semibold">Work</h1>
        <p className="text-sm text-gray-500 font-semibold">Emails</p>
        <p className="text-sm text-gray-500 font-semibold">Mile Stone: 20</p>
      </div>
      <div className=" border-b p-2">
        <h1 className="font-semibold">Starting date</h1>
        <p className="text-sm text-gray-500 font-semibold">11, dec 2022</p>
      </div>
      <div className=" border-b p-2">
        <h1 className="font-semibold">due date</h1>
        <p className="text-sm text-gray-500 font-semibold">20, dec 2022</p>
      </div>
      <div className=" p-2">
        <h1 className="font-semibold">Description</h1>
        <p className="text-sm text-gray-500 font-semibold mb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed non alias
          doloribus sapiente ea neque repellendus doloremque. Possimus autem,
          aliquam veniam dolores minima deleniti labore explicabo voluptatum.
          Eius, corporis sint!
        </p>
        <button className="btn-sm border border-gray-500 hover:text-white hover:bg-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"
            />
          </svg>
          Attachments
        </button>
      </div>
    </div>
  );
};

export default TaskDetail;
