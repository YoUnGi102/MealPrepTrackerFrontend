import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RedirectState {
  redirectUrl: string | null;
}

const initialState: RedirectState = {
  redirectUrl: null,
};

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    setRedirectUrl(state, action: PayloadAction<string | null>) {
      state.redirectUrl = action.payload;
    },
  },
});

export const { setRedirectUrl } = redirectSlice.actions;

export default redirectSlice.reducer;