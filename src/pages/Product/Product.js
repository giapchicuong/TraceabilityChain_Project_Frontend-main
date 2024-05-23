import React, { useEffect, useState } from "react";
import "./product.scss";
import Card from "react-bootstrap/Card";
import { useStateContext } from "../../context";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loading from "../../components/Loading/Loading";
import NavbarPublic from "../../components/NavbarPublic/NavbarPublic";
import EmptyProduct from "../../components/Error/EmptyProduct";

const Product = () => {
  const { address, contract, searchProduct } = useStateContext();
  const [data, setData] = useState({});
  const { id } = useParams();

  const handleSearch = async () => {
    const data = await searchProduct({ id });
    console.log(data);
    setData(data);
  };

  useEffect(() => {
    handleSearch();
  }, [address, contract, id]);

  if (data === undefined) return <Loading />;
  if (Array.isArray(data) && data.length === 0) {
    return <EmptyProduct />;
  }
  const formatDate = (dateString) => {
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };
  return (
    <div className="product-page">
      <NavbarPublic />
      <div className="product-container">
        {data !== null && data.length > 0 ? (
          <Card className="product-card">
            <Card.Img variant="top" src={data[0].image} alt={data[0].name} />
            <Card.Body>
              <Card.Title className="product-title">
                Tên sản phẩm: {data[0].name}
              </Card.Title>
              <Card.Text className="product-description">
                Mô tả sản phẩm: {} {data[0].description}
              </Card.Text>
              <Card.Text className="product-type">
                Loại sản phẩm: {}
                {data[0].typeProduct}
              </Card.Text>

              <Card.Text className="product-price">
                Giá sản phẩm: {data[0].price} đ
              </Card.Text>
              <Card.Text className="product-type">
                Ngày đăng sản phẩm: {}
                {formatDate(data[0].date)}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Product;
