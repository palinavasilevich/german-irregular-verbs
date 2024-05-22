"use client";

import PracticeVerbsTable from "@/components/tables/practiceVerbs/practiceVerbsTable";
import { shuffleItemsOfArray } from "@/utils/shuffleItemsOfArray";
import { Spinner } from "@/components/ui/spinner";
import { useSelector } from "react-redux";
import { selectSelectedVerbs } from "@/lib/redux/features/verb.slice";

const PracticePage = () => {
  const selectedVerbs = useSelector(selectSelectedVerbs);

  return (
    <section className="grid items-center pb-8 pt-6 md:py-8 container gap-2">
      <div>
        <h2 className="section-title mb-8 text-center mx-auto">
          German Irregular Verbs
        </h2>
        {selectedVerbs && selectedVerbs.length > 0 ? (
          <PracticeVerbsTable verbs={shuffleItemsOfArray([...selectedVerbs])} />
        ) : (
          <Spinner>Loading...</Spinner>
        )}
      </div>
    </section>
  );
};

export default PracticePage;
