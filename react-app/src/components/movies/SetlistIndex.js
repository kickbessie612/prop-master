import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSetlists, deleteSetlist } from '../../store/setlists';
import PropIndexItem from '../props/PropIndexItem';

import './SetlistIndex.css';

const SetlistIndex = () => {
  const dispatch = useDispatch();
  const setlists = useSelector(state => Object.values(state.setlists));
  const [currentSetlistIndex, setCurrentSetlistIndex] = useState(0);

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this setlist?')) return;
    await dispatch(deleteSetlist(setlistsId));
    history.push('/setlists');
  };

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
              <div>{setlist.name}</div>
              <Link to={`/setlists/${setlist.id}/edit`}>
                <i class='fa-regular fa-pen-to-square'></i>
              </Link>
              <div>
                <button onClick={handleDelete}>Delete</button>
              </div>
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
