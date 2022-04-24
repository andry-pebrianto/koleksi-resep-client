import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { getList } from "../redux/actions/users";

export default function Landing() {
  const isLoggedIn = false;
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getList());
  }, [dispatch]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </>
  );
}
