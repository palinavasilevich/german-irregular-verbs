import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Verb } from "@/types";
import { storage } from "@/utils/storage";

type LearnedVerb = {
  id: string;
  isCorrectValue: boolean;
};

type InitialState = {
  selectedVerbs: Verb[] | null;
  learnedVerbs: LearnedVerb[] | null;
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

const initialState = {
  selectedVerbs: initialSelectedVerbs,
  learnedVerbs: initialLearnedVerbs,
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
  },
});

export const { toggleCorrectValue, addVerbsToStudy, calculateResults } =
  verbSlice.actions;

export default verbSlice.reducer;

export const selectSelectedVerbs = (state: RootState) =>
  state.verb.selectedVerbs;
export const selectLearnedVerbs = (state: RootState) => state.verb.learnedVerbs;

export const selectResults = (state: RootState) => state.verb.results;
