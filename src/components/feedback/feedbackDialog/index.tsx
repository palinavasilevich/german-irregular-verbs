"use client";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { ReloadIcon, HomeIcon, Cross1Icon } from "@radix-ui/react-icons";
import FeedbackScore from "../feedbackScore";
import { useSelector } from "react-redux";
import { selectResults } from "@/lib/redux/features/verb.slice";

const FeedbackDialog = ({
  isOpenDialog,
  setIsOpenDialog,
}: {
  isOpenDialog: boolean;
  setIsOpenDialog: (isOpenDialog: boolean) => void;
}) => {
  const { push } = useRouter();

  const { numberOfCorrectAnswers, numberOfAllVerbs } =
    useSelector(selectResults);

  return (
    <AlertDialog open={isOpenDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <Button
            className="w-8 h-8 p-0 absolute right-3 top-2"
            variant="ghost"
            onClick={() => setIsOpenDialog(false)}
          >
            <Cross1Icon className="h-4 w-4" />
          </Button>
          <AlertDialogTitle className="text-2xl">Gut gemacht!</AlertDialogTitle>
          <AlertDialogDescription>
            <FeedbackScore
              numberOfCorrectAnswers={numberOfCorrectAnswers}
              numberOfAllElements={numberOfAllVerbs}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => push("/verbs")}>
            <HomeIcon className="w-4 h-4 font-bold mr-2" />
            All verbs
          </AlertDialogAction>
          <AlertDialogAction
            className="mb-4"
            onClick={() => window.location.reload()}
          >
            <ReloadIcon className="w-4 h-4 font-bold mr-2" />
            Learn verbs again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeedbackDialog;
