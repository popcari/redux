import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  errorMessage: "",
  currentUser: null,
  users: [],
}

// Fetch API
export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://fake-rest-api-nodejs.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      )

      const jsonData = await response.json()

      if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(jsonData)
      }

      return jsonData
    } catch (error) {
      // Bắt lỗi mạng (bao gồm cả CORS error)
      return rejectWithValue({ message: error.message || "Network error" })
    }
  },
)
export const getUsers = createAsyncThunk(
  "user/getList",
  async (data, { rejectWithValue }) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const jsonData = await response.json()

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(jsonData)
    }

    return jsonData
  },
)

// Config slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: builder => {
    // Start login request
    builder.addCase(login.pending, state => {
      state.isLoading = true
    })

    // Request successful
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.currentUser = action.payload
    })

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.errorMessage = action.payload.message
    })

    builder.addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false
      state.users = []
    })

    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload
      state.isLoading = false
    })

    builder.addCase(getUsers.pending, state => {
      state.isLoading = true
    })
  },
})

// Export actions
export const { logout } = userSlice.actions

// Select state currentUser from slice
export const selectUser = state => state.user.currentUser
export const selectLoading = state => state.user.isLoading
export const selectErrorMessage = state => state.user.errorMessage
export const users = state => state.user.users

// Export reducer
export default userSlice.reducer
