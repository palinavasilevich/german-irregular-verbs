import { Verb } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./dataTable";

const AllVerbsTable = ({ verbs }: { verbs: Verb[] }) => {
  return <DataTable columns={columns} data={verbs} />;
};

export default AllVerbsTable;
