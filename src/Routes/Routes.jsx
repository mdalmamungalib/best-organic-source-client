import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Payges/Home/Home/Home";
import Menu from "../Payges/Menu/Menu/Menu";
import OurShop from "../Payges/OurShop/OurShop";
import Login from "../Payges/Login/Login";
import SingUp from "../Payges/SingUp/SingUp";
import PrivetRoute from "./PrivetRoute";
import DashBoard from "../Layout/DashBoard";
import AllUsers from "../Payges/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import MyCart from "../Payges/Dashboard/MyCart/MyCart";
import AddAnItem from "../Payges/Dashboard/AddAnItem/AddAnItem";
import ManageItems from "../Payges/Dashboard/ManageItems/ManageItems";
import Payment from "../Payges/Dashboard/Payment/Payment";
import AdminHome from "../Payges/Dashboard/AdminHome/AdminHome";
import UserHome from "../Payges/Dashboard/UserHome/UserHome";
import UpdateItem from "../Payges/Dashboard/UpdateItem/UpdateItem";
import ManageOrders from "../Payges/Dashboard/manageOrders/manageOrders";
import AddReview from "../Payges/Dashboard/AddReview/AddReview";
import ManageReview from "../Payges/Dashboard/ManageReview/ManageReview";
import UpdateReview from "../Payges/Dashboard/ManageReview/UpdateReview";
import Error404 from "../Payges/Error404/Error404";
import AddBanner from "../Payges/Dashboard/AddBanner/AddBanner";
import OrderCardById from "../Components/OrderCardById/OrderCardById";
import OrderForm from "../Components/OrderForm/OrderForm";
import PaymentSuccess from "../Payges/PaymentSuccess/PaymentSuccess";
import PaymentFail from "../Payges/Home/PaymentFail/PaymentFail";
import A_SingleOrder from "../Payges/Dashboard/ManageOrders/A_SingleOrder";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error404></Error404>,
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/menu",
        element: <Menu></Menu>,
      },
      {
        path: "/ourShop/:category",
        element: (
          <PrivetRoute>
            <OurShop></OurShop>
          </PrivetRoute>
        ),
      },
      {
        path: "/order_card_id/:id",
        element: (
          <PrivetRoute>
            <OrderCardById></OrderCardById>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_SERVER_URL}/items/${
              params.id
            }`
          ),
      },
      {
        path: "/order_form",
        element: (
          <PrivetRoute>
            <OrderForm></OrderForm>
          </PrivetRoute>
        ),
      },
      {
        path: "/payment/success",
        element: (
          <PrivetRoute>
            <PaymentSuccess></PaymentSuccess>
          </PrivetRoute>
        ),
      },
      {
        path: "/payment/fail",
        element: (
          <PrivetRoute>
            <PaymentFail />
          </PrivetRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/singUp",
        element: <SingUp></SingUp>,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <Error404></Error404>,
    element: (
      <PrivetRoute>
        <DashBoard></DashBoard>
      </PrivetRoute>
    ),
    children: [
      {
        path: "/dashboard/userHome",
        element: <UserHome></UserHome>,
      },
      {
        path: "/dashboard/myCart",
        element: (
          <PrivetRoute>
            <MyCart></MyCart>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/addReview",
        element: (
          <PrivetRoute>
            <AddReview></AddReview>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/manageReview",
        element: (
          <PrivetRoute>
            <ManageReview></ManageReview>
          </PrivetRoute>
        ),
      },
      {
        path: "/dashboard/updateReview/:id",
        element: (
          <PrivetRoute>
            <UpdateReview></UpdateReview>
          </PrivetRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${
              import.meta.env.VITE_SERVER_URL
            }/editReviews/${params.id}`
          ),
      },
      {
        path: "/dashboard/payment",
        element: (
          <PrivetRoute>
            <Payment></Payment>
          </PrivetRoute>
        ),
      },
      //admin route
      {
        path: "/dashboard/adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addBanner",
        element: (
          <AdminRoute>
            <AddBanner></AddBanner>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allUsers",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/addItem",
        element: (
          <AdminRoute>
            <AddAnItem></AddAnItem>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/updateItem/:id",
        element: (
          <AdminRoute>
            <UpdateItem></UpdateItem>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_SERVER_URL}/items/${
              params.id
            }`
          ),
      },
      {
        path: "/dashboard/manageItems",
        element: (
          <AdminRoute>
            <ManageItems></ManageItems>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manageOrders",
        element: (
          <AdminRoute>
            <ManageOrders></ManageOrders>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/aOrderDetails/:id",
        element: (
          <AdminRoute>
            <A_SingleOrder></A_SingleOrder>
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `${import.meta.env.VITE_SERVER_URL}/singleCard/${params.id}`
          ),
      },
    ],
  },
]);
