export type DictRow = {
  surface: string;
  reading: string;
  pos: string;
  rank: number;
};

export const isDictRow = (item: unknown): item is DictRow => {
  return (
    !!(item as DictRow)?.pos && !!(item as DictRow).rank &&
    !!(item as DictRow)?.reading && !!(item as DictRow)?.surface
  );
};

export type Dict = Array<DictRow>;

export type analyzeOption = {
  text: string;
};

export type posiNegaRatioType = {
  posi: number;
  nega: number;
  zero: number;
};

export const posiNegaRatioType = (item: unknown): item is posiNegaRatioType => {
  return (
    !!(item as posiNegaRatioType)?.nega &&
    !!(item as posiNegaRatioType)?.posi &&
    !!(item as posiNegaRatioType)?.zero
  );
};
