import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSetlist, updateSetlist } from '../../store/setlists';

const SetlistForm = ({ setlist }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState(setlist.name);

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...setlist,
      name
    };
    const action = setlist.id ? updateSetlist : createSetlist;
    await dispatch(action(payload));
    history.push(`/setlists`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>{setlist.id ? 'Edit' : 'Create'} Setlist</h1>
        <input
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button>Save</button>
      </form>
    </>
  );
};

export default SetlistForm;
