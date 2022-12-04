import React from "react";

const Task = () => {
  return (
    <div className="task shadow rounded-md mb-4">
      <div className="flex">
        <div className="task-date bg-green p-3 rounded-l-md text-center text-white">
          <h1 className="text-4xl font-bold">07</h1>
          <p className="text-sm font-medium">Dec 2022</p>
        </div>
        <div className="task-detail flex-grow">
          <div className="progress rounded-r-md bg-green-400 w-1/2" style={{}}>
            50%
          </div>
          <div className="detail p-2">
            <h1 className="text-xl font-medium">Employee name</h1>
            <p>Detail</p>
          </div>
        </div>
        <div className="task-date bg-green p-3 rounded-r-md text-center text-white">
          <h1 className="text-4xl font-bold">07</h1>
          <p className="text-sm font-medium">Dec 2022</p>
        </div>
      </div>
    </div>
  );
};

export default Task;
