import React from "react";

const TaskCard = ({ data, delay }) => {
  return (
    <div
      data-aos="zoom-in-up"
      data-aos-delay={delay}
      className=" relative bg-white border hover:shadow-xl rounded-xl"
    >
      <div className="p-4">
        <div className="flex items-center ">
          <img src={data?.Avatar} className="w-9 h-9 rounded shadow mr-2" />
          <h1 className="flex-grow font-medium text-xs">{data?.name}</h1>
          <button className="">
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
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
        <h1 className="mt-3 font-semibold text-sm"><a href={`/tasks/task/${data.id}`} >Task Title</a></h1>
        <div className="my-3 text-sm">
          <p>- Description 1</p>
          <p>- Description 3</p>
          <p>- Description 4</p>
        </div>

        <div class="relative">
          <span
            style={{ left: `${data.progress - 15}%` }}
            class="progress-value text-sm font-medium text-purple-200"
          >
            {data.progress}%
          </span>
          <span class="text-sm font-medium text-white">%</span>
          <div class="w-full bg-gray-200 rounded-full h-1">
            <div
              class="bg-purple-600 h-1 rounded-full"
              style={{ width: `${data.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 hover:bg-white border-t w-full rounded-b-xl">
        <a href={`/tasks/task/${data.id}`}>
          <button className="w-full p-2">More</button>
        </a>
      </div>
    </div>
  );
};

export default TaskCard;
