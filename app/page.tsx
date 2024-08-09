import { Col, Container, Row } from "react-bootstrap";
import Lead from "./components/Lead";

const Home = () => {
  return (
   <Container>
    <Row className="d-flex align-items-center justify-content-center">
      <Col md={4} >
      <Lead />
      </Col>
    </Row>

   </Container>
  );
};

export default Home;
