import React from "react";

import { Row, Col, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Row>
      <Col>
        <div style={{ textAlign: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      </Col>
    </Row>
  );
}
