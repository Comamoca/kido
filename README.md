<div align="center">

![Last commit](https://img.shields.io/github/last-commit/Comamoca/kido?style=flat-square)
![Repository Stars](https://img.shields.io/github/stars/Comamoca/kido?style=flat-square)
![Issues](https://img.shields.io/github/issues/Comamoca/kido?style=flat-square)
![Open Issues](https://img.shields.io/github/issues-raw/Comamoca/kido?style=flat-square)
![Bug Issues](https://img.shields.io/github/issues/Comamoca/kido/bug?style=flat-square)

<img src="https://emoji2svg.deno.dev/api/🦊" alt="eyecatch" height="100">

# kido

Negaposi scoring library for Deno

<br>
<br>

</div>

<div align="center">

</div>

## 🚀 How to use

```ts
import { analyze, getDictRowArray } from "jsr:@comamoca/kido";

// Setup dictionary
const dict = await getDictRowArray()

// Analyze negaposi score
const score = analyze("高まるぞ！ぜったい　いっぱい　輝け！人生は一度きりなんだ", dict)

console.log(score) // => 0.8797344005361823
```

## ⬇️ Install

### Deno

```sh
deno add @comamoca/kido
```

## ⛏️ Development

```sh
deno check *.ts
```

## ❓ FAQ

### I got Error `Dictionary contains an invalid value`

Please remove deno localStrage cache.
In Linux, that directory at `~/.cache/deno/location_data/`.

### Why mean kido?

The name from four-character idiom 喜怒哀楽(kidoairaku) it mean various human emotions in Japanease.

### What mean sample text at [How to use](#-how-to-use)

https://www.youtube.com/watch?v=O8CPTwwbvBA

## 📜 License

MIT

## 🧩 Modules

- [@core/unknownutil](https://jsr.io/@core/unknownutil)
- [@es-toolkit/es-toolkit](https://jsr.io/@es-toolkit/es-toolkit)
- [@valibot/valibot](https://jsr.io/@valibot/valibot)
- [@goya-core](https://www.npmjs.com/package/goya-core)
- [@goya-features](https://www.npmjs.com/package/goya-features)
- [@moji](https://www.npmjs.com/package/moji)

## 👏 Affected projects

- [negaposi-analyzer-ja](https://github.com/azu/negaposi-analyzer-ja)

## 💕 Special Thanks

- [単語感情極性対応表](http://www.lr.pi.titech.ac.jp/~takamura/pndic_ja.html)
