const initialState = {
    all: [],
    loadAll: false,
    errorAll: false,
    errorAllMessage: "Data Not Found",
    details: [],
    loadDetails: false,
    errorDetails: false,
    errorDetailsMessage: "Data Not Found",
}

const historyReducer = (state=initialState, action) => {
    switch (action.type) {
        case "GET_ALL_HISTORY_PENDING":
            return {
                ...state,
                loadAll: true
            }

        case "GET_ALL_HISTORY_FULLFILLED":
            return {
                ...state,
                loadAll: false,
                errorAll: false,
                all: action.payload.data,
                errorAllMessage: "Get All History Success"
            }

        case "GET_ALL_HISTORY_REJECTED":
            return {
                ...state,
                loadAll: false,
                errorAll: true,
                errorAllMessage: action.payload.message
            }
        
        case "GET_DETAILS_HISTORY_PENDING":
            return {
                ...state,
                loadDetails: true
            }

        case "GET_DETAILS_HISTORY_FULLFILLED":
            return {
                ...state,
                loadDetails: false,
                errorDetails: false,
                details: action.payload.data.data,
                errorDetailsMessage: "Get All Details Success"
            }

        case "GET_DETAILS_HISTORY_REJECTED":
            return {
                ...state,
                loadDetails: false,
                errorDetails: true,
                errorDetailsMessage: action.payload
            }
    
        default:
            return state
    }
}

export default historyReducer