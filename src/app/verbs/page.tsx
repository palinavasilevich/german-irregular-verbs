import MainSection from "@/components/mainSection";
import AllVerbsTable from "@/components/tables/verbs/allVerbsTable";
import { getLocalData } from "@/lib/getLocalData";

async function getData() {
  const data = getLocalData();
  return data;
}

export default async function Verbs() {
  const { verbs } = await getData();

  return (
    <MainSection>
      <AllVerbsTable verbs={verbs} />
    </MainSection>
  );
}
