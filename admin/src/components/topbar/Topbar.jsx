import React from "react";
import "./topbar.css";
import {useDispatch,useSelector} from "react-redux";
import { NotificationsNone } from "@material-ui/icons";
import { deconnecter } from "../../redux/apiCalls";
import { Link } from "react-router-dom";



export default function Topbar() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orderss);
  const notifications = orders.filter(order => order.status === "pending").length

  const handleClick = (e) => {
    e.preventDefault();
    deconnecter(dispatch);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
      <button className="butt" onClick={handleClick}>Deconnecter</button>
        <div className="topLeft">
          <span className="logo"><b>FITOP</b></span>
        </div>
        <div className="topRight">
        <Link to={"/orders"}>
          <div className="topbarIconContainer">
            <NotificationsNone />     
            <span className="topIconBadge">{notifications}</span> 
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
