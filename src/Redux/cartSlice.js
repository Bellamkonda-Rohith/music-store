import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
    totalItems: 0,
    total: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            const existingItem = state.cart.find(cartItem => cartItem.id === item.id)

            if (existingItem) {
                existingItem.quantity += 1 // Increment quantity if item already exists
                // Do not increment totalItems here
            } else {
                state.cart.push({ ...item, quantity: 1 }) // Add new item with quantity 1
                state.totalItems += 1 // Update total items count only for new items
            }

            state.total += item.price // Update total price
        },

        removeFromCart: (state, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex(item => item.id === itemId)

            if (index >= 0) {
                const item = state.cart[index]
                state.totalItems -= 1 // Decrease total items count by 1 for each item removed
                state.total -= item.price * item.quantity // Decrease total price
                state.cart.splice(index, 1) // Remove item from cart
            }
        },

        resetCart: state => {
            state.cart = []
            state.totalItems = 0
            state.total = 0
        }
    }
})

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions
export default cartSlice.reducer
