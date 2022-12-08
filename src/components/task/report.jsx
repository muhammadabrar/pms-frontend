import React, { useState } from "react";
import ReportCard from "./reportCard";

const Report = () => {
  const [reports, setReports] = useState([
    {
      user: "shayan khan",
      date: "12 dec, 2022",
      milestone: 10,
      statement: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptatibus dolores voluptate, autem incidunt aliquam, quisquam nemo
            harum architecto dolor, quos consequatur quibusdam recusandae! Labore
            saepe vel veniam vero deserunt.`,
    },
    {
      user: "shayan khan",
      date: "14 dec, 2022",
      milestone: 15,
      statement: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptatibus dolores voluptate, autem incidunt aliquam, quisquam nemo
            harum architecto dolor, quos consequatur quibusdam recusandae! Labore
            saepe vel veniam vero deserunt.`,
    },
    {
      user: "shayan khan",
      date: "15 dec, 2022",
      milestone: 20,
      statement: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptatibus dolores voluptate, autem incidunt aliquam, quisquam nemo
            harum architecto dolor, quos consequatur quibusdam recusandae! Labore
            saepe vel veniam vero deserunt.`,
    },
  ]);
  const [targetMilestone, settargetMilestone] = useState(20);
  const [work, setwork] = useState('Emails');
  return (
    <div className="mt-3 ml-4 flex-grow">
      <h1 className="text-2xl font-bold">Task Title</h1>
      <div className="bg-white  mt-2 rounded-xl w-full relative">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-semibold">Progress Report</h1>
          <button className="btn btn-report">Add Report</button>
        </div>
      </div>
      {reports.map((data, i) => (
        <ReportCard data={data} key={i} target={targetMilestone} work={work} />
      ))}
    </div>
  );
};

export default Report;
