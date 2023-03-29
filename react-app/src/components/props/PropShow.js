import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchProp, deleteProp } from '../../store/props';
import {
  fetchSetlists,
  setlistAddProp,
  setlistRemoveProp
} from '../../store/setlists';

import './PropShow.css';

const PropShow = () => {
  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();
  const { propId } = useParams();
  const propsObj = useSelector(state => state.props);

  let setlists = useSelector(state => Object.values(state.setlists));

  const [selectedSetlist, setSelectedSetlist] = useState('');

  useEffect(() => {
    dispatch(fetchProp(propId));
    if (sessionUser && !sessionUser.is_manager) {
      dispatch(fetchSetlists());
    }
  }, [dispatch, propId, sessionUser]);

  const prop = propsObj[propId];

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this prop?')) return;
    await dispatch(deleteProp(propId));
    history.push('/props');
  };

  const handleSetlistSelect = setlistId => {
    setSelectedSetlist(setlistId);
  };

  const handleAddButton = async e => {
    if (!selectedSetlist) {
      return;
    }
    await dispatch(setlistAddProp(selectedSetlist, propId));
    setSelectedSetlist('');
    dispatch(fetchProp(propId));
  };

  const handleRemoveButton = async setlistId => {
    await dispatch(setlistRemoveProp(setlistId, propId));
    setSelectedSetlist('');
    dispatch(fetchProp(propId));
  };

  if (!prop || !prop.setlists) {
    return null;
  }
  // only show setlists in the dropdown this prop hasn't been added to
  setlists = setlists.filter(
    obj1 => !prop.setlists.some(obj2 => obj1.id === obj2.id)
  );

  return (
    <>
      <div>
        <div>
          <h2>{prop.name}</h2>

          <div>
            {prop.color},{prop.material},{prop.description}
          </div>

          <div>{prop.availability ? 'available' : 'not available'}</div>

          <div>{prop.prophouse.name}</div>

          {sessionUser && prop.prophouse_id === sessionUser.prophouse_id && (
            <>
              <div>
                <button>
                  <Link to={`/props/${prop.id}/edit`}>Edit</Link>
                </button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          )}
          <hr />
          <div>
            <img width={300} src={prop.image} alt={prop.name} />
          </div>
          <hr />
          <div>
            <select onChange={e => handleSetlistSelect(e.target.value)}>
              <option value=''>Select Setlist</option>
              {setlists.map(setlist => (
                <option key={setlist.id} value={setlist.id}>
                  {setlist.name}
                </option>
              ))}
            </select>
            <button onClick={handleAddButton}>Add To Setlist</button>
          </div>
          {sessionUser && !sessionUser.is_manager && (
            <div>
              {prop.setlists.map(setlist => (
                <div key={setlist.id}>
                  {setlist.name}{' '}
                  <button onClick={e => handleRemoveButton(setlist.id)}>
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PropShow;
