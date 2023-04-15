export const sortByProp =
  (prop, dir = 'asc') =>
  (a, b) => {
    if (a[prop] < b[prop]) {
      return dir === 'asc' ? -1 : 1;
    } else if (b[prop] < a[prop]) {
      return dir === 'asc' ? 1 : -1;
    }
    return 0;
  };

export const filterByProp = (prop, value) => item => item[prop] === value;
