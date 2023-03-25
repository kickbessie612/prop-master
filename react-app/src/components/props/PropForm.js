import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProp, updateProp } from '../../store/props';

const PropForm = ({ prop }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const breweries = useSelector(state => Object.values(state.breweries));

  const [name, setName] = useState(prop.name);
  const [description, setDescription] = useState(
    prop.description ? prop.description : ''
  );
  const [color, setColor] = useState(prop.color ? prop.color : '');
  const [material, setMaterial] = useState(prop.material ? prop.material : '');
  const [length, setLength] = useState(prop.length ? prop.length : '');
  const [depth, setDepth] = useState(prop.depth ? prop.depth : '');
  const [height, setHeight] = useState(prop.height ? prop.height : '');
  const [style, setStyle] = useState(prop.style ? prop.style : '');
  const [quantity, setQuantity] = useState(prop.quantity);
  const [weekly_price, setWeeklyPrice] = useState(prop.weekly_price);
  const [availability, setAvailability] = useState(prop.availability);
  const [image, setImage] = useState(prop.image ? prop.image : '');
  // const [brewery_id, setBreweryId] = useState(
  //   prop.brewery ? prop.brewery.id : ''
  // );

  const [errors, setErrors] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...prop,
      name,
      description,
      abv,
      ibu: ibu ? ibu : -0,
      style,
      label,
      year: year ? year : -0,
      brewery_id: brewery_id ? brewery_id : -0
    };

    const action = prop.id ? updateProp : createProp;
    const data = await dispatch(action(payload));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/props/${data.id}`);
    }
  };

  return (
    <div>
      <div>
        {prop.id ? (
          <>
            <h1 className='introduction'>
              Edit a&nbsp;<span>unique</span>&nbsp;prop
            </h1>
            <div className='form-description'>
              Tell us about your new discovery!
            </div>
          </>
        ) : (
          <>
            <h1 className='introduction'>
              Add a&nbsp;<span>new</span>&nbsp;prop
            </h1>
            <div className='form-description'>
              Tell us about your new discovery!
            </div>
          </>
        )}
      </div>
      <form className='prop-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type='text'
          placeholder='Name'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Description'
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type='number'
          placeholder='abv'
          required
          value={abv}
          onChange={e => setAbv(e.target.value)}
        />
        <input
          type='number'
          placeholder='ibu'
          value={ibu}
          onChange={e => setIbu(e.target.value)}
        />
        <input
          type='text'
          placeholder='Style'
          required
          value={style}
          onChange={e => setStyle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Prop Logo Url'
          value={label}
          onChange={e => setLabel(e.target.value)}
        />
        <input
          type='number'
          placeholder='Year'
          value={year}
          onChange={e => setYear(e.target.value)}
        />
        <select onChange={e => setBreweryId(e.target.value)}>
          <option value={-0}>Select Brewery</option>
          {breweries.map(({ id, name }, idx) =>
            prop.id && prop.brewery && id === prop.brewery.id ? (
              <option key={idx} defaultValue={id} selected>
                {name}
              </option>
            ) : (
              <option key={idx} value={id}>
                {name}
              </option>
            )
          )}
        </select>
        <button>{prop.id ? 'update' : 'create'}</button>
      </form>
    </div>
  );
};

export default PropForm;
