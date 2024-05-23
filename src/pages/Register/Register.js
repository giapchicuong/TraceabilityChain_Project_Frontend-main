import React, { useEffect, useState } from "react";
import "./register.scss";
import { useHistory } from "react-router-dom";
import { registerNewUser } from "../../services/userSevices";
import { toast } from "react-toastify";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const Register = () => {
  const history = useHistory();
  const handleLoginAccount = () => {
    history.push("./login");
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const address = useAddress();
  const [walletAddress, setWalletAddress] = useState(address);
  const defaultInput = {
    email: "",
    password: "",
    rePassword: "",
    username: "",
    phone: "",
    address: "",
    sex: "",
    groupId: "",
    walletAddress: "",
  };
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidUsername: true,
    isValidPassword: true,
    isValidRePassword: true,
    isValidGroupId: true,
    isValidWalletAddress: true,
  };
  const [userRegister, setUserRegister] = useState(defaultInput);
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  const isValidInputs = () => {
    setObjCheckInput(defaultValidInput);
    if (!userRegister.email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(userRegister.email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }

    if (!userRegister.phone) {
      toast.error("Phone is required");
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      return false;
    }

    if (!userRegister.username) {
      toast.error("Username is required");
      setObjCheckInput({ ...defaultValidInput, isValidUsername: false });
      return false;
    }

    if (!userRegister.password) {
      toast.error("Password is required");
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      return false;
    }
    if (userRegister.rePassword !== userRegister.password) {
      toast.error("Your password is not the same");
      setObjCheckInput({ ...defaultValidInput, isValidRePassword: false });
      return false;
    }
    if (!userRegister.groupId) {
      toast.error("Role is required");
      setObjCheckInput({ ...defaultValidInput, isValidGroupId: false });
      return false;
    }
    if (!walletAddress) {
      toast.error("Wallet address is required");
      setObjCheckInput({ ...defaultValidInput, isValidWalletAddress: false });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    let check = isValidInputs();
    if (check) {
      let response = await registerNewUser({
        ...userRegister,
        walletAddress: walletAddress,
      });
      if (response.EC === 0) {
        toast.success(response.EM);
        history.push("./login");
      } else {
        toast.error(response.EM);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };
  useEffect(() => {
    setWalletAddress(address);
  }, [address]);

  return (
    <div className="register-containter">
      <div className="form">
        <form>
          <div className="mb-3">
            <h4>Sign up to Dashboard</h4>
          </div>
          <div className="mb-3">
            <label>
              Do you already have an account?{" "}
              <span onClick={() => handleLoginAccount()}> Log in!</span>
            </label>
          </div>
          <div className="mb-3">
            <input
              type="email"
              className={
                objCheckInput.isValidEmail
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder=" Email address"
              value={userRegister.email}
              onChange={(e) =>
                setUserRegister({ ...userRegister, email: e.target.value })
              }
            />
          </div>
          <div className="mb-3 d-flex gap-2">
            <input
              type="text"
              className={
                objCheckInput.isValidPhone
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder=" Phone number"
              value={userRegister.phone}
              onChange={(e) =>
                setUserRegister({ ...userRegister, phone: e.target.value })
              }
            />
            <input
              type="text"
              className={
                objCheckInput.isValidUsername
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder=" Username"
              value={userRegister.username}
              onChange={(e) =>
                setUserRegister({ ...userRegister, username: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder=" Address address"
              value={userRegister.address}
              onChange={(e) =>
                setUserRegister({ ...userRegister, address: e.target.value })
              }
            />
          </div>
          <div className="mb-3 d-flex  align-items-center">
            <input
              type={showPassword ? "text" : "password"}
              className={
                objCheckInput.isValidPassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder="Password"
              value={userRegister.password}
              onChange={(e) =>
                setUserRegister({ ...userRegister, password: e.target.value })
              }
            />
            <i
              className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
              aria-hidden="true"
              onClick={togglePasswordVisibility}
            ></i>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <input
              type={showRePassword ? "text" : "password"}
              className={
                objCheckInput.isValidRePassword
                  ? "form-control"
                  : "form-control is-invalid"
              }
              placeholder=" Re - Password"
              value={userRegister.rePassword}
              onChange={(e) =>
                setUserRegister({ ...userRegister, rePassword: e.target.value })
              }
            />
            <i
              className={showRePassword ? "fa fa-eye" : "fa fa-eye-slash"}
              aria-hidden="true"
              onClick={toggleRePasswordVisibility}
            ></i>
          </div>
          <div className="mb-3">
            <select
              className={
                objCheckInput.isValidGroupId
                  ? "form-select py-2"
                  : "form-select py-2 is-invalid"
              }
              aria-label="Default select example"
              value={userRegister.groupId}
              onChange={(e) =>
                setUserRegister({
                  ...userRegister,
                  groupId: e.target.value,
                })
              }
            >
              <option selected>Select your role</option>
              <option value="2">Consumer</option>
              <option value="3">Retailer</option>
              <option value="4">Distributor</option>
              <option value="5">Manufacturer</option>
            </select>
          </div>
          <div
            className="btn-group d-flex gap-2 mb-3"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="male"
              autocomplete="off"
              value="0"
              onChange={(e) =>
                setUserRegister({ ...userRegister, sex: e.target.value })
              }
            />
            <label className="btn btn-outline-primary" for="male">
              Male
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="female"
              autocomplete="off"
              value="1"
              onChange={(e) =>
                setUserRegister({ ...userRegister, sex: e.target.value })
              }
            />
            <label className="btn btn-outline-primary" for="female">
              Female
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="other"
              autocomplete="off"
              value="2"
              onChange={(e) =>
                setUserRegister({ ...userRegister, sex: e.target.value })
              }
            />
            <label className="btn btn-outline-primary" for="other">
              Other
            </label>
          </div>
          <div
            className={
              objCheckInput.isValidWalletAddress
                ? " form-control"
                : "form-control is-invalid"
            }
          >
            <ConnectWallet
              style={{
                backgroundColor: "white",
                width: "100%",
                color: "black",
                border: "none",
                padding: "5px",
              }}
              theme={"light"}
              modalSize={"wide"}
              showThirdwebBranding={false}
              btnTitle={"Please connect your wallet"}
            />
          </div>
          <div
            type="submit"
            className="btn-register btn"
            onClick={() => handleRegister()}
          >
            Register
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
