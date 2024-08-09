import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminLogin from "@/app/components/AdminLogin";
import ManageAdmin from "./ManageAdmin";

const AdminPage = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser || currentUser.role !== 'USER'){
        return  <AdminLogin/>
    }
    return (
        <Container>
            <Row>
                <Col md={12}>
                 <ManageAdmin />
                </Col>
            </Row>
        </Container>
    );
}

export default AdminPage;