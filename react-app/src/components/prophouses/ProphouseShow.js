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
      <div dangerouslySetInnerHTML={{ __html: prophouse.embed_map }}></div>

      {prophouse.monday_open && prophouse.monday_close && (
        <div>
          Mon: {prophouse.monday_open} am - {prophouse.monday_close - 12} pm
        </div>
      )}
      {prophouse.tuesday_open && prophouse.tuesday_close && (
        <div>
          Tue: {prophouse.tuesday_open} am - {prophouse.tuesday_close - 12} pm
        </div>
      )}
      {prophouse.wednesday_open && prophouse.wednesday_close && (
        <div>
          Wed: {prophouse.wednesday_open} am - {prophouse.wednesday_close - 12}{' '}
          pm
        </div>
      )}
      {prophouse.thursday_open && prophouse.thursday_close && (
        <div>
          Thu: {prophouse.thursday_open} am - {prophouse.thursday_close - 12} pm
        </div>
      )}
      {prophouse.friday_open && prophouse.friday_close && (
        <div>
          Fri: {prophouse.friday_open} am - {prophouse.friday_close - 12} pm
        </div>
      )}
      {prophouse.saturday_open && prophouse.saturday_close && (
        <div>
          Sat: {prophouse.saturday_open} am - {prophouse.saturday_close - 12} pm
        </div>
      )}
      {prophouse.sunday_open && prophouse.sunday_close && (
        <div>
          Sun: {prophouse.sunday_open} am - {prophouse.sunday_close - 12} pm
        </div>
      )}

      {sessionUser && prophouse.id === sessionUser.prophouse_id && (
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
