import React from "react";
import { Alert } from "react-bootstrap";

const Error = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>404 NOT FOUND</p>
      </Alert>
    </div>
  );
};

export default Error;
