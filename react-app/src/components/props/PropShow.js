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

  if (!prop) {
    return null;
  }

  // only show setlists in the dropdown this prop hasn't been added to
  if (prop.setlists) {
    setlists = setlists.filter(
      setlist =>
        !prop.setlists.some(currentSetlist => setlist.id === currentSetlist.id)
    );
  }

  return (
    <div>
      <div className='propshow-background'>
        <div className='propshow-main'>
          <div className='prop-show-edit-buttons'>
            <Link to={`/props`}>
              <button>Back to all props</button>
            </Link>
            {sessionUser && prop.prophouse_id === sessionUser.prophouse_id && (
              <>
                <Link to={`/props/${prop.id}/edit`}>
                  <button>Edit</button>
                </Link>
                <button onClick={handleDelete}>Delete</button>
              </>
            )}
          </div>

          <div
            style={{
              width: 400,
              height: 500,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(${prop.image})`
            }}
          ></div>
          <div className='propshow-text'>
            <div className='propshow-name'>{prop.name}</div>
            <div className='propshow-price'>
              Weekly Price: ${prop.weekly_price}.00
            </div>
            <div className='propshow-barcode'>Barcode: {prop.barcode}</div>
            <div
              className='propshow-availability'
              style={{ color: prop.availability ? '#6f985e' : '#cb6346' }}
            >
              {prop.availability ? 'available' : 'not available'}
            </div>
            <div className='propshow-setlist'>
              {sessionUser && !sessionUser.is_manager && (
                <>
                  <select onChange={e => handleSetlistSelect(e.target.value)}>
                    <option value=''>Select Setlist</option>
                    {setlists &&
                      setlists.map(setlist => (
                        <option key={setlist.id} value={setlist.id}>
                          {setlist.name}
                        </option>
                      ))}
                  </select>

                  <button className='propshow-button' onClick={handleAddButton}>
                    Add To Setlist
                  </button>

                  {prop.setlists &&
                    prop.setlists.map(setlist => (
                      <>
                        <div key={setlist.id}>
                          In&nbsp;
                          <Link to={`/setlists/${setlist.id}`}>
                            {setlist.name}
                          </Link>{' '}
                          setlist
                        </div>
                        <button
                          className='propshow-button'
                          onClick={e => handleRemoveButton(setlist.id)}
                        >
                          Remove
                        </button>
                      </>
                    ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='propshow-description'>
        {prop.color && <div>Color: {prop.color}</div>}
        {prop.material && <div>Material: {prop.material}</div>}
        {prop.description && <div>Description: {prop.description}</div>}
      </div>
      <hr />

      <div className='propshow-prophouse'>
        <Link to={`/prophouses/${prop.prophouse.id}`}>
          At{' '}
          <span className='propshow-prophouse-link'>{prop.prophouse.name}</span>
        </Link>
      </div>
    </div>
  );
};

export default PropShow;
