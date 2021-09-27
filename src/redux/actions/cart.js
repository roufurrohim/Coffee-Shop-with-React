export const INSERT_CART = (data) => {
    return {
        type: "INSERT_CART",
        payload: data
    }
}

export const DELETE_ITEM_CART = (data) => {
    return {
        type: "DELETE_ITEM_CART",
        payload: data
    }
}

export const DELETE_ALL_CART = () => {
    return {
        type: "DELETE_ALL_CART"
    }
}