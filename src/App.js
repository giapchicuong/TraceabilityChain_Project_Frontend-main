import React from "react";
import "./app.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavHeader from "./components/NavHeader/NavHeader";
import Sidebar from "./components/Sidebar/Sidebar";
import AppRoutes from "./routes/AppRoutes";
import { useSelector } from "react-redux";
const App = () => {
  const account = useSelector((state) => state.account);

  return (
    <>
      <>
        <>
          {account && account.isAuthenticated ? (
            <>
              <div className="app">
                <div class="row">
                  <div class="col-2">
                    <div className="app-left">
                      <Sidebar />
                    </div>
                  </div>
                  <div class="col-10">
                    <div className="app-right">
                      <div className="app-header">
                        <NavHeader />
                      </div>
                      <div className="app-container">
                        <AppRoutes />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <AppRoutes />
            </>
          )}
        </>
      </>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
