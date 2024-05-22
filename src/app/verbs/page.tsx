import AllVerbsTable from "@/components/tables/verbs/allVerbsTable";
import { getLocalData } from "@/lib/getLocalData";

async function getData() {
  const data = getLocalData();
  return data;
}

export default async function Verbs() {
  const { verbs } = await getData();

  return (
    <section className="grid items-center pb-8 pt-6 md:py-8 container gap-2">
      <div>
        <h2 className="section-title mb-8 xl:mb:16 text-center mx-auto">
          German Irregular Verbs
        </h2>
        <AllVerbsTable verbs={verbs} />
      </div>
    </section>
  );
}
