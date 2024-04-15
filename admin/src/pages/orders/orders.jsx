import "./orders.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getOrders, deleteOrders } from "../../redux/apiCalls";

export default function Orders() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orderss);

  console.log(orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrders(id, dispatch);
  };

  const columns = [
    { field: "userId", headerName: "User ID", width: 220 },
    ,
    {
      field: "createdAt",
      headerName: "Ordered At",
      width: 200,
      renderCell: (params) => {
        return `${params.row.createdAt.split("T")[0]} - ${params.row.createdAt
          .split("T")[1]
          .split(".")[0]
          .slice(0, 5)}`;
      },
    },
    {
      field: "amount",
      headerName: "Total",
      width: 160,
      renderCell: (params) => {
        return ` $ ${params.row.amount}`;
      },
    },
    { field: "status", headerName: "Status", width: 220 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/order/" + params.row._id}>
              <button className="productListEdit">Show</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
      />
    </div>
  );
}
