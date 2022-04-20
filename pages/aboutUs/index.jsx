import React from "react";
import { getCookie } from "../../helpers/cookie";

export default function aboutUs({ userData }) {
  console.log(userData);
  return <div style={{ fontSize: "28px" }}>aboutUs</div>;
}

aboutUs.getInitialProps = ({ req, res }) => getCookie(req, res);
