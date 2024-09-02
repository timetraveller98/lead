import { Container, Row, Col } from "react-bootstrap";
import { getCurrentUser } from "@/actions/getCurrentUser";
import AdminLogin from "@/app/components/AdminLogin";
import ManageAdmin from "./ManageAdmin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/auth";

const AdminPage = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser || currentUser.role !== 'USER'){
        return  <AdminLogin/>
    }
    const session = await getServerSession(authOptions)
    return (
        <Container>
            <Row>
                <Col md={12}>
                 <ManageAdmin email={session?.user.email} />
                </Col>
            </Row>
        </Container>
    );
}

export default AdminPage;