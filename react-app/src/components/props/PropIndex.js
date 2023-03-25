import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProps } from '../../store/props';
import { NavLink } from 'react-router-dom';
import PropIndexItem from './PropIndexItem';
import './PropIndex.css';

const PropIndex = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(fetchProps());
  }, [dispatch]);

  if (props.length === 0) {
    return null;
  }

  return (
    <>
      <div>
        <NavLink to='/props/new'>
          <button>Add Prop</button>
        </NavLink>
      </div>
      <div>
        {props.map(prop => (
          <PropIndexItem prop={prop} key={prop.id} />
        ))}
      </div>
    </>
  );
};

export default PropIndex;
