const initialState = {
    cart: [],
}

const cartReducer = (state=initialState, action) => {
    switch (action.type) {
        case "INSERT_CART":
            return{cart: [...state.cart, action.payload]}
        
        case "DELETE_ITEM_CART":
            return {cart: [...state.cart.filter((e, i) => i !== action.payload),]}
        
        case "DELETE_ALL_CART":
            return {cart: []}
            
        default:
            return state;
    }
}

export default cartReducer