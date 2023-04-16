import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSetlists } from '../../store/setlists';
import PropIndexItem from '../props/PropIndexItem';

import './SetlistIndex.css';

const SetlistIndex = () => {
  const dispatch = useDispatch();
  const setlists = useSelector(state => Object.values(state.setlists));
  const [currentSetlistIndex, setCurrentSetlistIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchSetlists());
  }, [dispatch]);

  if (setlists.length === 0) {
    return null;
  }

  return (
    <div className='setlist-index-container'>
      <div className='setlist-index-create-button-container'>
        <Link to='/setlists/new'>
          <button>Create a Setlist</button>
        </Link>
      </div>
      <div className='setlist-index-content-container'>
        <div className='setlist-index-setlists'>
          {setlists.map((setlist, index) => (
            <div
              className={`setlist-index-setlist${
                index === currentSetlistIndex ? ' active' : ''
              }`}
              key={setlist.id}
              onClick={() => setCurrentSetlistIndex(index)}
            >
              {setlist.name}
            </div>
          ))}
        </div>
        <div className='setlist-index-props'>
          {setlists.length > 0 &&
            setlists[currentSetlistIndex].props.length > 0 &&
            setlists[currentSetlistIndex].props.map(prop => (
              <PropIndexItem prop={prop} key={prop.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SetlistIndex;
