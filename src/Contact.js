// pages/ContactUs.js
import React from "react";
import { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = {};
    if (!formData.name.trim()) {
      formValid = false;
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      formValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formValid = false;
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) {
      formValid = false;
      newErrors.message = "Message is required";
    }
    if (formValid) {
      formData.id = Math.floor(Math.random() * 100);
      console.log(formData);
      try {
        const response = await fetch("http://localhost:8000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data); // Handle response from the server
      } catch (error) {
        console.error("Error registering user:", error);
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <div>
      <h2>Register with us!</h2>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
