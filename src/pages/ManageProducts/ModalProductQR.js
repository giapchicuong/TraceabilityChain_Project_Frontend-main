import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
function ModalProductQR(props) {
  const { dataModal, show, onHide } = props;
  const qrCodeRef = useRef(null);
  const downloadQRCode = () => {
    htmlToImage
      .toPng(qrCodeRef.current)
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `product-${dataModal?.pId}.png`;
        link.click();
        onHide();
      })
      .catch(function (error) {
        console.error("Error generating QR code:", error);
      });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
          <Modal.Title>{dataModal?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="center" ref={qrCodeRef}>
          <QRCode
            value={`https://traceabilitychain-project-frontend-main.onrender.com/public/product/${dataModal?.pId}`}
            size={300}
            className="center"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
          <Button variant="primary" onClick={downloadQRCode}>
            Download QR Code
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalProductQR;
