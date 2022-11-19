import { Fragment } from "react";
import { useSelector } from "react-redux";
import Transition from "react-transition-group/Transition";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import Home from "./components/main/Home";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/main/Signup";
import Signin from "./components/main/Signin";
import Products from "./components/products/Products";
import Cart from "./components/Cart/Cart";
import AlertModal from "./components/UI/AlertModal";
import UserInfo from "./components/dashboard/UserInfo";
import UpdateForm from "./components/dashboard/UpdateForm";
import PasswordForm from "./components/dashboard/PasswordForm";
import AboutUs from "./components/main/AboutUs";
import ContactUs from "./components/main/ContactUs";
import ProductDetail from "./components/products/ProductDetail";
import { loader as productsLoader } from "./components/products/Products";
import { loader as productLoader } from "./components/products/ProductDetail";
import { loader as dashboardLoader } from "./components/dashboard/Dashboard";
import { loader as adminProdLoader } from "./components/admin/Items";
import { loader as prodUpdateFormLoader } from "./components/admin/UpdateProdForm";
import { loader as orderLoader } from "./components/orders/OrderDetail";
import Orders from "./components/orders/Orders";
import AdminLayout from "./pages/AdminLayout";
import Items from "./components/admin/Items";
import UpdateProdForm from "./components/admin/UpdateProdForm";
import CreateProduct from "./components/admin/CreateProduct";
import OrderDetail from "./components/orders/OrderDetail";
import ForgotPassword from "./components/main/ForgotPassword";
import ResetPassword from "./components/main/ResetPassword";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/products" element={<Products />} loader={productsLoader} />
      <Route
        path="/products/:productId"
        element={<ProductDetail />}
        loader={productLoader}
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/contactUs" element={<ContactUs />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} loader={dashboardLoader}>
        <Route index element={<UserInfo />} />
        <Route path="/dashboard/me" element={<UserInfo />} />
        <Route path="/dashboard/updateMe" element={<UpdateForm />} />
        <Route path="/dashboard/updatePassword" element={<PasswordForm />} />
        <Route path="/dashboard/orders" element={<Orders />} />
        <Route
          path="/dashboard/orders/:orderId"
          element={<OrderDetail />}
          loader={orderLoader}
        />
      </Route>
      <Route
        path="/admin"
        element={<AdminLayout />}
        errorElement={<ErrorPage />}
      >
        <Route index element={<Items />} loader={adminProdLoader} />
        <Route
          path="/admin/products"
          element={<Items />}
          loader={adminProdLoader}
        />
        <Route
          path="/admin/products/:productId"
          element={<UpdateProdForm />}
          loader={prodUpdateFormLoader}
        />
        <Route path="/admin/products/create" element={<CreateProduct />} />
      </Route>
    </Route>
  )
);

function App() {
  const showModal = useSelector((state) => state.alert.showModal);
  const cartVisibility = useSelector((state) => state.cart.cartVisibility);

  return (
    <Fragment>
      <Transition mountOnEnter unmountOnExit in={showModal} timeout={1000}>
        {(state) => <AlertModal />}
      </Transition>
      <Transition mountOnEnter unmountOnExit in={cartVisibility} timeout={1000}>
        {(state) => <Cart />}
      </Transition>
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
