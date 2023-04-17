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
      <div className='prophouse-show-image-holder'>
        <div
          style={{
            height: 550,
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(0.5)',
            backgroundImage: `url(${prophouse.image})`
          }}
        ></div>
        <div className='prophouse-show-name'>{prophouse.name}</div>
        <div className='prophouse-show-description'>
          {prophouse.description}
        </div>
        {sessionUser && prophouse.id === sessionUser.prophouse_id && (
          <div className='prophouse-show-edit-buttons'>
            <Link to='/props/new'>
              <button>Add Prop</button>
            </Link>
            <Link to={`/prophouses/${prophouse.id}/edit`}>
              <button>Edit</button>
            </Link>
          </div>
        )}
        <div>
          {sessionUser && sessionUser.prophouse_id === prophouse.id && (
            <div></div>
          )}
        </div>
      </div>
      <div className='prophouse-show-introduction-holder'>
        <div className='prophouse-show-title'>ABOUT THE PROPHOUSE</div>
        <div
          className='prophouse-show-introduction'
          dangerouslySetInnerHTML={{ __html: prophouse.introduction }}
        ></div>
      </div>

      <div className='prophouse-show-info-holder'>
        <div className='prophouse-show-info-left'>
          <div className='prophouse-show-info-name'>{prophouse.name}</div>
          <div className='prophouse-show-info-address'>{prophouse.address}</div>
          <div className='prophouse-show-info-hours'>
            {prophouse.monday_open && prophouse.monday_close && (
              <div>
                Mon: {prophouse.monday_open} am - {prophouse.monday_close - 12}{' '}
                pm
              </div>
            )}
            {prophouse.tuesday_open && prophouse.tuesday_close && (
              <div>
                Tue: {prophouse.tuesday_open} am -{' '}
                {prophouse.tuesday_close - 12} pm
              </div>
            )}
            {prophouse.wednesday_open && prophouse.wednesday_close && (
              <div>
                Wed: {prophouse.wednesday_open} am -{' '}
                {prophouse.wednesday_close - 12} pm
              </div>
            )}
            {prophouse.thursday_open && prophouse.thursday_close && (
              <div>
                Thu: {prophouse.thursday_open} am -{' '}
                {prophouse.thursday_close - 12} pm
              </div>
            )}
            {prophouse.friday_open && prophouse.friday_close && (
              <div>
                Fri: {prophouse.friday_open} am - {prophouse.friday_close - 12}{' '}
                pm
              </div>
            )}
            {prophouse.saturday_open && prophouse.saturday_close && (
              <div>
                Sat: {prophouse.saturday_open} am -{' '}
                {prophouse.saturday_close - 12} pm
              </div>
            )}
            {prophouse.sunday_open && prophouse.sunday_close && (
              <div>
                Sun: {prophouse.sunday_open} am - {prophouse.sunday_close - 12}{' '}
                pm
              </div>
            )}
          </div>
          <div className='prophouse-show-info-phone'>{prophouse.phone}</div>
          <div className='prophouse-show-social'>
            {prophouse.twitter && (
              <a href={prophouse.twitter}>
                <i className='fa-brands fa-square-twitter'></i>
              </a>
            )}
            {prophouse.facebook && (
              <a href={prophouse.facebook}>
                <i className='fa-brands fa-square-facebook'></i>
              </a>
            )}
            {prophouse.instagram && (
              <a href={prophouse.instagram}>
                <i className='fa-brands fa-square-instagram'></i>
              </a>
            )}
            {prophouse.yelp && (
              <a href={prophouse.yelp}>
                <i className='fa-brands fa-y-combinator'></i>
              </a>
            )}
            {prophouse.pinterest && (
              <a href={prophouse.pinterest}>
                <i className='fa-brands fa-square-pinterest'></i>
              </a>
            )}
          </div>
        </div>
        <div
          className='prophouse-show-info-map'
          dangerouslySetInnerHTML={{ __html: prophouse.embed_map }}
        ></div>
      </div>
    </div>
  );
};

export default ProphouseShow;
