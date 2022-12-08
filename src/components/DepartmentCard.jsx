import React, { useState } from "react";
import Chart from "react-apexcharts";
import RadialBar from "./radialBar";
const DepartmentCard = ({ data, delay }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div
      data-aos="zoom-in-up"
      data-aos-offset="220"
      data-aos-delay={delay}
      className="relative bg-white border hover:shadow-xl rounded-xl"
    >
      <div className="cardBody">
        <RadialBar success_rating={data?.success_rating} />
        <a
          href={`/departments/department/${data.id}`}
          className="text-lg font-bold hover:text-purple-600 dep-title"
        >
          {data?.department}
        </a>
        <h1 className="font-semibold leading-6">{data?.manager}</h1>
        <div className="bg-gray-200 hover:bg-white border-t mt-4 w-full rounded-b-xl">
          <a href={`/departments/department/${data.id}`}>
            <button className="w-full p-2">More</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
