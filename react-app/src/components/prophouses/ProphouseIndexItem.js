import { Link } from 'react-router-dom';
import './ProphouseIndex.css';

const ProphouseIndexItem = ({ prophouse }) => {
  return (
    <div>
      <Link to={`/prophouses/${prophouse.id}`}>
        <div>
          <img width={300} src={prophouse.logo} alt={prophouse.name} />
        </div>
        <div>{prophouse.name}</div>
      </Link>
    </div>
  );
};

export default ProphouseIndexItem;
