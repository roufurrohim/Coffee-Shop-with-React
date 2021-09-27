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
                loadAll: false,
                errorAll: false,
                all: action.payload.data.data,
                errorAllMessage: action.payload.message
            }

        case "GET_ALL_PRODUCTS_REJECTED":
            return {
                ...state,
                loadAll: false,
                errorAll: true,
                errorAllMessage: action.payload
            }
    
        default:
            return state
    }
}

export default productsReducer