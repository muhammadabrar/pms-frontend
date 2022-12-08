import React, { useState } from "react";

const ReportCard = ({data, target, work}) => {
  const [Progress, setProgress] = useState((data?.milestone*100)/target);
  return (
    <div className="bg-white  mt-2 p-4 rounded-xl w-full relative">
      <div className="flex items-start justify-between">
        <div>
          <h1 className=" font-semibold">{data?.user}</h1>
          <p className="text-sm text-gray-400">{data?.date}</p>
        </div>
        <h1 className=" font-semibold font-sans">{data?.milestone} {work}</h1>
      </div>
      <div class="relative">
        <span
          style={{ left: `${50 - 5}%` }}
          class="progress-value text-sm font-medium text-purple-200"
        >
          {Progress}%
        </span>
        <span class="text-sm font-medium text-white">%</span>
        <div class="w-full bg-gray-200 rounded-full h-1">
          <div
            class="bg-purple-600 h-1 rounded-full"
            style={{ width: `${50}%` }}
          ></div>
        </div>
      </div>
      <div className="my-3">
        <h1 className="text-sm font-semibold">statement</h1>

        <div className="text-sm w-3/2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
          voluptatibus dolores voluptate, autem incidunt aliquam, quisquam nemo
          harum architecto dolor, quos consequatur quibusdam recusandae! Labore
          saepe vel veniam vero deserunt.
        </div>
      </div>
      <button className="btn border border-gray-500 hover:text-white hover:bg-slate-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 inline-block mr-2"
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
  );
};

export default ReportCard;
