import React, { useState, useEffect, memo } from "react";
import Constants from "../../app/constants/SystemConstant";

function User(props) {
  const { userId, onCloseModal, onUpdate, onCreate } = props;

  const [user, setUser] = useState({});

  function handleSubmit(e) {
    e.preventDefault();
    if (userId > 0) {
      onUpdate(user);
    } else {
      onCreate(user);
    }
  }

  // get user
  useEffect(() => {
    if (userId > 0) {
      fetch(`${Constants.BASE_URL_API}/users/${userId}`)
        .then((response) => response.json())
        .then((result) => {
          if (result.success) {
            let user = {
              id: result.data.id,
              email: result.data.email,
              name: result.data.displayName,
              phone: result.data.phone,
              gender: result.data.gender,
              imagePath: Constants.BASE_URL + result.data.avatar,
            };
            setUser(user);
          }
        });
    }

    return () => {
      setUser({ email: "", name: "", phone: "", gender: 0, imagePath: "" });
    };
  }, [userId]);

  useEffect(() => {
    // clean up function
    return () => {
      user.avatarFile && URL.revokeObjectURL(user.avatarFile.preview);
    };
  }, [user.avatarFile]);

  const onChangeImage = (e) => {
    let file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setUser({ ...user, avatarFile: file, imagePath: file.preview });
    file = null;
  };

  const onChangeInput = (data) => {
    setUser({
      ...user,
      [data.field]: data.value,
    });
  };

  return (
    <>
      <div className="modal hide">
        <div className="modal__inner">
          <div className="modal__header">
            <h3>{user.id > 0 ? "Update Profile" : "Create Profile"}</h3>
            <label className="icon__close" onClick={onCloseModal}>
              &#x2715;
            </label>
          </div>
          <div className="modal__body">
            <div className="modal__content">
              <div className="main">
                <div className="avatar_container">
                  <div className="image">
                    <img src={user?.imagePath} alt="" />
                  </div>
                  <div className="upload_avatar">
                    <label>
                      Change avatar
                      <input
                        type="file"
                        onChange={onChangeImage}
                      />
                    </label>
                  </div>
                  <span className="name">{user?.name}</span>
                  <span>{user?.email}</span>
                </div>
                <div className="profile_info">
                  <div className="details">
                    <h3 className="profile_title">Profile Information</h3>
                    <form action="" onSubmit={handleSubmit}>
                      <div className="feild_group">
                        <label>Name</label>
                        <input
                          type="text"
                          value={user?.name}
                          onChange={(e) =>
                            onChangeInput({
                              field: "name",
                              value: e.target.value,
                            })
                          }
                          placeholder="Name"
                        />
                        <span className="error_mes"></span>
                      </div>
                      <div className="col-2">
                        <div className="feild_group">
                          <label>Phone number</label>
                          <input
                            type="tel"
                            value={user?.phone}
                            onChange={(e) =>
                              onChangeInput({
                                field: "phone",
                                value: e.target.value,
                              })
                            }
                            placeholder="Phone number"
                          />
                          <span className="error_mes"></span>
                        </div>
                        <div className="feild_group">
                          <label>Gender</label>
                          <select
                            value={user?.gender}
                            onChange={(e) =>
                              onChangeInput({
                                field: "gender",
                                value: e.target.value,
                              })
                            }
                          >
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                            <option value={2}>Another</option>
                          </select>
                          <span className="error_mes"></span>
                        </div>
                      </div>
                      <div className="feild_group">
                        <label>Email</label>
                        <input
                          type="email"
                          value={user?.email}
                          onChange={(e) =>
                            onChangeInput({
                              field: "email",
                              value: e.target.value,
                            })
                          }
                          placeholder="Email"
                        />
                        <span className="error_mes"></span>
                      </div>
                      <button className="save">Save Profile</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(User);
