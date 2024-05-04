"use client";

import { columns } from "./columns";
import { DataTable } from "./dataTable";
import { Verb } from "@/types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";

const PracticeVerbsTable = ({ verbs }: { verbs: any }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { push, refresh } = useRouter();

  return (
    <>
      <DataTable
        columns={columns}
        data={verbs}
        setIsOpenDialog={setIsOpenDialog}
      />
      <AlertDialog open={isOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Gut gemacht!</AlertDialogTitle>
            <AlertDialogDescription>
              <div>Errors: </div>
              <div>Success: 0%</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
            <AlertDialogAction onClick={() => push("/")}>
              Go Home
            </AlertDialogAction>
            <AlertDialogAction onClick={() => refresh()}>
              Learn verbs again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PracticeVerbsTable;
