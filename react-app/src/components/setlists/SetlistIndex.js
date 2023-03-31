import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSetlists } from '../../store/setlists';

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
    <>
      <h1>Setlists</h1>
      <Link to='/setlists/new'>
        <button>Add Setlist</button>
      </Link>
      {setlists.map(setlist => (
        <Link key={setlist.id} to={`/setlists/${setlist.id}`}>
          <h2>{setlist.name}</h2>
        </Link>
      ))}
    </>
  );
};

export default SetlistIndex;
