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
    history.push('/');
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
            {prop.description}, {prop.color},{prop.material}
          </div>

          <div>{prop.brewery_id}</div>

          {sessionUser && prop.userId === sessionUser.id && (
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
            <img src={prop.image} alt={prop.name} />
          </div>
        </div>
      </div>
    </>
  );
};

export default PropShow;
