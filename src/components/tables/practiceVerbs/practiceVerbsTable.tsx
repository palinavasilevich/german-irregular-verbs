"use client";

import { useEffect, useState } from "react";

import { columns } from "./columns";
import { DataTable } from "./dataTable";

import FeedbackDialog from "@/components/feedback/feedbackDialog";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { addVerbsToStudy } from "@/lib/redux/features/verb.slice";

const PracticeVerbsTable = ({ verbs }: { verbs: any }) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pathname === "/learn-random-verbs") {
      dispatch(addVerbsToStudy(verbs));
    }
  }, []);

  return (
    <>
      <DataTable
        columns={columns}
        data={verbs}
        setIsOpenDialog={setIsOpenDialog}
      />
      <FeedbackDialog
        isOpenDialog={isOpenDialog}
        setIsOpenDialog={setIsOpenDialog}
      />
    </>
  );
};

export default PracticeVerbsTable;
