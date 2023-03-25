import { Link } from 'react-router-dom';
import './PropIndex.css';

const PropIndexItem = ({ prop }) => {
  return (
    <div>
      <Link to={`/props/${prop.id}`}>
        <div>
          <img src={prop.image} alt={prop.name} />
        </div>
        <div>{prop.name}</div>
      </Link>
      <div>
        Qty: {prop.quantity} | Price: ${prop.weekly_price}/wk |{' '}
        {prop.availability}
      </div>
    </div>
  );
};

export default PropIndexItem;
