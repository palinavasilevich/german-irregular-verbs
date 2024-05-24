"use client";

import { columns } from "./columns";
import { DataTable } from "./dataTable";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectResults } from "@/lib/redux/features/verb.slice";

const PracticeVerbsTable = ({ verbs }: { verbs: any }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const { push, refresh } = useRouter();

  const { numberOfIncorrectAnswers, percentageOfCorrectAnswers } =
    useSelector(selectResults);

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
              <div>Errors: {numberOfIncorrectAnswers}</div>
              <div>{`Success: ${percentageOfCorrectAnswers}%`}</div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
            <AlertDialogAction onClick={() => push("/verbs")}>
              All verbs
            </AlertDialogAction>
            <AlertDialogAction
              className="mb-4"
              onClick={() => {
                window.location.reload();
                // refresh();
              }}
            >
              Learn verbs again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default PracticeVerbsTable;
