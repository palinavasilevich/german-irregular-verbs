import { Progress } from "@/components/ui/progress";

import { Star } from "lucide-react";

const FeedbackScore = ({
  numberOfCorrectAnswers,
  numberOfAllElements,
}: {
  numberOfCorrectAnswers: number;
  numberOfAllElements: number;
}) => {
  return (
    <div>
      <p className="text-base">
        You have {numberOfCorrectAnswers} out of {numberOfAllElements} points
      </p>
      <div>
        <div className="flex justify-between items-center gap-6 mt-2">
          <div className="w-full flex-1 flex justify-between items-center relative">
            <Progress
              className="h-5"
              value={+((numberOfCorrectAnswers * 100) / numberOfAllElements)}
            />
            <Star
              className={`w-10 h-10 absolute -right-5 ${
                numberOfCorrectAnswers === numberOfAllElements
                  ? "fill-violet-700"
                  : "fill-white"
              }`}
            />
          </div>
          <span className="text-right text-xl font-bold">
            {numberOfCorrectAnswers} / {numberOfAllElements}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FeedbackScore;
