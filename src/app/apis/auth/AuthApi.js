import Constant from "../../constants/SystemConstant";

class AuthApi {
  Login(email, password) {
    return fetch(`${Constant.BASE_URL_API}/users/authenticate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password: password }),
    })
      .then((res) => res.json())
      .then((result) => {
        // if(result && result.success){
        //   localStorage.setItem("accessToken", result.data);
        // }
        return result;
      });
  }

  Logout() {
    localStorage.removeItem("accessToken");
  }
}

export default new AuthApi();
