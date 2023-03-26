import PropForm from './PropForm';

const CreatePropForm = () => {
  const prop = {
    name: '',
    description: '',
    color: '',
    material: '',
    length: '',
    depth: '',
    height: '',
    style: '',
    quantity: '',
    weekly_price: '',
    availability: '',
    image: '',
    category_id: ''
  };
  return <PropForm prop={prop} />;
};

export default CreatePropForm;
