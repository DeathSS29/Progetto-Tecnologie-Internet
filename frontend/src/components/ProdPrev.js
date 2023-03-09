import { Badge, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function ProdPrev({ _id, category, name, pictures }) {
  return (
    <LinkContainer
      to={`/products/${_id}`}
      style={{
        cursor: 'pointer',
        width: '250px',
        margin: '20px',
        borderRadius: '15px',
      }}
    >
      <Card style={{ margin: '10px' }}>
        <Card.Img
          variant="top"
          className="prodprev-img"
          src={pictures[0].url}
          style={{ height: '250px', objectFit: 'cover', marginBottom: '-40px' }}
        />
        <Card.Body style={{ marginTop: '40px' }}>
          <Card.Title style={{ marginBottom: ' 10px' }}>{name}</Card.Title>
          <Badge bg="info" text="dark">
            {category}
          </Badge>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProdPrev;
