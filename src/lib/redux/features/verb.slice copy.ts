import { RootState } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Verb } from "@/types";
import { storage } from "@/utils/storage";

type LearnedVerb = {
  id: string;
  isCorrectValue: boolean;
};

export type VerbType = Verb & { isFavoriteVerb: boolean };

type InitialState = {
  verbs: VerbType[] | null;
  selectedVerbs: Verb[] | null;
  learnedVerbs: LearnedVerb[] | null;
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

const initialVerbs = storage.getItem("verbs") || null;

const initialState = {
  verbs: initialVerbs,
  selectedVerbs: initialSelectedVerbs,
  learnedVerbs: initialLearnedVerbs,
  results: {
    numberOfCorrectAnswers: 0,
    numberOfAllVerbs: 0,
  },
} as InitialState;

export const verbSlice = createSlice({
  name: "verb",
  initialState,
  reducers: {
    addVerbs: (state, action: PayloadAction<VerbType[]>) => {
      if (!initialVerbs) {
        const verbs = action.payload;

        state.verbs = verbs;
        storage.setItem("verbs", verbs);
      }
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

    toggleFavoriteVerb: (state, action: PayloadAction<string>) => {
      const updatedVerbs = state.verbs?.map((verb: VerbType) => {
        if (verb.infinitive === action.payload) {
          return {
            ...verb,
            isFavoriteVerb: !verb.isFavoriteVerb,
          };
        }
        return verb;
      });

      if (updatedVerbs) {
        state.verbs = updatedVerbs;
        storage.setItem("verbs", updatedVerbs);
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
  toggleFavoriteVerb,
} = verbSlice.actions;

export default verbSlice.reducer;

export const selectSelectedVerbs = (state: RootState) =>
  state.verb.selectedVerbs;
export const selectLearnedVerbs = (state: RootState) => state.verb.learnedVerbs;
export const selectResults = (state: RootState) => state.verb.results;
