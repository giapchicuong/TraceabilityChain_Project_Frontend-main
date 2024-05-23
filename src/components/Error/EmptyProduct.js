import React from "react";
import { Alert } from "react-bootstrap";

const EmptyProduct = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Alert variant="danger">
        <Alert.Heading>
          The product does not exist, please try again later!
        </Alert.Heading>
        <p>404 NOT FOUND</p>
      </Alert>
    </div>
  );
};

export default EmptyProduct;
