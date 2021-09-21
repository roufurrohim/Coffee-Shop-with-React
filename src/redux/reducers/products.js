const initialState = {
    all: [],
    loadAll: false,
    errorAll: false,
    errorAllMessage: "Data Not Found",
}

const productsReducer = (state=initialState, action) => {
    switch (action.type) {
        case "GET_ALL_PRODUCTS_PENDING":
            return {
                ...state,
                loadAll: true
            }

        case "GET_ALL_PRODUCTS_FULLFILLED":
            return {
                ...state,
                loadAll: true,
                all: action.payload.data.data
            }

        case "GET_ALL_PRODUCTS_REJECTED":
            return {
                ...state,
                loadAll: false,
                errorAllMessage: action.payload
            }
    
        default:
            return state
    }
}

export default productsReducer