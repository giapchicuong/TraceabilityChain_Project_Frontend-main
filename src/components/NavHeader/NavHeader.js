import React from "react";
import "./navHeader.scss";
import { Container, Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../../services/userSevices";
import { toast } from "react-toastify";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
function NavHeader() {
  const address = useAddress();
  const account = useSelector((state) => state.account);

  const currentUser = useSelector((state) => state.account.userInfor.username);
  const walletAddress = useSelector(
    (state) => state.account.userInfor.walletAddress
  );

  const history = useHistory();
  const handleLogout = async () => {
    const res = await logoutUser();
    if (res && res.EC === 0) {
      toast.success(res.EM);
      history.push("/login");
    }
  };
  if (account && account.isAuthenticated === true) {
    return (
      <div className="header-container">
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto ">
                  <div>
                    <ConnectWallet
                      style={{
                        backgroundColor: "#f9fafb",
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
                    {walletAddress !== address ? (
                      <div className="text-danger">
                        Vui lòng kết nối đúng ví
                      </div>
                    ) : (
                      <div className="text-success">Kết nối ví thành công</div>
                    )}
                  </div>
                </Nav>
                <Nav className="me-right">
                  <Nav.Item exact className="nav-link">
                    Welcome {currentUser} ({walletAddress.slice(0, 4)}...
                    {walletAddress.slice(-4)}) !
                  </Nav.Item>
                  <NavDropdown title="Settings" id="basic-nav-dropdown">
                    <NavDropdown.Item>Change Password</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      <span> Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Container>
        </Navbar>
      </div>
    );
  } else {
    // return <Redirect to="/login"></Redirect>;
    return <></>;
  }
}

export default NavHeader;
