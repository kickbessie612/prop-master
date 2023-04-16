import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProps } from '../../store/props';
import { fetchCategories } from '../../store/categories';
import { NavLink } from 'react-router-dom';
import PropIndexItem from './PropIndexItem';
import './PropIndex.css';
import { filterByProp, sortByProp } from '../../utils';

const PropIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let props = useSelector(state => Object.values(state.props)).sort(
    sortByProp('id', 'desc')
  );
  const categories = useSelector(state => Object.values(state.categories));

  const [search, setSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState({});

  useEffect(() => {
    dispatch(fetchProps());
    dispatch(fetchCategories());
  }, [dispatch]);

  const submitSearch = term => {
    setSearch(term);
    dispatch(fetchProps(term.toLowerCase()));
  };

  const handleCategorySwitch = category => {
    setCurrentCategory(category);
  };

  // const resetSearch = () => {
  //   setSearch('');
  //   dispatch(fetchProps());
  // };

  return (
    <div className='prop-list-container'>
      <div className='prop-index-categories'>
        <div
          className='prop-index-subcategory'
          onClick={e => handleCategorySwitch({})}
        >
          All
        </div>
        {categories
          .filter(filterByProp('parent_id', null))
          .sort(sortByProp('name'))
          .map(category => (
            <>
              <div className='prop-index-category' key={category.id}>
                {category.name}
              </div>
              {categories
                .filter(filterByProp('parent_id', category.id))
                .sort(sortByProp('name'))
                .map(subCategory => (
                  <div
                    className={`prop-index-subcategory${
                      currentCategory.id === subCategory.id ? ' active' : ''
                    }`}
                    key={subCategory.id}
                    onClick={e => handleCategorySwitch(subCategory)}
                  >
                    &gt;&nbsp;{subCategory.name}
                  </div>
                ))}
            </>
          ))}
      </div>
      <div className='prop-list-main'>
        <div className='prop-list-search-bar'>
          <input
            type='text'
            value={search}
            placeholder='Search by prop name'
            onChange={e => submitSearch(e.target.value)}
          />
          {/* <button onClick={resetSearch}>Reset</button> */}
        </div>

        <div>
          {props.length > 0 && (
            <div className='prop-index-props'>
              {props
                .filter(prop =>
                  currentCategory.id
                    ? filterByProp('category_id', currentCategory.id)(prop)
                    : true
                )
                .map(prop => (
                  <PropIndexItem prop={prop} key={prop.id} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropIndex;
