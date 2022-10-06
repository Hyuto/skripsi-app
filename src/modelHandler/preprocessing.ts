import { Stemmer, Tokenizer } from "sastrawijs";

const emojiData = require("./emoji-data.json");
const slangData = require("./slang-data.json");

export class Preprocessing {
  htmlPattern: RegExp = new RegExp("<.*?>|&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-f]{1,6})", "gi");
  urlPattern: RegExp = new RegExp(
    "\\b((?:https?:(?:/{1,3}|[a-z0-9%])|[a-z0-9.\\-]+[.](?:com|net|org|edu|gov|mil|aero|asia|biz|" +
      "cat|coop|info|int|jobs|mobi|museum|name|post|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|" +
      "an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|" +
      "ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|" +
      "eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|" +
      "gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|" +
      "kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|" +
      "mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|" +
      "pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|" +
      "su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|" +
      "vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)/)(?:[^\\s()<>{}\\[\\]]+|\\([^\\s()]*?\\([^\\" +
      "s()]+\\)[^\\s()]*?\\)|\\([^\\s]+?\\))+(?:\\([^\\s()]*?\\([^\\s()]+\\)[^\\s()]*?\\)|\\([" +
      "^\\s]+?\\)|[^\\s`!()\\[\\]{};:'\\\".,<>?«»“”‘’])|(?:(?<!@)[a-z0-9]+(?:[.\\-][a-z0-9]+)*" +
      "[.](?:com|net|org|edu|gov|mil|aero|asia|biz|cat|coop|info|int|jobs|mobi|museum|name|post" +
      "|pro|tel|travel|xxx|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|" +
      "bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cs|cu|" +
      "cv|cx|cy|cz|dd|de|dj|dk|dm|do|dz|ec|ee|eg|eh|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|" +
      "gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|" +
      "is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|" +
      "mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|" +
      "np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|" +
      "se|sg|sh|si|sj|Ja|sk|sl|sm|sn|so|sr|ss|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|" +
      "to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw)\\" +
      "b/?(?!@)))",
    "gi"
  );
  wePattern: RegExp = new RegExp("\\b\\w*([a-zA-Z])(\\1{1,})\\b", "gi");
  slangPattern: RegExp = new RegExp(`\\b(${Object.keys(slangData).join("|")})\\b`, "gi");
  emojiPattern: RegExp = new RegExp(`(${Object.keys(emojiData).join("|")})`, "gu");
  encoder: TextEncoder = new TextEncoder();
  asciiDecoder: TextDecoder = new TextDecoder("ascii");
  tokenizer = new Tokenizer();
  stemmer = new Stemmer();

  #replaceEmoji = (...args: any[]): string => {
    const match = args[0] as string;
    return `!${emojiData[match]}!`;
  };

  #replaceWE = (...args: any[]): string => {
    const match = args[0] as string;
    const replacer = args[1] as string;
    return match.replace(/([a-zA-Z])(\1{1,})/gi, replacer);
  };

  #replaceSlang = (...args: any[]): string => {
    const match = args[0] as string;
    return slangData[match];
  };

  run = (text: string): string => {
    text = text.toLowerCase();
    text = text.replace(/\s+/gu, " ");
    text = text.replace(this.emojiPattern, this.#replaceEmoji);
    text = this.asciiDecoder
      .decode(this.encoder.encode(text.normalize("NFD")))
      .replace(/[^\x00-\x7F]/g, "");
    text = text.replace(this.htmlPattern, "");
    text = text.replace(this.urlPattern, "");
    text = text.replace(this.wePattern, this.#replaceWE);
    text = text.replace(this.slangPattern, this.#replaceSlang);
    text = text.replace(/[1-9]/g, "");
    text = text.replace(/[!"#\$%&'\(\)\*\+,\-\.\/:;<=>\?@\[\\\]\^_`{\|}\~]/g, " ");
    text = text.split(" ").join(" ");
    const tokens = this.tokenizer.tokenize(text) as string[];
    return tokens.map((word) => this.stemmer.stem(word)).join(" ");
  };
}
