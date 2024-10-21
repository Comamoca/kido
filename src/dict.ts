import { parse } from "@std/csv";
import { Dict, DictRow, isDictRow } from "./type.ts";
import moji from "moji";
import { is } from "@core/unknownutil";

const decoder = new TextDecoder("shift-jis");

/**
 * @description Fetch the word emotion polarity correspondence table and cache it in localStorage.
 * @function
 */
export async function getNegaPosiDict(): Promise<string> {
  const dict_url = "http://www.lr.pi.titech.ac.jp/~takamura/pubs/pn_ja.dic";
  const negaPosiDict = localStorage.getItem("dict");

  if (is.Null(negaPosiDict)) {
    const resp = await fetch(dict_url);
    const buf = await resp.arrayBuffer();

    const text = decoder.decode(buf);

    localStorage.setItem("dict", text);

    return text;
  }

  return negaPosiDict;
}

/**
 * @description Call `getNegaPosiDict` to generate the JSON format of the dictionary and cache it in localStorage.
 * @function
 */
export async function getDictRowArray(): Promise<Dict> {
  const dictRow = localStorage.getItem("dictRowArray");

  if (is.Null(dictRow)) {
    const dictRow = await makeDictRowArray();
    localStorage.setItem("dictRowArray", JSON.stringify(dictRow));

    return dictRow;
  }

  if (isDictRow(dictRow)) {
    return JSON.parse(dictRow) as Dict;
  } else {
    throw TypeError("Dictionary contains an invalid value");
  }
}

async function makeDictRowArray() {
  const posinega_dict = await getNegaPosiDict();
  const csv = parse(posinega_dict, { separator: ":" });

  return csv.map((row): DictRow => {
    return {
      "surface": row[0],
      "reading": moji(row[1]).convert("HG", "KK").toString(),
      "pos": row[2],
      "rank": parseFloat(row[3]),
    };
  });
}
