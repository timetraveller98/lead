import { Col, Container, Row } from "react-bootstrap";
import Product from "./components/Lead";
import AdminHeading from "./components/AdminHeading";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";
const Home = async() => {
  const session = await getServerSession(authOptions)
  return (
    <Container className="border my-2">
      <Row >
        <Col md={12}>
          <div>
            <AdminHeading title="Product Form" center />
          </div>
        </Col>
      </Row>
      <hr />
      <Row className="d-flex align-items-center justify-content-center">
        <Col md={4}>
          <Product userId={session?.user.id} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
