"use client";

import PracticeVerbsTable from "@/components/tables/practiceVerbs/practiceVerbsTable";
import { shuffleItemsOfArray } from "@/utils/shuffleItemsOfArray";
import { Spinner } from "@/components/ui/spinner";
import { useSelector } from "react-redux";
import { selectSelectedVerbs } from "@/lib/redux/features/verb.slice";
import MainSection from "@/components/mainSection";

const PracticePage = () => {
  const selectedVerbs = useSelector(selectSelectedVerbs);

  return (
    <MainSection>
      {selectedVerbs && selectedVerbs.length > 0 ? (
        <PracticeVerbsTable verbs={shuffleItemsOfArray([...selectedVerbs])} />
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </MainSection>
  );
};

export default PracticePage;
