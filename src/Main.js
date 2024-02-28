import "./Main.css";
import React from "react";
import DisplayUsers from "./users/DisplayUsers";
import { useState } from "react";

function MainContent() {
  const [totalUsers, settotalUsers] = useState([]);
  const handleTotalUsers = (data) => {
    settotalUsers(data);
  };
  return (
    <main data-testid="main">
      <h2>Main Content</h2>
      <p>Welcome to the main content area.</p>
      <h4>Total Users: {totalUsers}</h4>
      <DisplayUsers sendUserData={handleTotalUsers}></DisplayUsers>
    </main>
  );
}

export default MainContent;
