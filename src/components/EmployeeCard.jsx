import React, { useState } from "react";
import { Button, CardHeader, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const EmployeeCard = () => {
      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      return (
            <div className=" rounded-lg divide-y">
      <CardHeader
        title="Employee Name"
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
}

export default EmployeeCard;
