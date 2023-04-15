import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSetlists } from '../../store/setlists';

import './SetlistIndex.css';

const SetlistIndex = () => {
  const dispatch = useDispatch();
  const setlists = useSelector(state => Object.values(state.setlists));

  useEffect(() => {
    dispatch(fetchSetlists());
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
      {setlists.map(setlist => (
        <Link key={setlist.id} to={`/setlists/${setlist.id}`}>
          <div>{setlist.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default SetlistIndex;
