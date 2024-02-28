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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e, userId) => {
    e.preventDefault();

    formData.id = userId;
    try {
      const response = await fetch(
        `http://localhost:8000/api/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      console.log("User data updated:", data);
      setUsers(
        users.map((user) => {
          if (user.id === userId) {
            user.name = formData.name;
            user.email = formData.email;
            user.message = formData.message;
          }
          return user;
        })
      );
      setShowForm(-1);
      // Update state or perform other actions as needed
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle error
    }
  };
  const deleteUser = async (e) => {
    const userId = e.target.parentElement.querySelector("#userId").innerText;
    try {
      const response = await fetch(
        `http://localhost:8000/api/delete/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      const data = await response.json();
      console.log("User deleted:", data);
      setUsers(users.filter((user) => user.id !== parseInt(userId)));
      // Update state or perform other actions as needed
    } catch (error) {
      console.error("Error deleting user:", error);
      // Handle error
    }
  };

  return (
    <div data-testid="users">
      <h2>Users</h2>
      <ul className="users">
        {users.map((user, key) => (
          <li key={user.id}>
            <strong>ID:</strong> <span id="userId">{user.id}</span>,
            <strong>Name:</strong> {user.name}, <strong>Email:</strong>{" "}
            {user.email}
            <button
              onClick={() => {
                showHideForm(key);
              }}
            >
              Edit
            </button>
            <button onClick={deleteUser}>Delete</button>
            {showForm === key && (
              <form
                key={user.id}
                onSubmit={(event) => handleSubmit(event, user.id)}
              >
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
        ))}
      </ul>
    </div>
  );
}

export default DisplayUsers;
