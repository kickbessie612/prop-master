import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSetlists } from '../../store/setlists';

import './SetlistIndex.css';

const SetlistIndex = () => {
  const dispatch = useDispatch();

  const [setlists, setSetlists] = useState([]);
  const [currentSetlistIndex, setCurrentSetlistIndex] = useState(0);

  useEffect(async () => {
    setSetlists(await dispatch(fetchSetlists()));
  }, [dispatch]);

  if (setlists.length === 0) {
    return null;
  }

  return (
    <div className='setlist-index-holder'>
      <div className='setlist-index-title'>
        <div>Your Setlists</div>
        <Link to='/setlists/new'>
          <button>Create a Setlist</button>
        </Link>
      </div>
      <div className='setlist-index-content'>
        <div className='setlist-name-holder'>
          {setlists.map((setlist, index) => (
            <div
              className={`setlist-index-item${
                index === currentSetlistIndex ? ' active' : ''
              }`}
              key={setlist.id}
              onClick={e => setCurrentSetlistIndex(index)}
            >
              {setlist.name}
            </div>
          ))}
        </div>
        <div className='setlist-prop-list'>
          {setlists.length > 0 &&
            setlists[currentSetlistIndex].props.length > 0 &&
            setlists[currentSetlistIndex].props.map(prop => (
              <div key={prop.id}>
                <div>{prop.name}</div>
                <img src={prop.image} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SetlistIndex;
