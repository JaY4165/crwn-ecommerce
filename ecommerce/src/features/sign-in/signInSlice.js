import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signInUser = createAsyncThunk(
  "sign-in/signInUser",
  async (formData, { rejectWithValue }) => {
    try {
      const formDataValues = {
        email: formData.email,
        password: formData.password,
      };
      console.log(formDataValues);
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataValues),
      });

      if (!response.ok) {
        throw new Error("Sign In Failed");
      }

      console.log(response.json());
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const signInSlice = createSlice({
  name: "sign-in",
  initialState: {
    email: "",
    password: "",
    errors: {},
  },
  status: "idle",
  errorMessage: null,

  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setErrors: (state, action) => {
      state.errors = { ...action.payload };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.password = action.payload.password;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
      });
  },
});

export const { updateFormData, setErrors } = signInSlice.actions;
export default signInSlice.reducer;
