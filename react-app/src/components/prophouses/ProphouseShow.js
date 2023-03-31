import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProphouse } from '../../store/prophouses';

import './ProphouseShow.css';

const ProphouseShow = () => {
  const sessionUser = useSelector(state => state.session.user);

  const dispatch = useDispatch();
  const { prophouseId } = useParams();
  const prophousesObj = useSelector(state => state.prophouses);

  useEffect(() => {
    dispatch(fetchProphouse(prophouseId));
  }, [dispatch, prophouseId]);

  const prophouse = prophousesObj[prophouseId];

  if (!prophouse) {
    return null;
  }

  return (
    <div>
      <h2>{prophouse.name}</h2>

      {prophouse.monday_open && prophouse.monday_close && (
        <div>
          Mon: {prophouse.monday_open} - {prophouse.monday_close}
        </div>
      )}
      {prophouse.tuesday_open && prophouse.tuesday_close && (
        <div>
          Tue: {prophouse.tuesday_open} - {prophouse.tuesday_close}
        </div>
      )}
      {prophouse.wednesday_open && prophouse.wednesday_close && (
        <div>
          Wed: {prophouse.wednesday_open} - {prophouse.wednesday_close}
        </div>
      )}
      {prophouse.thursday_open && prophouse.thursday_close && (
        <div>
          Thu: {prophouse.thursday_open} - {prophouse.thursday_close}
        </div>
      )}
      {prophouse.friday_open && prophouse.friday_close && (
        <div>
          Fri: {prophouse.friday_open} - {prophouse.friday_close}
        </div>
      )}
      {prophouse.saturday_open && prophouse.saturday_close && (
        <div>
          Sat: {prophouse.saturday_open} - {prophouse.saturday_close}
        </div>
      )}
      {prophouse.sunday_open && prophouse.sunday_close && (
        <div>
          Sun: {prophouse.sunday_open} - {prophouse.sunday_close}
        </div>
      )}

      {sessionUser &&
        prophouse.prophousehouse_id === sessionUser.prophousehouse_id && (
          <div>
            <button>
              <Link to={`/prophouses/${prophouse.id}/edit`}>Edit</Link>
            </button>
          </div>
        )}
    </div>
  );
};

export default ProphouseShow;
