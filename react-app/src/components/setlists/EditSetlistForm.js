import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SetlistForm from './SetlistForm';
import { fetchSetlist } from '../../store/setlists';

const EditSetlistForm = () => {
  const { setlistId } = useParams();
  const setlistsObj = useSelector(state => state.setlists);

  const setlist = setlistsObj[setlistId];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSetlist(setlistId));
  }, [dispatch, setlistId]);

  if (!setlist) {
    return null;
  }

  return <SetlistForm setlist={setlist} />;
};

export default EditSetlistForm;
