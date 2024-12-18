import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "sign-up/signUpUser",
  async (formData, { rejectWithValue }) => {
    try {
      const formDataValues = {
        displayName: formData.displayName,
        email: formData.email,
        password: formData.password,
      };
      console.log(formDataValues);
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataValues),
      });

      if (!response.ok) {
        throw new Error("Sign Up Failed");
      }

      console.log(response.json());
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const signUpSlice = createSlice({
  name: "sign-up",
  initialState: {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
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
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.displayName = action.payload.displayName;
        state.email = action.payload.email;
        state.password = action.payload.password;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.status = "failed";
        state.errorMessage = action.payload;
      });
  },
});

export const { updateFormData, setErrors } = signUpSlice.actions;
export default signUpSlice.reducer;
