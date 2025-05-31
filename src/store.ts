import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import phrasesReducer from "./slice";

const rootReducer = combineReducers({
  phrases: phrasesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

// Export a hook that can be reused to resolve types
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export function setupStore(preloadedState: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
};
