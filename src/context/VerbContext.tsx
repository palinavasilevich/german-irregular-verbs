import { createContext, useEffect, useMemo, useState, useContext } from "react";

import { storage } from "@/utils/storage";
import { Verb } from "@/types";

interface LearnedVerb {
  id: string;
  isCorrectValue: boolean;
}

interface VerbContextType {
  verbs: Verb[] | null;
  selectedVerbs: Verb[] | null;
  learnedVerbs: LearnedVerb[] | null;
  favoriteVerbs: Verb[] | [];
  results: {
    numberOfCorrectAnswers: number;
    numberOfIncorrectAnswers: number;
    percentageOfCorrectAnswers: number;
  };

  addVerbsToStudy: (verbs: Verb[]) => void;
  markCorrectAnswer: (verbId: string) => void;
  calculateResults: () => void;
  addFavoriteVerb: (verbId: string) => void;
  removeFavoriteVerb: (verbId: string) => void;
  setVerbs: (verbs: Verb[]) => void;
  setSelectedVerbs: (verbs: Verb[] | null) => void;
  removeSelectedVerbs: () => void;
}

enum Fields {
  infinitive,
  pastParticle,
  pastSimple,
}

const VerbContext = createContext<VerbContextType | null>(null);

export const VerbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialSelectedVerbs = storage.getItem("selectedVerbs") || null;
  const initialLearnedVerbs = storage.getItem("learnedVerbs") || null;
  const initialFavoriteVerbs = storage.getItem("favoriteVerbs") || null;
  const initialVerbs = storage.getItem("verbs") || null;

  const [verbs, setVerbs] = useState(initialVerbs);
  const [selectedVerbs, setSelectedVerbs] = useState(initialSelectedVerbs);
  const [learnedVerbs, setLearnedVerbs] = useState(initialLearnedVerbs);
  const [favoriteVerbs, setFavoriteVerbs] = useState(initialFavoriteVerbs);
  const [results, setResults] = useState({
    numberOfCorrectAnswers: 0,
    numberOfIncorrectAnswers: 0,
    percentageOfCorrectAnswers: 0,
  });

  const saveSelectedVerbs = (verbs: Verb[]) => {
    const newLearnedVerbs: LearnedVerb[] = [];

    verbs.map((verb: Verb) => {
      for (const [key, value] of Object.entries(verb)) {
        if (key in Fields) {
          newLearnedVerbs.push({ id: value, isCorrectValue: false });
        }
      }
    });
    setLearnedVerbs(newLearnedVerbs);
    storage.setItem("learnedVerbs", newLearnedVerbs);
  };

  const removeSelectedVerbs = () => {
    setSelectedVerbs(null);
    storage.removeItem("selectedVerbs");
    setLearnedVerbs(null);
    storage.removeItem("learnedVerbs");
  };

  const addVerbsToStudy = (verbs: Verb[]) => {
    setSelectedVerbs(verbs);
    storage.setItem("selectedVerbs", verbs);
    saveSelectedVerbs(verbs);
  };

  const markCorrectAnswer = (verbId: string) => {
    const verb = learnedVerbs?.find((v: LearnedVerb) => {
      return v.id === verbId;
    });

    if (verb) {
      verb.isCorrectValue = true;
    }
  };

  const calculateResults = () => {
    const numberOfCorrectAnswers =
      learnedVerbs?.filter((verb: LearnedVerb) => verb.isCorrectValue).length ||
      0;

    const numberOfAllVerbs = learnedVerbs?.length || 0;

    const numberOfIncorrectAnswers = numberOfAllVerbs - numberOfCorrectAnswers;

    const percentageOfCorrectAnswers = +(
      (numberOfCorrectAnswers * 100) /
      numberOfAllVerbs
    ).toFixed(2);

    setResults({
      numberOfCorrectAnswers,
      numberOfIncorrectAnswers,
      percentageOfCorrectAnswers,
    });
  };

  const addFavoriteVerb = (verbId: string) => {
    const verb = verbs?.find((v: Verb) => {
      return v.infinitive === verbId;
    });

    if (verb) {
      const newFavoriteVerbs = [...favoriteVerbs, verb];
      setFavoriteVerbs(newFavoriteVerbs);
      storage.setItem("favoriteVerbs", newFavoriteVerbs);
    }
  };

  const removeFavoriteVerb = (verbId: string) => {
    const newFavoriteVerbs = favoriteVerbs?.filter(
      (v: Verb) => v.infinitive !== verbId
    );

    setFavoriteVerbs(newFavoriteVerbs);
    storage.setItem("favoriteVerbs", newFavoriteVerbs);
  };

  const value = useMemo(
    () => ({
      verbs,
      selectedVerbs,
      learnedVerbs,
      favoriteVerbs,
      results,

      addVerbsToStudy,
      markCorrectAnswer,
      calculateResults,
      addFavoriteVerb,
      removeFavoriteVerb,
      removeSelectedVerbs,

      setVerbs,
      setSelectedVerbs,
    }),
    [verbs]
  );

  return <VerbContext.Provider value={value}>{children}</VerbContext.Provider>;
};

export const useVerb = () => useContext(VerbContext);
