import React, { useEffect, useState } from "react";
import "./products.scss";
import { Col, Form, Row } from "react-bootstrap";
import ModalProduct from "./ModalProduct.js";
import ModalDelete from "./ModalDelete.js";
import { useStateContext } from "../../context/index.js";
import ModalProductQR from "./ModalProductQR.js";
import { useSelector } from "react-redux";
import ErrorConnectWallet from "../../components/Error/ErrorConnectWallet.js";
import Loading from "../../components/Loading/Loading.js";
const Products = () => {
  const { address, contract, getAllProductByOwner } = useStateContext();
  const walletAddress = useSelector(
    (state) => state.account.userInfor.walletAddress
  );
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    const data = await getAllProductByOwner(address);
    setLoading(false);
    setListProducts(data);
  };

  useEffect(() => {
    if (contract) fetchProducts();
  }, [address, contract]);

  // Data Product
  const [listProducts, setListProducts] = useState([]);
  // Modal Product
  const [isShowModalProductQR, setIsShowModalProductQR] = useState(false);
  // Modal Product QR
  const [isShowModalProduct, setIsShowModalProduct] = useState(false);

  // Modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState([]);
  const [dataModal, setDataModal] = useState([]);

  const handleHideModalProduct = (item) => {
    setIsShowModalProduct(!isShowModalProduct);
    setDataModal(item);
    fetchProducts();
  };
  const handleCreateProduct = () => {
    setIsShowModalProduct(!isShowModalProduct);
  };

  const handleHideModalProductQR = (item) => {
    setIsShowModalProductQR(!isShowModalProductQR);
    setDataModal(item);
  };
  const handleHideModalDelete = () => {
    setIsShowModalDelete(!isShowModalDelete);
  };
  const handleDeleteProduct = (item) => {
    setIsShowModalDelete(!isShowModalDelete);
    setDataModalDelete(item);
  };

  const formatDate = (dateString) => {
    const day = dateString.substring(0, 2);
    const month = dateString.substring(2, 4);
    const year = dateString.substring(4, 8);

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };
  if (walletAddress !== address) return <ErrorConnectWallet />;
  if (loading) return <Loading />;

  return (
    <div className="products-container">
      <div className="table-container">
        <div className="table">
          <div className="add-product">
            <h3>Products</h3>
            <button
              className="btn btn-secondary"
              onClick={() => handleCreateProduct()}
            >
              <i class="fa fa-plus" aria-hidden="true"></i>New Product
            </button>
          </div>

          <div className="action-product">
            <Form inline>
              <Row>
                <Col xs="auto">
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                  />
                </Col>
              </Row>
            </Form>
            <select class="form-select" aria-label="Default select example">
              <option selected>Sort by: Featured</option>
              <option value="1">Newest</option>
              <option value="1">Oldest</option>
            </select>
          </div>
          <table class="table table-borderless table-hover">
            <thead>
              <tr>
                <th scope="col">STT</th>
                <th scope="col">Name Product</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {listProducts &&
                listProducts.length > 0 &&
                listProducts.map((item, index) => {
                  return (
                    <tr key={`rows-${index}`}>
                      <th scope="row"> {index + 1}</th>
                      <td className="product-text">
                        <div className="image-product">
                          <img
                            src={item.image}
                            className="image"
                            width={50}
                            alt=""
                          />
                          {item.name}
                        </div>
                      </td>
                      <td className="product-text">{item.description}</td>
                      <td>{item.typeProduct}</td>
                      <td>{item.price} đ</td>
                      <td>{formatDate(item.date)}</td>
                      <td className="actions">
                        <span
                          title="View"
                          className="view"
                          onClick={() => handleHideModalProductQR(item)}
                        >
                          <i class="fa fa-eye" aria-hidden="true"></i>
                        </span>
                        <span
                          title="Delete"
                          className="delete"
                          onClick={() => handleDeleteProduct(item)}
                        >
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <ModalProduct
        show={isShowModalProduct}
        onHide={handleHideModalProduct}
        dataModal={dataModal}
      />
      <ModalProductQR
        show={isShowModalProductQR}
        onHide={handleHideModalProductQR}
        dataModal={dataModal}
      />
      <ModalDelete
        show={isShowModalDelete}
        dataModalDelete={dataModalDelete}
        onHide={handleHideModalDelete}
      />
    </div>
  );
};

export default Products;
