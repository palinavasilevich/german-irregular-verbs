import MainSection from "@/components/mainSection";
import { AllVerbsTable } from "@/components/tables/verbs/allVerbsTable";
import { columns } from "@/components/tables/verbs/columns";

import { getLocalData } from "@/utils/getLocalData";

async function getData() {
  const data = getLocalData();
  return data;
}

export default async function Verbs() {
  const { verbs } = await getData();

  return (
    <MainSection>
      {verbs && verbs.length > 0 && (
        <AllVerbsTable data={verbs} columns={columns} verbs={verbs} />
      )}
    </MainSection>
  );
}
