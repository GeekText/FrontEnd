export const WISH_LIST_ADD = "WISH_LIST_ADD";
export const WISH_LIST_REMOVE = "WISH_LIST_REMOVE";
export const WISH_LIST_ADDCART = "WISH_LIST_ADDCART";
export const ADD = "ADD";
export const addItemWish = id => {
  return {
    type: WISH_LIST_ADD,
    id
  };
};
export const wishRemove = id => {
  return {
    type: WISH_LIST_REMOVE,
    id
  };
};

////////////////////////////////////////////

export const wishToCart = id => {
  return {
    type: ADD,
    id
  };

  //////////////////////////////////////////////
};
