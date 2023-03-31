import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateProphouse } from '../../store/prophouses';

const ProphouseForm = ({ prophouse }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [monday_open, setMondayOpen] = useState(prophouse.monday_open || '');
  const [monday_close, setMondayClose] = useState(prophouse.monday_close || '');
  const [tuesday_open, setTuesdayOpen] = useState(prophouse.tuesday_open || '');
  const [tuesday_close, setTuesdayClose] = useState(
    prophouse.tuesday_close || ''
  );
  const [wednesday_open, setWednesdayOpen] = useState(
    prophouse.wednesday_open || ''
  );
  const [wednesday_close, setWednesdayClose] = useState(
    prophouse.wednesday_close || ''
  );
  const [thursday_open, setThursdayOpen] = useState(
    prophouse.thursday_open || ''
  );
  const [thursday_close, setThursdayClose] = useState(
    prophouse.thursday_close || ''
  );
  const [friday_open, setFridayOpen] = useState(prophouse.friday_open || '');
  const [friday_close, setFridayClose] = useState(prophouse.friday_close || '');
  const [saturday_open, setSaturdayOpen] = useState(
    prophouse.saturday_open || ''
  );
  const [saturday_close, setSaturdayClose] = useState(
    prophouse.saturday_close || ''
  );
  const [sunday_open, setSundayOpen] = useState(prophouse.sunday_open || '');
  const [sunday_close, setSundayClose] = useState(prophouse.sunday_close || '');

  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...prophouse,
      monday_open,
      monday_close,
      tuesday_open,
      tuesday_close,
      wednesday_open,
      wednesday_close,
      thursday_open,
      thursday_close,
      friday_open,
      friday_close,
      saturday_open,
      saturday_close,
      sunday_open,
      sunday_close
    };

    const data = await dispatch(updateProphouse(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/prophouses/${data.id}`);
    }
  };

  return (
    <div>
      <div>
        <h1>Edit Prophouse</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div>
          Monday Open
          <input
            type='number'
            placeholder='Monday Open'
            value={monday_open}
            onChange={e => setMondayOpen(e.target.value)}
          />
        </div>
        <div>
          Monday Close
          <input
            type='number'
            placeholder='Monday Close'
            value={monday_close}
            onChange={e => setMondayClose(e.target.value)}
          />
        </div>
        <div>
          Tuesday Open
          <input
            type='number'
            placeholder='Tuesday Open'
            value={tuesday_open}
            onChange={e => setTuesdayOpen(e.target.value)}
          />
        </div>
        <div>
          Tuesday Close
          <input
            type='number'
            placeholder='Tuesday Close'
            value={tuesday_close}
            onChange={e => setTuesdayClose(e.target.value)}
          />
        </div>
        <div>
          Wednesday Open
          <input
            type='number'
            placeholder='Wednesday Open'
            value={wednesday_open}
            onChange={e => setWednesdayOpen(e.target.value)}
          />
        </div>
        <div>
          Wednesday Close
          <input
            type='number'
            placeholder='Wednesday Close'
            value={wednesday_close}
            onChange={e => setWednesdayClose(e.target.value)}
          />
        </div>
        <div>
          Thursday Open
          <input
            type='number'
            placeholder='Thursday Open'
            value={thursday_open}
            onChange={e => setThursdayOpen(e.target.value)}
          />
        </div>
        <div>
          Thursday Close
          <input
            type='number'
            placeholder='Thursday Close'
            value={thursday_close}
            onChange={e => setThursdayClose(e.target.value)}
          />
        </div>
        <div>
          Friday Open
          <input
            type='number'
            placeholder='Friday Open'
            value={friday_open}
            onChange={e => setFridayOpen(e.target.value)}
          />
        </div>
        <div>
          Friday Close
          <input
            type='number'
            placeholder='Friday Close'
            value={friday_close}
            onChange={e => setFridayClose(e.target.value)}
          />
        </div>
        <div>
          Saturday Open
          <input
            type='number'
            placeholder='Saturday Open'
            value={saturday_open}
            onChange={e => setSaturdayOpen(e.target.value)}
          />
        </div>
        <div>
          Saturday Close
          <input
            type='number'
            placeholder='Saturday Close'
            value={saturday_close}
            onChange={e => setSaturdayClose(e.target.value)}
          />
        </div>
        <div>
          Sunday Open
          <input
            type='number'
            placeholder='Sunday Open'
            value={sunday_open}
            onChange={e => setSundayOpen(e.target.value)}
          />
        </div>
        <div>
          Sunday Close
          <input
            type='number'
            placeholder='Sunday Close'
            value={sunday_close}
            onChange={e => setSundayClose(e.target.value)}
          />
        </div>
        <button>Save</button>
      </form>
    </div>
  );
};

export default ProphouseForm;
