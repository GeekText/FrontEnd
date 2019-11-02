export const WISH_LIST_ADD = "WISH_LIST_ADD";
export const WISH_LIST_REMOVE = "WISH_LIST_REMOVE";
export const WISH_LIST_ADDCART = "WISH_LIST_ADDCART";
///////////////////////////////
export const WISH_LIST_RENAME = "WISH_LIST_RENAME";
//////////////////////////////
export const ADD = "ADD";

//siwtch from local to global function - Wish-List-add
export const addItemWish = id => {
  return {
    type: WISH_LIST_ADD,
    id
  };
};

//siwtch from local to global function - Wish-List-Remove
export const wishRemove = id => {
  return {
    type: WISH_LIST_REMOVE,
    id
  };
};

//switch from local to global function - ADD
export const wishToCart = id => {
  return {
    type: ADD,
    id
  };
};

/////////////////////////////////////////////////////
////////////////////////////////////////////////////
//siwtch from local to global function - WISH_LIST_RENAME
export const changeWishName = event => {
  return {
    type: WISH_LIST_RENAME,
    event
  };
};
////////////////////////////////////////////////
////////////////////////////////////////////////
