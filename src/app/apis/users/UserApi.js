import Constant from "../../constants/SystemConstant";

class UserApi {
  async GetUserByName(username) {
    return await fetch(
      `${Constant.BASE_URL_API}/users/user?username=${username}`
    )
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  async GetUserById(id) {
    return await fetch(`${Constant.BASE_URL_API}/users/${id}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  async Create(data) {
    return await fetch(`${Constant.BASE_URL_API}/users`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  async Update(id, data) {
    return await fetch(`${Constant.BASE_URL_API}/users/${id}`, {
      method: "PUT",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }

  async Delete(id) {
    return await fetch(`${Constant.BASE_URL_API}/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }
}

export default new UserApi();
