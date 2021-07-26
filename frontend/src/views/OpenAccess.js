import React from "react";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  InputGroup,
  FormControl
} from "react-bootstrap";

import play from "assets/img/play.png";
import { InputGroupText } from "reactstrap";
function OpenAccess() {
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Open Accesses</Card.Title>
                <p className="card-category">
                  Cloud systems & last access tests
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Container>
                  <Button>
                    Run all
                    <img className="pl-2" src={require("assets/img/play.png").default}/>
                  </Button>
                  <InputGroup  className="mb-3 pt-4">
                    <FormControl  placeholder="System Name"    />
                    <InputGroup.Text><img src={require("assets/img/search.png").default}/></InputGroup.Text>
                  </InputGroup>

                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">System Name</th>
                      <th className="border-0">Last Status</th>
                      <th className="border-0">Team Name</th>
                      <th className="border-0">Contact</th>
                      <th className="border-0">Check Now</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>OCP-3.11</td>
                      <td>ACTIVE</td>
                      <td>Openshift</td>
                      <td>Zeif</td>
                      <td><Button>
                        <img
                          src={require("assets/img/play.png").default}
                          alt="..."/>
                      </Button></td>
                    </tr>
                     </tbody>
                </Table>
                </Container>   </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default OpenAccess;
