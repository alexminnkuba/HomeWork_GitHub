import React, { useState, useEffect } from "react";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleUserSelect = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedUser(data);
        setPosts([]);
      })
      .catch((error) => console.error("Error fetching user details:", error));
  };

  const handleLoadPosts = () => {
    if (selectedUser) {
      fetch(
        `https://jsonplaceholder.typicode.com/users/${selectedUser.id}/posts`
      )
        .then((response) => response.json())
        .then((data) => setPosts(data))
        .catch((error) => console.error("Error fetching posts:", error));
    }
  };

  return (
    <div className="container">
      <h1>Таблица пользователей placeholder</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              onClick={() => handleUserSelect(user.id)}
              className="user-row"
            >
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="user-details">
        <h2>Подробная информация о пользователе</h2>
        {selectedUser ? (
          <div>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Username:</strong> {selectedUser.username}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Address:</strong> {selectedUser.address.street},{" "}
              {selectedUser.address.suite}, {selectedUser.address.city},{" "}
              {selectedUser.address.zipcode}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone}
            </p>
            <p>
              <strong>Website:</strong> {selectedUser.website}
            </p>
            <p>
              <strong>Company:</strong> {selectedUser.company.name} -{" "}
              {selectedUser.company.catchPhrase}
            </p>
            <button onClick={handleLoadPosts} className="load-posts-btn">
              Отобразить посты пользователя
            </button>
          </div>
        ) : (
          <p>Выберите пользователя из таблицы</p>
        )}
      </section>

      <section className="user-posts">
        <h2>Посты пользователя</h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Посты не загружены</p>
        )}
      </section>
    </div>
  );
};

export default Home;
