import { Container, Row, Col, Image } from "react-bootstrap";

function MainBootstrap() {
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col md={4}>
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
            alt="Mujer sonriente con fondo natural"
            fluid
            rounded
          />
        </Col>
        <Col md={8}>
          <h2>Bienvenidos a Siempre Bella</h2>
          <p>
            En Siempre Bella, nos dedicamos a ofrecer productos de belleza y cuidado personal de alta calidad para ayudarte a sentirte increíble todos los días.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;
