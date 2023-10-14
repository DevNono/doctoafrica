import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        set : (state, action) => {
            console.log("set user")
            return action.payload;
        },
        unset : (state) => {
            return null;
        }
    }
});

export const setUser = (user) => {
    return {
        type: "user/set",
        payload: user
    }
}

export const unsetUser = () => {
    return {
        type: "user/unset"
    }
}


export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});

