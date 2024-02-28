import React, { useState, useEffect } from "react";
import "./DisplayUsers.css";
function DisplayUsers(props) {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(-1);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    fetch("http://localhost:8000/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        props.sendUserData(data.length);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, [props]);
  const showHideForm = (id) => {
    setShowForm(id);
  };
  const updateUser = (e) => {
    console.log("Update button clicked", e.target.value);

    setFormData(
      //   { ...formData, [id]: id },
      { ...formData, [e.target.name]: e.target.value }
    );
  };
  //   const updateUser = async (userId, updatedUserData) => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:8000/api/update/${userId}`,
  //         {
  //           method: "PUT",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(updatedUserData),
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to update user");
  //       }

  //       const data = await response.json();
  //       console.log("User data updated:", data);
  //       // Update state or perform other actions as needed
  //     } catch (error) {
  //       console.error("Error updating user:", error);
  //       // Handle error
  //     }
  //   };

  return (
    <div>
      <h2>Users</h2>
      <ul className="users">
        {users.map((user, key) => (
          <>
            <li key={user.id}>
              <strong>ID:</strong> {user.id},<strong>Name:</strong> {user.name},{" "}
              <strong>Email:</strong> {user.email}
              <button
                onClick={() => {
                  showHideForm(key);
                }}
              >
                Edit
              </button>
              {showForm === key && (
                <form>
                  <input type="text" value={user.id} disabled />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={updateUser}
                  />
                  <input
                    type="text"
                    name="email"
                    onChange={updateUser}
                    value={formData.email}
                  />
                  <input
                    type="text"
                    name="message"
                    onChange={updateUser}
                    value={formData.message}
                  />
                  <button type="submit">Save</button>
                </form>
              )}
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}

export default DisplayUsers;
