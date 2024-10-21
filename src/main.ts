import core from "goya-core";
import { get_features } from "goya-features";
import type { Dict, DictRow, posiNegaRatioType } from "./type.ts";

/**
 * @description Analyze negaposi score from text.
 * @function
 * `posiNegaRatioType` origin of default value: https://github.com/azu/negaposi-analyzer-ja/blob/c27ff9c91b760f1d8bd4993fbf2a559267256f80/src/negaposi-analyzer-ja.js#L10
 */
export function analyze(
  text: string,
  dict: Dict,
  posiNegaRatio: posiNegaRatioType = {
    posi: 5122,
    nega: 49983,
    zero: 20,
  },
): number {
  const lattice = core.parse(text);
  const morphemes = lattice.find_best();
  const tokens = get_features(morphemes.map((morph) => morph.wid));

  const feature = morphemes.map(
    ({ _surface_form }, i): Omit<DictRow, "rank"> => {
      const feature = tokens[i];

      // 単語そのもの
      const surface = feature[6];
      // 読み
      const reading = feature[7];
      // 品詞
      const pos = feature[0];

      return { surface: surface, reading: reading, pos: pos };
    },
  );

  // ref: https://github.com/azu/negaposi-analyzer-ja/blob/c27ff9c91b760f1d8bd4993fbf2a559267256f80/src/negaposi-analyzer-ja.js#L15
  const positiveCorrections = 1;
  const negativeCorrections = posiNegaRatio.posi / posiNegaRatio.nega;

  // Calcurate negaposi score
  const score = feature
    .map((f) => findDict(f, dict))
    .flat()
    .map((rank) => {
      // ref: https://github.com/azu/negaposi-analyzer-ja/blob/c27ff9c91b760f1d8bd4993fbf2a559267256f80/src/negaposi-analyzer-ja.js#L56
      if (rank > 0) {
        // positive
        return rank * positiveCorrections;
      } else {
        // negative
        return rank * negativeCorrections;
      }
    })
    .reduce((a, b) => a + b);

  return score;
}

function findDict(feature: Omit<DictRow, "rank">, dict: Dict) {
  return dict
    .filter((item) => {
      return item.surface == feature.surface && item.pos && feature.pos &&
        item.reading && feature.reading;
    })
    .map((item) => item)
    .map((item) => item.rank);
}
