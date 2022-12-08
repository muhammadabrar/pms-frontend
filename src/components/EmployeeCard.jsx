import React, { useState } from "react";
import { Button, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const EmployeeCard = ({data, delay}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div data-aos="zoom-in-up" data-aos-delay={delay} className=" relative bg-white border hover:shadow-xl rounded-xl">
      <div className="EmployeeCardBody py-6">
        <div className="rounded-full shadow-lg Employee-img">
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
            className="rounded-full img dp "
            src={data?.avatar}
          />
        </div>
        <a
          href="#"
          className="text-lg leading-8 mt-2 font-bold hover:text-purple-600 dep-title"
        >
          {data?.name}
        </a>
        <h1 className="font-semibold text-gray-500 leading-4 text-sm">{data?.roll}</h1>
      </div>
      <div className="bg-gray-200 hover:bg-white border-t w-full rounded-b-xl">
        <a href="#">
          <button className="w-full p-2">More</button>
        </a>
      </div>
      <div className="absolute right-0 top-0">
        <IconButton
          id="Dep-menu-btn"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </div>
      <Menu
        id="dep-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Add Task</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>
          <p className="text-red-800 ">Delete</p>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default EmployeeCard;
