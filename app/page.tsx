import { Col, Container, Row } from "react-bootstrap";
import Lead from "./components/Lead";
import AdminHeading from "./components/AdminHeading";

const Home = () => {
  return (
    <Container className="border my-2">
      <Row >
        <Col md={12}>
          <div>
            <AdminHeading title="Add Product" center />
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={4}>
          <Lead />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
