import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ProphouseForm from './ProphouseForm';
import { fetchProphouse } from '../../store/prophouses';

const EditProphouseForm = () => {
  const { prophouseId } = useParams();
  const prophousesObj = useSelector(state => state.prophouses);

  const prophouse = prophousesObj[prophouseId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProphouse(prophouseId));
  }, [dispatch, prophouseId]);

  if (!prophouse) {
    return null;
  }

  return <ProphouseForm prophouse={prophouse} />;
};

export default EditProphouseForm;
