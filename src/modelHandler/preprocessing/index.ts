const emojiData = require("./emoji-data.json");
const slangData = require("./slang-data.json");

export class Preprocessing {
  /* htmlPattern: RegExp = new RegExp("<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6})", "gi");
  wePattern: RegExp = new RegExp("\\b\\w*([a-zA-Z])(\\1{1,})\\b", "gi");
  slangPattern: RegExp = new RegExp(`\\b(${Object.keys(slangData).join("|")})\\b`, "gi");
  emojiPattern: RegExp = new RegExp(`(${Object.keys(emojiData).join("|")})`, "gu");
  stemmer: StemmerID = new StemmerID(); */

  run = (text: string): string => {
    /* text = text.toLowerCase();
    text = text.replace(/\s+/gu, " ");
    text = text.replace(this.emojiPattern, (match: string): string => `!${emojiData[match]}!`);
    text = normalizer(text);
    text = text.replace(this.htmlPattern, "");
    text = removeURL(text);
    text = text.replace(this.wePattern, (match: string, replacer: string): string =>
      match.replace(/([a-zA-Z])(\1{1,})/gi, replacer)
    );
    text = text.replace(this.slangPattern, (match: string): string => slangData[match]);
    text = text.replace(/[1-9]/g, "");
    text = text.replace(/[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`{\|}\~]/g, " ");
    text = this.stemmer.stem(text); */
    return text;
  };
}
