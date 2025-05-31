import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  phrases: [
    {
      id: 1,
      text: "Hello, world!"
    },
    {
      id: 2,
      text: "Try to add a new phrase!"
    },
    {
      id: 3,
      text: "Or delete one!"
    }
  ]
};

export const phrasesSlice = createSlice({
  name: "phrases",
  initialState,
  reducers: {
    addPhrase: (state, action) => {
      const newPhrase = {
        id: state.phrases.length + 1,
        text: action.payload
      };
      state.phrases.push(newPhrase);
    },
    deletePhrase: (state, action) => {
      state.phrases = state.phrases.filter(phrase => phrase.id !== action.payload);
    }
  }
});

export const { addPhrase, deletePhrase } = phrasesSlice.actions;
export default phrasesSlice.reducer;
