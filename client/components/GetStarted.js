import { Title } from "../helpers/use-title";
import { useState, useEffect } from "react";
import Alert from "./Alert";
import Link from "next/link";
import Header from "./Header";
import axios from "axios";
import Router from "next/router";
const GetStarted = ({ currentUser }) => {
  return (
    <>
      <Header currentUser={currentUser} />
      <Title title="Welcome to Saharafrica ¤  Saharafrica" />
      <Alert content="Your email was successfully validated.Welcome to Sahafrica" />
      <div className="container">
        <div className="margin-top-20"></div>
      </div>
    </>
  );
};

export default GetStarted;
