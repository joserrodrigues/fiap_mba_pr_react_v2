import { useState } from "react";
import "./Home.css";
import CustomLabel from "../../Components/CustomLabel/CustomLabel";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

function App() {
  const [count, setCount] = useState<number>(0);

  const addCount = () => {
    setCount((count) => count + 1);
  };

  let infoCards = [];
  for (let index = 0; index < 10; index++) {
    infoCards.push(
      <Col key={index} sm={12} md={6} lg={3}>
        <Card style={{ width: "18rem", marginBottom: 10 }}>
          <Card.Img
            variant="top"
            src="https://picsum.photos/seed/picsum/300/200"
          />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    );        
  }

  return (
    <Container className="App">
      <Row>
        <Col sm={12}>
          <CustomLabel info={"Contador = " + count} />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <button onClick={() => addCount()}> Add Info</button>
        </Col>
      </Row>
      <Row>{infoCards}</Row>
    </Container>
  );
}

export default App;
