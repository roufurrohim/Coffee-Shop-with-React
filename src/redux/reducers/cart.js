const initialState = {
    cart: [],
}

const cartReducer = (state=initialState, action) => {
    switch (action.type) {
        case "INSERT_CART":
            return{cart: [...state.cart, action.payload]}
            
        default:
            return state;
    }
}

export default cartReducer