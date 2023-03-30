import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  deleteSetlist,
  fetchSetlist,
  setlistRemoveProp
} from '../../store/setlists';

const SetlistShow = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setlistId } = useParams();
  const setlists = useSelector(state => state.setlists);
  const setlist = setlists[setlistId];

  useEffect(() => {
    dispatch(fetchSetlist(setlistId));
  }, []);

  if (!setlist || !setlist.props) {
    return null;
  }

  const handleDelete = async e => {
    e.preventDefault();
    if (!window.confirm('Do you want to delete this setlist?')) return;
    await dispatch(deleteSetlist(setlistId));
    history.push('/setlists');
  };

  const handleRemoveButton = async propId => {
    await dispatch(setlistRemoveProp(setlistId, propId));
    dispatch(fetchSetlist(setlistId));
  };

  return (
    <>
      <h1>{setlist.name}</h1>
      <Link to={`/setlists/${setlist.id}/edit`}>
        <button>Edit Setlist</button>
      </Link>
      <button onClick={handleDelete}>Delete Setlist</button>

      {setlist.props.map(prop => (
        <div key={prop.id}>
          <h2>{prop.name}</h2>
          <button onClick={e => handleRemoveButton(prop.id)}>
            Remove Prop
          </button>
          <div>
            <img width={300} src={prop.image} alt={prop.name} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SetlistShow;
