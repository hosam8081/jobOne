import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Header, Sidebar } from "../components";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const {isOpen} = useSelector(state => state.user)

  return (
    <Container fluid>
      <Row>
        <Col xs={0} md={1} className={isOpen ? "side-open" : "d-none d-md-block"} style={{ height: "100vh", background: "#fff" }}>
          <Sidebar />
        </Col>
        <Col xs={12} md={11}>
          <Container>
            <Header />
            {children}
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
