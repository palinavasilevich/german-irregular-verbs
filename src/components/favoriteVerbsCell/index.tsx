"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFavoriteVerbs,
  addFavoriteVerb,
  removeFavoriteVerb,
} from "@/lib/redux/features/verb.slice";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Verb } from "@/types";
import { cn } from "@/lib/utils";

interface FavoriteVerbsCellPropsType {
  row: Row<any>;
}

const FavoriteVerbsCell = ({ row }: FavoriteVerbsCellPropsType) => {
  const verb = row.original;
  const favoriteVerbs = useSelector(selectFavoriteVerbs);
  const dispatch = useDispatch();

  const [isFavoriteVerb, setIsFavoriteVerb] = useState(
    !!favoriteVerbs?.find((v: Verb) => v.infinitive === verb.infinitive)
  );

  const handleAddFavoriteVerb = () => {
    dispatch(addFavoriteVerb(verb.infinitive));
    setIsFavoriteVerb(true);
  };

  const handleRemoveFavoriteVerb = () => {
    dispatch(removeFavoriteVerb(verb.infinitive));
    setIsFavoriteVerb(false);
  };

  return (
    <Button
      variant="ghost"
      onClick={
        isFavoriteVerb ? handleRemoveFavoriteVerb : handleAddFavoriteVerb
      }
      className="h-8 w-8 p-0"
    >
      <Star
        className={cn("h-4 w-4", isFavoriteVerb ? "fill-violet-700" : "")}
      />
    </Button>
  );
};

export default FavoriteVerbsCell;
