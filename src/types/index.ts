export type Verb = {
  id: string;
  infinitive: string;
  pastSimple: string;
  pastParticle: string;
  translation: string;
  group: string;
};

export type VerbType = Verb & { isFavoriteVerb: boolean };
