export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const COUNT_UP = "COUNT_UP";
export const COUNT_DOWN = "COUNT_DOWN";
export const DETAILS = "DETAILS";
export const SAVE_ADD = "SAVE_ADD";
export const SAVE_ADD_CART = "SAVE_ADD_CART";
export const SAVE_REMOVE = "SAVE_REMOVE";
export const WISH_LIST_ADD = "WISH_LIST_ADD";
export const WISH_LIST_REMOVE = "WISH_LIST_REMOVE";

const axios = require("axios");
const url = "https://geek-text-backend.herokuapp.com/api";
/**
 *items: book_data()  - Gets data from DB Backend
 *addedItems: [],     - Stores items in cart list
 *addedItemID: [],    - Stores items in details page
 *savedItems: [],     - Stores items in "save for later" list
 *wishlist: [],       - Stores items in "wishlist" list
 *total: 0            - Subtotal of items on cart page
 */
var homeItems = {
  items: book_data(),
  addedItems: [],
  addedItemID: [],
  savedItems: [],
  wishlist: [],
  total: 0
};
async function book_data() {
  try {
    const response = await axios.get(url);
    homeItems.items = response.data;
    this.setState({ items: response.data });
    console.log("called data");
  } catch (error) {}
}

//Only loads if the url returns nothing from backend
//Works with constructor from home.js; Please keep synced
function dbNotLoaded() {
  return [
    {
      _id: "0",
      id: 0,
      book_name: "Loading...",
      book_cover: "http://dummyimage.com/350x350.png/cc0000/ffffff",
      author_first_name: "",
      author_last_name: "",
      author_biography: "",
      book_desc: "",
      book_genre: "",
      book_publisher: "",
      book_releaseDate: "",
      book_rating: 0,
      email: "",
      gender: "",
      book_publishing_info: "",
      book_copies_sold: 0,
      book_price: 0
    }
  ];
}

const PageLogic = (state = homeItems, action) => {
  console.log("Last Action: ", action.type);
  if (!Array.isArray(state.items) || !state.items.length) {
    state.items = dbNotLoaded();
    console.log("PageLogic DB NOT LOADED: Length %d", homeItems.items.length);
  }
  //Adds item to detail page
  if (action.type === DETAILS) {
    let clickedItem = state.items.find(item => item.id === action.id);
    //Checks if it exists already
    let exists = state.addedItemID.find(item => action.id === item.id);
    if (exists) {
      return {
        ...state
      };
    } else {
      return {
        ...state,
        //Returns only the clicked item
        addedItemID: [clickedItem]
      };
    }
  }
  //Adds item to cart
  if (action.type === ADD) {
    let cartItem = state.items.find(item => item.id === action.id);
    let exists = state.addedItems.find(item => action.id === item.id);
    if (exists) {
      cartItem.quantity += 1;
      return {
        ...state,
        total: state.total + cartItem.book_price
      };
    } else {
      cartItem.quantity = 1;
      //Counts for floating point problem
      let newTotal = (state.total * 100 + cartItem.book_price * 100) / 100;

      return {
        ...state,
        addedItems: [...state.addedItems, cartItem],
        total: newTotal
      };
    }
  }
  if (action.type === REMOVE) {
    let removedItem = state.addedItems.find(item => action.id === item.id);
    let newCartList = state.addedItems.filter(item => action.id !== item.id);
    //Counts for floating point problem
    let newTotal =
      (state.total * 100 -
        removedItem.book_price * 100 * removedItem.quantity) /
      100;
    return {
      ...state,
      addedItems: newCartList,
      total: newTotal
    };
  }
  if (action.type === COUNT_UP) {
    let selectedItem = state.items.find(item => item.id === action.id);
    selectedItem.quantity += 1;
    //Counts for floating point problem
    let newTotal = (state.total * 100 + selectedItem.book_price * 100) / 100;
    return {
      ...state,
      total: newTotal
    };
  }
  if (action.type === COUNT_DOWN) {
    let selectedItem = state.items.find(item => item.id === action.id);
    if (selectedItem.quantity <= 1) {
      //New list without selected item
      let newCartList = state.addedItems.filter(item => item.id !== action.id);
      //Counts for floating point problem
      let newTotal = (state.total * 100 - selectedItem.book_price * 100) / 100;
      //Returns a new list due to qty reaching 0
      return {
        ...state,
        addedItems: newCartList,
        total: newTotal
      };
    } else {
      selectedItem.quantity -= 1;
      let newTotal = state.total - selectedItem.book_price;
      return {
        ...state,
        total: newTotal
      };
    }
  }
  if (action.type === SAVE_ADD) {
    let savedItem = state.items.find(item => item.id === action.id);
    let exists = state.savedItems.find(item => action.id === item.id);
    //List of cart list without selected item
    let newCartList = state.addedItems.filter(item => action.id !== item.id);
    let cartItem = state.addedItems.find(item => action.id === item.id);
    //Counts for floating point problem
    let newTotal =
      (state.total * 100 - cartItem.book_price * 100 * cartItem.quantity) / 100;
    if (exists) {
      return state;
    } else {
      return {
        ...state,
        addedItems: newCartList,
        savedItems: [...state.savedItems, savedItem],
        total: newTotal
      };
    }
  }
  if (action.type === SAVE_ADD_CART) {
    let savedItem = state.items.find(item => item.id === action.id);
    let exists = state.addedItems.find(item => action.id === item.id);
    let newCartList = state.savedItems.filter(item => action.id !== item.id);
    //List of cart list without selected item
    let cartItem = state.savedItems.find(item => action.id === item.id);
    let newTotal =
      (state.total * 100 + cartItem.book_price * 100 * cartItem.quantity) / 100;
    if (exists) {
      let cartList = state.addedItems.filter(item => action.id !== item.id);
      return {
        ...state,
        addedItems: cartList
      };
    } else {
      return {
        ...state,
        addedItems: [...state.addedItems, savedItem],
        savedItems: newCartList,
        total: newTotal
      };
    }
  }
  if (action.type === SAVE_REMOVE) {
    //Returns list of saved items without selected item.
    let newSaveList = state.savedItems.filter(item => action.id !== item.id);
    return {
      ...state,
      savedItems: newSaveList
    };
  }
  if (action.type === WISH_LIST_ADD) {
    let wishItem = state.items.find(item => item.id === action.id);
    let exists = state.wishlist.find(item => action.id === item.id);
    if (exists) {
      return state;
    } else {
      return {
        ...state,
        wishlist: [...state.wishlist, wishItem]
      };
    }
  }
  if (action.type === WISH_LIST_REMOVE) {
    let newWishList = state.wishlist.filter(item => action.id !== item.id);
    return {
      ...state,
      wishlist: newWishList
    };
  } else {
    return state;
  }
};
export default PageLogic;
