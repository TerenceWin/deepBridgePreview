import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

function Footer() {
  return (
    <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a
            href="https://www.linkedin.com/company/deep-bridge/"
            className="me-4 text-reset"
          >
            <MDBIcon fab icon="linkedin" />
          </a>
        </div>
      </section>

      <section className="">
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className=" mb- mx-auto">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
                Deep-Bridge
              </h6>
              <p>
                At Deep-Bridge, we’re committed to helping traditional
                businesses thrive in a digital-first world. Our AI-powered CRM
                solutions are designed to simplify communication, automate
                workflows, and drive smarter decision-making—without requiring
                any technical expertise.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="4" xl="3" className=" mb-4 mx-auto">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" />
              </h6>
              <p>
                Whether you're in manufacturing or another traditional industry,
                Deep-Bridge makes AI adoption seamless. From email and chat
                automation to predictive insights and personalized support, we
                bridge the gap between legacy operations and future-ready
                business growth.
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      ></div>
    </MDBFooter>
  );
}

export default Footer;
