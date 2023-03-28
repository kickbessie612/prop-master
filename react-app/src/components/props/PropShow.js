import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { fetchProp, deleteProp } from '../../store/props';

import './PropShow.css';

const PropShow = () => {
  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();
  const { propId } = useParams();
  const propsObj = useSelector(state => state.props);

  useEffect(() => {
    dispatch(fetchProp(propId));
  }, [dispatch, propId]);

  const prop = propsObj[propId];

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this prop?')) return;
    await dispatch(deleteProp(propId));
    history.push('/props');
  };

  if (!prop) {
    return null;
  }

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
        </div>
      </div>
    </>
  );
};

export default PropShow;
