import "./Sidebars.css"
import React, { useState } from "react";
import {
  RiHome4Line,
  RiTeamLine,
  RiCalendar2Line,
  RiFolder2Line,
  RiUserFollowLine,
  RiPlantLine,
  RiStackLine,
  RiUserUnfollowLine
} from "react-icons/ri";
import logo from "../neoxam_logo.png";
import { Link,Outlet,NavLink } from "react-router-dom";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi/";

import {
  Sidebar,
  SubMenu,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import { fontFamily } from "@mui/system";
import StorageIcon from '@mui/icons-material/Storage';
import SchemaIcon from '@mui/icons-material/Schema';
import GroupIcon from '@mui/icons-material/Group';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SettingsIcon from '@mui/icons-material/Settings';



const Sidebars=() => {
  const { collapseSidebar } = useProSidebar();
  const [collapsed, setCollapsed] = useState(false);

  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  const [activePage, setActivePage] = useState(null) ;

  function handleActive(event) {
    if (!event.target.classList.value.includes("active")) {
      event.target.classList.toggle('active') ;
      if (activePage)
        activePage.classList.remove("active") ;
      setActivePage(event.target) ;
    }
  }
  return (
    <div className="sidebar-container">
      <Sidebar
        
        className={`app ${toggled ? "toggled" : ""}`}
        style={{ height: "100vh"}}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}>
        
          <Menu>
            {collapsed ? (
              <MenuItem
                icon={<FiChevronsRight />}
                onClick={()=> {collapseSidebar();handleCollapsedChange()}}>
                </MenuItem>
            ) : (
              <MenuItem
                suffix={<FiChevronsLeft />}
                onClick={()=> {collapseSidebar();handleCollapsedChange()}}
              >
                <div
                  style={{
                    padding: "9px",
                    // textTransform: "uppercase",
                    fontWeight: "bold",
                    'margin-top':'10px',
                    fontSize: 14,
                    letterSpacing: "14px"
                  }}
                >
                  <img src={logo} style={{ width: "150px" }} />
                </div>
              </MenuItem>
            )}
            <hr />
          </Menu>

          <Menu style={{'margin-top':'10px'}}> 
          
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/Environment"} onClick={handleActive} ><MenuItem  className="item" icon={<StorageIcon />} style={{fontSize:"15px" }}>Environement</MenuItem></Link>
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/Schema"}  onClick={handleActive}><MenuItem className="item" icon={<SchemaIcon />} style={{fontSize:"15px"}}  >Schema </MenuItem></Link>
            <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={"/Users"} onClick={handleActive}> <MenuItem className="item" icon={<GroupIcon />} style={{fontSize:"15px"}} >Users</MenuItem></Link>
            <MenuItem className="item" icon={<RiCalendar2Line />} style={{fontSize:"15px"}}   href="test" >Treatement</MenuItem>
            <MenuItem className="item" icon={<AutorenewIcon />} style={{fontSize:"15px"}} >Load</MenuItem>
            <MenuItem className="item" icon={<RiStackLine />} style={{fontSize:"15px"}}  >Dump</MenuItem>
            <div style={{marginTop:'300px'}}>
              <hr></hr>
            <MenuItem className="item" icon={<SettingsIcon />} style={{fontSize:"15px"}}  >Settings</MenuItem>
            <MenuItem className="item" icon={<ExitToAppIcon />} style={{fontSize:"15px"}}  >logout</MenuItem>
            </div>
          </Menu>
        
      </Sidebar>
      
    </div>
  );
}

export{ 
  Sidebars
}
