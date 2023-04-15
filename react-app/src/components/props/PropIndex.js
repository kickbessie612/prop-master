import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProps } from '../../store/props';
import { NavLink } from 'react-router-dom';
import PropIndexItem from './PropIndexItem';
import './PropIndex.css';

const PropIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const props = useSelector(state => Object.values(state.props)).sort(
    (a, b) => {
      if (a.id < b.id) {
        return 1;
      } else if (b.id < a.id) {
        return -1;
      }
      return 0;
    }
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchProps());
  }, [dispatch]);

  const submitSearch = term => {
    setSearch(term);
    dispatch(fetchProps(term.toLowerCase()));
  };

  const resetSearch = () => {
    setSearch('');
    dispatch(fetchProps());
  };

  return (
    <>
      <div>
        <input
          type='text'
          value={search}
          placeholder='Search by prop name'
          onChange={e => submitSearch(e.target.value)}
        />
        {/* <button onClick={resetSearch}>Reset</button> */}
      </div>
      <div>
        {sessionUser.prophouse_id && (
          <div>
            <NavLink to='/props/new'>
              <button>Add Prop</button>
            </NavLink>
          </div>
        )}
      </div>

      {props.length > 0 && (
        <div>
          {props.map(prop => (
            <PropIndexItem prop={prop} key={prop.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default PropIndex;
