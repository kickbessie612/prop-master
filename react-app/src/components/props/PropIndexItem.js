import { Link } from 'react-router-dom';
import './PropIndex.css';

const PropIndexItem = ({ prop }) => {
  return (
    <div className='prop-index-item'>
      <Link to={`/props/${prop.id}`}>
        <div style={{ overflow: 'hidden' }}>
          <img
            className='prop-item-image'
            width={280}
            height={280}
            src={prop.image}
            alt={prop.name}
          />
        </div>
      </Link>
      <div className='prop-item-info'>
        <div className='prop-item-name'>{prop.name}</div>
        <div>Qty: {prop.quantity}</div>
        <div>Price: ${prop.weekly_price}/wk</div>
        <div style={{ color: prop.availability ? '#6f985e' : '#cb6346' }}>
          {prop.availability ? <div>Available</div> : <div>Unavailable</div>}
        </div>
      </div>
    </div>
  );
};

export default PropIndexItem;
