import React from "react";
import { Layout, Filter, JobsContainer } from "../components";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <>
      <Layout>
        <Container>
          <Filter />
          <JobsContainer />
        </Container>
      </Layout>
    </>
  );
};

export default Home;
