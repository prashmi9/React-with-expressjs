import React from "react";
import "./Navigation.css";
function Navigation() {
  return (
    <nav data-testid="navigation">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/register">Register</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
