import React, { useEffect, useState } from "react";
import "./login.scss";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../services/userSevices";
import { toast } from "react-toastify";
import { fetchAccountRedux } from "../../redux/slices/accountSlice";

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const account = useSelector((state) => state.account);
  const defaultInput = {
    valueLogin: "",
    password: "",
  };
  const defaultValidInput = {
    isValidLogin: true,
    isValidPassword: true,
  };

  const [showPassword, setShowPassword] = useState(false);
  const [userLogin, setUserLogin] = useState(defaultInput);
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const handleCreateNewAccount = () => {
    history.push("./register");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!userLogin.valueLogin) {
      toast.error("Email or Phone is required");
      setObjCheckInput({ ...defaultValidInput, isValidLogin: false });
      return false;
    }
    if (!userLogin.password) {
      toast.error("Password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    let check = isValidInputs();
    if (check) {
      let response = await loginUser(userLogin);
      if (response && response.EC === 0) {
        await dispatch(fetchAccountRedux());
        toast.success(response?.EM);
        history.push("./");
      } else {
        toast.error(response?.EM);
      }
    }
  };
  useEffect(() => {
    if (account && account.isAuthenticated === true) {
      history.push("./");
    }
  }, []);
  return (
    <div className="login-containter">
      <div className="form">
        <form>
          <div className="mb-3">
            <h4>Sign in to Dashboard</h4>
          </div>
          <div className="mb-3">
            <label>
              Don’t have an account?{" "}
              <span onClick={() => handleCreateNewAccount()}>Get started</span>
            </label>
          </div>
          <div className="mb-3 icon-login">
            <div className="icon">
              <i className="fa fa-google btn btn-danger" aria-hidden="true"></i>
            </div>
            <div className="icon">
              <i class="fa fa-facebook btn btn-primary" aria-hidden="true"></i>
            </div>
            <div className="icon">
              <i class="fa fa-twitter btn btn-primary" aria-hidden="true"></i>
            </div>
          </div>
          <div className="mb-3 separator">
            <label>OR</label>
          </div>
          <div className="input-login mb-3">
            <input
              type="email"
              className={
                objCheckInput.isValidLogin
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder=" Email address or Phone Number"
              value={userLogin.valueLogin}
              onChange={(e) =>
                setUserLogin({ ...userLogin, valueLogin: e.target.value })
              }
            />
          </div>
          <div className="input-login mb-3 d-flex align-items-center">
            <input
              type={showPassword ? "text" : "password"}
              className={
                objCheckInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={userLogin.password}
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
            />
            <i
              className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
              aria-hidden="true"
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="mb-3 text-end">
            <label>
              <span>Forgot password?</span>
            </label>
          </div>
          <div
            type="submit"
            className="login btn"
            onClick={() => handleLogin()}
          >
            Login
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
