import React from "react";
import Chat from "../components/task/chat";
import Report from "../components/task/report";
import TaskDetail from "../components/task/taskDetail";

const Task = () => {
  return (
    <div className="flex justify-between">
      <div
        data-aos="fade-left"
        className="content bg-slate-100 rounded-xl h-full flex-grow p-6"
      >
        <div className="flex">
          <TaskDetail />
          <Report />
        </div>
      </div>
      <div className="chat">
        <Chat/>
      </div>
    </div>
  );
};

export default Task;
