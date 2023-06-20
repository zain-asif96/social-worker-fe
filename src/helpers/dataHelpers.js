import _ from "lodash";

//sorting arrray
const getSortedOptions = (array, key) => {
  let arr = _.sortBy(array, [key]);
  return arr;
};

export { getSortedOptions };
