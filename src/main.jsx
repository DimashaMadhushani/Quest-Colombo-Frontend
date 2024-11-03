import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import "./index.css";
import "./styles/styles.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./screens/PageNotFound.jsx";
import UserDashboardLayout from "./screens/user/UserDashboardLayout.jsx";
import AdminLoginScreen from "./screens/admin/AdminLoginScreen.jsx";
import AdminDashboardLayout from "./screens/admin/AdminDashboardLayout.jsx";
import UserDashboardMainScreen from "./screens/user/UserDashboardMainScreen.jsx";
import UserProfileScreen from "./screens/user/UserProfileScreen.jsx";
import UserBookings from "./screens/user/UserBookings.jsx";
import AdminDashboardMainScreen from "./screens/admin/AdminDashboardMainScreen.jsx";
import AdminProfileScreen from "./screens/admin/AdminProfileScreen.jsx";
import UserWorkspacesByTypeScreen from "./screens/user/UserWorkspacesByTypeScreen.jsx";
import UserWorkspaceScreen from "./screens/user/UserWorkspaceScreen.jsx";
import UserCreateBookingScreen from "./screens/user/UserCreateBookingScreen.jsx";
import UserSingleBookingScreen from "./screens/user/UserSingleBookingScreen.jsx";
import AdminBookingListScreen from "./screens/admin/AdminBookingListScreen.jsx";
import AdminPackagesScreen from "./screens/admin/AdminPackagesScreen.jsx";
import AdminUserManagementScreen from "./screens/admin/AdminUserManagementScreen.jsx";
import AdminInquiry from "./screens/admin/AdminInquiry.jsx";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen.jsx";
import AdminSingleBookingScreen from "./screens/admin/AdminSingleBookingScreen.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/user-dashboard",
    element: <UserDashboardLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <UserDashboardMainScreen />,
      },
      {
        path: "user-profile",
        element: <UserProfileScreen />,
      },
      {
        path: "bookings",
        element: <UserBookings />,
      },
      {
        path: "workspace-types/:workspaceType",
        element: <UserWorkspacesByTypeScreen />,
      },
      {
        path: "workspace-types/:workspaceType/:workspaceId",
        element: <UserWorkspaceScreen />,
      },
      {
        path: "workspace-types/:workspaceType/:workspaceId/create-booking",
        element: <UserCreateBookingScreen />,
      },
      {
        path: "bookings/:bookingId",
        element: <UserSingleBookingScreen />,
      },
    ],
  },
  {
    path: "/admin-login",
    element: <AdminLoginScreen />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboardLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <AdminDashboardMainScreen />,
      },
      {
        path: "admin-profile",
        element: <AdminProfileScreen />,
      },
      {
        path: "bookings",
        element: <AdminBookingListScreen />,
      },
      {
        path: "packages",
        element: <AdminPackagesScreen />,
      },
      {
        path: "user-management",
        element: <AdminUserManagementScreen />,
      },
      {
        path: "inquiry",
        element: <AdminInquiry />,
      },
      {
        path: "bookings/:bookingId",
        element: <AdminSingleBookingScreen />,
      },
    ],
  },
  {
    path: "/forget-password",
    element: <ForgetPasswordScreen />,
    errorElement: <PageNotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
            borderRadius: 2,

            colorBgContainer: "#f6ffed",
            borderRadiusLG: 4,
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </Provider>
  </StrictMode>
);
