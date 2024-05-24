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
    <section className="grid items-center pb-8 pt-6 md:py-8 container gap-2">
      <div className="w-full overflow-auto">
        <h2 className="section-title mb-8 xl:mb:16 text-center mx-auto">
          German Irregular Verbs
        </h2>
        {verbs && verbs.length > 0 ? (
          <PracticeVerbsTable
            verbs={shuffleItemsOfArray([...verbs]).slice(0, 10)}
          />
        ) : (
          <Spinner>Loading...</Spinner>
        )}
      </div>
    </section>
  );
}
