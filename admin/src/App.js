import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/orders"
import Order from "./pages/order/order";
import Mail from "./pages/mail/Mail";
import { useSelector } from "react-redux";

function App() {
  const admin = useSelector((state) =>
    state.user.currentUser ? state.user.currentUser.isAdmin : null
  );
  return (
    <Router>
      <Switch>
        {admin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/users">
                <UserList />
              </Route>
              <Route path="/user/:userId">
                <User />
              </Route>
              <Route path="/products">
                <ProductList />
              </Route>
              <Route path="/product/:productId">
                <Product />
              </Route>
              <Route path="/newproduct">
                <NewProduct />
              </Route>
              <Route path="/orders">
                <Orders />
              </Route>
              <Route path="/order/:orderId">
                <Order />
              </Route>
              <Route path="/mail">
                <Mail />
              </Route>
            </div>
          </>
        ) : (
            <Login />
        )}
      </Switch>
    </Router>
  );
}

export default App;
