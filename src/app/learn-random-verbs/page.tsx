import MainSection from "@/components/mainSection";
import PracticeVerbsTable from "@/components/tables/practiceVerbs/practiceVerbsTable";
import { Spinner } from "@/components/ui/spinner";
import { getLocalData } from "@/lib/getLocalData";
import { shuffleItemsOfArray } from "@/utils/shuffleItemsOfArray";

async function getData() {
  const data = getLocalData();
  return data;
}

export default async function LearnRandomVerbs() {
  const { verbs } = await getData();

  return (
    <MainSection>
      {verbs && verbs.length > 0 ? (
        <PracticeVerbsTable
          verbs={shuffleItemsOfArray([...verbs]).slice(0, 10)}
        />
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </MainSection>
  );
}
