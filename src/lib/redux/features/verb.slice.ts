import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Verb } from "@/types";
import { storage } from "@/utils/storage";

type LearnedVerb = {
  id: string;
  isCorrectValue: boolean;
};

type InitialState = {
  verbs: Verb[] | null;
  selectedVerbs: Verb[] | null;
  learnedVerbs: LearnedVerb[] | null;
  favoriteVerbs: Verb[] | [];
  results: {
    numberOfCorrectAnswers: number;
    numberOfAllVerbs: number;
  };
};

enum Fields {
  infinitive,
  pastParticle,
  pastSimple,
}

const initialSelectedVerbs = storage.getItem("selectedVerbs") || null;
const initialLearnedVerbs = storage.getItem("learnedVerbs") || null;
const initialFavoriteVerbs = storage.getItem("favoriteVerbs") || [];

const initialVerbs = storage.getItem("verbs") || null;

const initialState = {
  verbs: initialVerbs,
  selectedVerbs: initialSelectedVerbs,
  learnedVerbs: initialLearnedVerbs,
  favoriteVerbs: initialFavoriteVerbs,
  results: {
    numberOfCorrectAnswers: 0,
    numberOfAllVerbs: 0,
  },
} as InitialState;

export const verbSlice = createSlice({
  name: "verb",
  initialState,
  reducers: {
    addVerbs: (state, action: PayloadAction<Verb[]>) => {
      const verbs = action.payload;
      state.verbs = verbs;

      storage.setItem("verbs", verbs);
    },

    removeSelectedVerbs: (state) => {
      state.selectedVerbs = null;
      storage.removeItem("selectedVerbs");
      state.learnedVerbs = null;
      storage.removeItem("learnedVerbs");
    },

    addVerbsToStudy: (state, action: PayloadAction<any[]>) => {
      const selectedVerbs = action.payload;
      state.selectedVerbs = selectedVerbs;
      storage.setItem("selectedVerbs", selectedVerbs);

      const newLearnedVerbs: LearnedVerb[] = [];

      selectedVerbs?.map((verb: Verb) => {
        for (const [key, value] of Object.entries(verb)) {
          if (key in Fields) {
            newLearnedVerbs.push({ id: value, isCorrectValue: false });
          }
        }
      });
      state.learnedVerbs = newLearnedVerbs;
      storage.setItem("learnedVerbs", newLearnedVerbs);
    },

    markCorrectAnswer: (state, action: PayloadAction<string>) => {
      const verbId = action.payload;
      const verb = state.learnedVerbs?.find((v: LearnedVerb) => {
        return v.id === verbId;
      });

      if (verb) {
        verb.isCorrectValue = true;
      }
    },

    calculateResults: (state) => {
      const numberOfCorrectAnswers =
        state.learnedVerbs?.filter((verb) => verb.isCorrectValue).length || 0;

      const numberOfAllVerbs = state.learnedVerbs?.length || 0;

      state.results = {
        numberOfCorrectAnswers,
        numberOfAllVerbs,
      };
    },

    addFavoriteVerb: (state, action: PayloadAction<string>) => {
      const verb = state.verbs?.find((v: Verb) => {
        return v.infinitive === action.payload;
      });

      if (verb) {
        const favoriteVerbs = [...state.favoriteVerbs, verb];
        storage.setItem("favoriteVerbs", favoriteVerbs);
        state.favoriteVerbs = favoriteVerbs;
      }
    },

    removeFavoriteVerb: (state, action: PayloadAction<string>) => {
      const favoriteVerbs = state.favoriteVerbs?.filter(
        (v: Verb) => v.infinitive !== action.payload
      );

      if (favoriteVerbs) {
        storage.setItem("favoriteVerbs", favoriteVerbs);
        state.favoriteVerbs = favoriteVerbs;
      }
    },
  },
});

export const {
  addVerbs,
  removeSelectedVerbs,
  markCorrectAnswer,
  addVerbsToStudy,
  calculateResults,
  addFavoriteVerb,
  removeFavoriteVerb,
} = verbSlice.actions;

export default verbSlice.reducer;

export const selectSelectedVerbs = (state: RootState) =>
  state.verb.selectedVerbs;
export const selectLearnedVerbs = (state: RootState) => state.verb.learnedVerbs;
export const selectFavoriteVerbs = (state: RootState) =>
  state.verb.favoriteVerbs;
export const selectResults = (state: RootState) => state.verb.results;
