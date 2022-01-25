import React, { useState, useEffect } from "react";

import Constants from "../../app/constants/SystemConstant"
import UserModel from "./UserModal";
import FilterUser from "./FilterUser";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(0);
  const [keyword, setkeyword] = useState("");

  const getData = () => {
    fetch(`${Constants.BASE_URL_API}/users?keyword=${keyword}`)
      .then((response) => response.json())
      .then((result) => {
        let listUser = result?.data.map((user) => {
          return {
            id: user.id,
            name: user.displayName,
            email: user.email,
            phone: user.phone,
            gender: user.gender,
            imagePath: user.avatar,
          };
        });
        setUsers(listUser);
      });
  };

  useEffect(getData, [keyword]);

  const toggleModal = (id) => {
    if(Number.isInteger(id)){
      setUserId(id);
    }
    const modal = document.querySelector(".modal");
    modal.classList.toggle("hide");
  };

  const handleRemoveUser = (id) => {
    fetch(`${Constants.BASE_URL_API}/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          let newUsers = users.filter((item) => {
            return item.id !== id;
          });
          setUsers(newUsers);
        }
      });
  };

  const handleCreateUser = (data) => {
    if (data && Object.keys(data).length === 0) {
      console.log("empty object ...");
      return;
    }

    const formData = new FormData();
    formData.append("avatarFile", data.avatarFile);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("displayName", data.name);
    formData.append("phone", data.phone);

    fetch(`${Constants.BASE_URL_API}/users`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result create: ", result);
        if (result.success) {
          toggleModal();
          setUsers([...users, data]);
        }
      });
  };

  const handleEditUser = (data) => {
    const formData = new FormData();
    formData.append("avatarFile", data.avatarFile);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("id", data.id);
    formData.append("displayName", data.name);
    formData.append("phone", data.phone);

    fetch(`${Constants.BASE_URL_API}/users`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if(result.success){
          toggleModal();
          getData();
        }
      });
  };

  const handleFilterUser = (filter) => {
    setkeyword(filter.keyword);
  };

  return (
    <>
      <div className="container">
        <div className="filter">
          <FilterUser onFilter={handleFilterUser}></FilterUser>
          <div className="new_record">
            <a
              href="#"
              className="modal__open"
              onClick={() => toggleModal(0)}
              title="Create"
            >
              <i className="fa fa-plus"></i>
            </a>
          </div>
        </div>
        <div className="content">
          <span className="table_name">List users</span>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      {user.gender === 0
                        ? "Male"
                        : user.gender === 1
                        ? "Female"
                        : "Another"}
                    </td>
                    <td>
                      <a
                        href="#"
                        className="edit modal__open"
                        onClick={() => toggleModal(user.id)}
                        title="Edit"
                      >
                        <i className="fa fa-edit"></i>
                      </a>
                      <a
                        href="#"
                        className="remove"
                        onClick={() => handleRemoveUser(user.id)}
                        title="Remove"
                      >
                        <i className="fa fa-trash"></i>
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <UserModel
        userId={userId}
        onCloseModal={toggleModal}
        onUpdate={handleEditUser}
        onCreate={handleCreateUser}
      ></UserModel>
    </>
  );
}
