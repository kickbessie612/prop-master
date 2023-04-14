import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProphouses } from '../../store/prophouses';
import ProphouseIndexItem from './ProphouseIndexItem';
import './ProphouseIndex.css';

const ProphouseIndex = () => {
  const dispatch = useDispatch();
  const prophouses = useSelector(state => Object.values(state.prophouses)).sort(
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
    dispatch(fetchProphouses());
  }, [dispatch]);

  const submitSearch = term => {
    setSearch(term);
    dispatch(fetchProphouses(term.toLowerCase()));
  };

  const resetSearch = () => {
    setSearch('');
    dispatch(fetchProphouses());
  };

  return (
    <>
      <div>
        <input
          type='text'
          value={search}
          onChange={e => submitSearch(e.target.value)}
        />
        <button onClick={resetSearch}>Reset</button>
      </div>

      {prophouses.length > 0 && (
        <div>
          {prophouses.map(prophouse => (
            <ProphouseIndexItem prophouse={prophouse} key={prophouse.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProphouseIndex;
