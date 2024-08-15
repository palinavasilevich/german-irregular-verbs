export type Verb = {
  id: string;
  infinitive: string;
  pastSimple: string;
  pastParticle: string;
  translation: string;
  group: string;
};

export type VerbType = Verb & { isFavoriteVerb: boolean };

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export interface DataTableFilterField {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
  count: number;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
  count: number;
}
