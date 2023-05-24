import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createProp, updateProp } from '../../store/props';
import { fetchCategories } from '../../store/categories';

const PropForm = ({ prop }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector(state =>
    Object.values(state.categories).sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      } else if (b.name > a.name) {
        return -1;
      } else {
        return 0;
      }
    })
  );

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
  const [category_id, setCategoryId] = useState(prop.category_id);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors([]);
    const payload = {
      ...prop,
      name,
      description,
      color: color ? color : -0,
      material: material ? material : -0,
      length: length ? length : -0,
      depth: depth ? depth : -0,
      height: height ? height : -0,
      style: style ? style : -0,
      quantity,
      weekly_price,
      availability,
      image: image ? image : -0,
      category_id
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
      <form onSubmit={handleSubmit}>
        {prop.id ? (
          <>
            <h1>Edit prop</h1>
          </>
        ) : (
          <>
            <h1>Add a prop</h1>
          </>
        )}
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <input
          type='text'
          placeholder='name'
          required
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='description'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type='text'
          placeholder='color'
          value={color}
          onChange={e => setColor(e.target.value)}
        />
        <input
          type='text'
          placeholder='material'
          value={material}
          onChange={e => setMaterial(e.target.value)}
        />
        <input
          type='number'
          placeholder='length'
          value={length}
          onChange={e => setLength(e.target.value)}
        />
        <input
          type='number'
          placeholder='depth'
          value={depth}
          onChange={e => setDepth(e.target.value)}
        />
        <input
          type='number'
          placeholder='height'
          value={height}
          onChange={e => setHeight(e.target.value)}
        />
        <input
          type='text'
          placeholder='Style'
          value={style}
          onChange={e => setStyle(e.target.value)}
        />
        <input
          type='text'
          placeholder='quantity'
          required
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
        />
        <input
          type='text'
          placeholder='weekly price'
          required
          value={weekly_price}
          onChange={e => setWeeklyPrice(e.target.value)}
        />
        <input
          type='text'
          placeholder='image url'
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <select onChange={e => setCategoryId(e.target.value)}>
          <option>Select Category</option>
          {categories.map(({ id, name }, idx) =>
            prop.category_id === id ? (
              <option key={idx} value={id} selected>
                {name}
              </option>
            ) : (
              <option key={idx} value={id}>
                {name}
              </option>
            )
          )}
        </select>
        <select onChange={e => setAvailability(e.target.value)}>
          <option>Select Availability</option>
          <option value={true} selected={prop.availability === true}>
            Yes
          </option>
          <option value={false} selected={prop.availability === false}>
            No
          </option>
        </select>
        <button>Save</button>
      </form>
    </div>
  );
};

export default PropForm;
