import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Landing from "../pages/Landing";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ListRecipe from "../pages/recipe/List";
import DetailRecipe from "../pages/recipe/Detail";
import AddRecipe from "../pages/recipe/Add";
import Profile from "../pages/user/Profile";
import NotFound from "../pages/NotFound";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return children;
  } else {
    return <Navigate to="/auth" />;
  }
};

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default function router() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/">
          <Route index element={<Landing />} />
        </Route>
        <Route path="/auth">
          <Route
            index
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>
        <Route path="/recipe">
          <Route
            index
            element={
              <PrivateRoute>
                <ListRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <PrivateRoute>
                <DetailRecipe />
              </PrivateRoute>
            }
          />
          <Route
            path="/recipe/add"
            element={
              <PrivateRoute>
                <AddRecipe />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/myprofile"
          element={
            <PrivateRoute>
              <Profile my />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
