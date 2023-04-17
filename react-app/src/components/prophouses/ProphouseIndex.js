import { useEffect } from 'react';
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

  useEffect(() => {
    dispatch(fetchProphouses());
  }, [dispatch]);

  return (
    <>
      <div className='prophouse-list'>
        <div className='prophouse-list-title'>PROPHOUSES</div>
        <div className='prophouse-index'>
          {prophouses.length > 0 && (
            <div className='prophouse-item-holder'>
              {prophouses.map(prophouse => (
                <ProphouseIndexItem prophouse={prophouse} key={prophouse.id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProphouseIndex;
