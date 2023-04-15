import { Link } from 'react-router-dom';
import './ProphouseIndex.css';

const ProphouseIndexItem = ({ prophouse }) => {
  return (
    <div className='prophouse-index-card'>
      <div
        style={{
          width: 500,
          height: 550,
          backgroundSize: 'cover',
          backgroundPositionX: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: `url(${prophouse.image})`
        }}
      ></div>
      <div className='prophouse-index-name'>{prophouse.name}</div>
      <Link to={`/prophouses/${prophouse.id}`}>
        <button className='prophouse-index-button'>View Prophouse</button>
      </Link>
    </div>
  );
};

export default ProphouseIndexItem;
