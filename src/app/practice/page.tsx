"use client";

import { useContext } from "react";
import { VerbContext } from "@/context/VerbContext";

import PracticeVerbsTable from "@/components/tables/practiceVerbs/practiceVerbsTable";
import { shuffleItemsOfArray } from "@/utils/shuffleItemsOfArray";

const PracticePage = () => {
  const { selectedVerbs } = useContext(VerbContext);

  return (
    <section className="grid items-center pb-8 pt-6 md:py-8 container gap-2">
      <div className="container mx-auto">
        <h2 className="section-title mb-8 text-center mx-auto">
          German Irregular Verbs
        </h2>
        <PracticeVerbsTable verbs={shuffleItemsOfArray(selectedVerbs)} />
      </div>
    </section>
  );
};

export default PracticePage;
