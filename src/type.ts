import * as v from "@valibot/valibot";

export const DictRowSchema = v.object({
  surface: v.string(),
  reading: v.string(),
  pos: v.string(),
  rank: v.number(),
});

export type DictRow = v.InferOutput<typeof DictRowSchema>;
export type Dict = Array<DictRow>;

export type analyzeOption = {
  text: string;
};

export const posiNegaRatioTypeSchema = v.object({
  posi: v.number(),
  nega: v.number(),
  zero: v.number(),
});

export type posiNegaRatioType = v.InferOutput<typeof posiNegaRatioTypeSchema>;
