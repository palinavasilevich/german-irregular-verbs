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
  favoriteVerbs: Verb[] | null;
  results: {
    numberOfCorrectAnswers: number;
    numberOfIncorrectAnswers: number;
    percentageOfCorrectAnswers: number;
  };
};

enum Fields {
  infinitive,
  pastParticle,
  pastSimple,
}

const initialSelectedVerbs = storage.getItem("selectedVerbs") || null;
let initialLearnedVerbs = null;

if (initialSelectedVerbs) {
  initialLearnedVerbs = [];
  initialSelectedVerbs.map((verb: Verb) => {
    for (const [key, value] of Object.entries(verb)) {
      if (key in Fields) {
        initialLearnedVerbs.push({ id: value, isCorrectValue: false });
      }
    }
  });
}

const initialFavoriteVerbs = storage.getItem("favoriteVerbs") || null;

const initialVerbs = storage.getItem("verbs") || null;

const initialState = {
  verbs: initialVerbs,
  selectedVerbs: initialSelectedVerbs,
  learnedVerbs: initialLearnedVerbs,
  favoriteVerbs: initialFavoriteVerbs,
  results: {
    numberOfCorrectAnswers: 0,
    numberOfIncorrectAnswers: 0,
    percentageOfCorrectAnswers: 0,
  },
} as InitialState;

export const verbSlice = createSlice({
  name: "verb",
  initialState,
  reducers: {
    addVerbsToStudy: (state, action: PayloadAction<Verb[]>) => {
      const selectedVerbs = action.payload;
      storage.setItem("selectedVerbs", selectedVerbs);
      state.selectedVerbs = selectedVerbs;
    },

    toggleCorrectValue: (state, action: PayloadAction<{ id: string }>) => {
      const verb = state.learnedVerbs?.find((v: LearnedVerb) => {
        return v.id === action.payload.id;
      });

      if (verb) {
        verb.isCorrectValue = true;
      }
    },

    calculateResults: (state) => {
      const numberOfCorrectAnswers =
        state.learnedVerbs?.filter((verb) => verb.isCorrectValue).length || 0;

      const numberOfAllVerbs = state.learnedVerbs?.length || 0;

      const numberOfIncorrectAnswers =
        numberOfAllVerbs - numberOfCorrectAnswers;

      const percentageOfCorrectAnswers =
        (numberOfCorrectAnswers * 100) / numberOfAllVerbs;

      state.results = {
        numberOfCorrectAnswers,
        numberOfIncorrectAnswers,
        percentageOfCorrectAnswers,
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
  toggleCorrectValue,
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
