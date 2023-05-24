import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import PropForm from './PropForm';
import { fetchProp } from '../../store/props';

const EditPropForm = () => {
  const { propId } = useParams();
  const propsObj = useSelector(state => state.props);

  const prop = propsObj[propId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProp(propId));
  }, [dispatch, propId]);

  if (!prop) {
    return null;
  }

  return <PropForm prop={prop} />;
};

export default EditPropForm;
