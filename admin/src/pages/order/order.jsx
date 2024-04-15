import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import "./order.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrders, updateUsers } from "../../redux/apiCalls";
import Spinner from "../../components/Spinner/Spinner";
import { DataGrid } from "@material-ui/data-grid";

export default function Order() {
  const location = useLocation();
  const dispatch = useDispatch();
  const orderId = location.pathname.split("/")[2];
  let history = useHistory();

  const order = useSelector((state) =>
    state.orders.orderss.find((order) => order._id === orderId)
  );

  const user = useSelector((state) =>
    state.users.users.find((user) => user._id === order.userId)
  );

  const Callback = (product) => {
    const prod = useSelector((state) =>
      state.product.products.find((p) => p._id === product.productId)
    );
    return { ...prod, quantity: product.quantity, id: product._id };
  };
  const produits = order.products.map(Callback);
  console.log(produits);
  const handleClick = (e) => {
    e.preventDefault();
    updateOrders(order._id ,{...order , status : "valid"},dispatch )
    history.push("/orders")
  };

  const columns = [
    {
      field: "product",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "quantity",
      headerName: "quantity",
      width: 160,
    },
    {
      field: "Total",
      headerName: "Total",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            $ {params.row.price * params.row.quantity}
          </div>
        );
      },
    },
  ];

  return (
    <div className="user">
      <div className="userContainer">
        <div className="userUpdate">
          <span className="userUpdateTitle">Infos Order</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label><b>userId :</b> {user._id}</label>
              </div>
              <div className="userUpdateItem">
                <label><b>Email :</b> {user.email}</label>
              </div>
              <div className="userUpdateItem">
                <label><b>adresse :</b> {order.address}</label>
              </div>
              <div className="userUpdateItem">
                <h3><b>Total : </b>${order.amount}</h3>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload"></div>
                <button className="userUpdateButton" onClick={handleClick} disabled={order.status !== "pending"}>
                {order.status !== "pending" ?  "Deja Validé" : "Valider" }
                </button>
            </div>
          </form>
        </div>
      </div>

      <DataGrid
        rows={produits}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
