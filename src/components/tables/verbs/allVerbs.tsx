"use client";

import { useGetVerbsQuery } from "@/lib/redux/features/api.slice";
import { AllVerbsTable } from "./allVerbsTable";
import { columns } from "./columns";
import { Spinner } from "@/components/ui/spinner";

const AllVerbs = () => {
  const { isLoading, data } = useGetVerbsQuery();

  return (
    <>
      {!isLoading && data ? (
        <AllVerbsTable data={data} columns={columns} />
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </>
  );
};

export default AllVerbs;
