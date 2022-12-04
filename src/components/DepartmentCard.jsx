import React, { useState } from "react";
import { Button, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const DepartmentCard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="dep-card shadow rounded-lg divide-y">
      <CardHeader
        title="Department Name"
        action={
          <IconButton
            id="Dep-menu-btn"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
        }
      />
      <p className="p-3">
        <b>2</b> Employees
      </p>
      <p className="p-3">
        <b>Manager</b> Shayan Sir
      </p>
      <p className="p-3">
        <b>4</b> Task Added
      </p>
      <Menu
        id="dep-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Add Task</MenuItem>
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose} ><p className='text-red-800 '>Delete</p></MenuItem>
      </Menu>
    </div>
  );
};

export default DepartmentCard;
