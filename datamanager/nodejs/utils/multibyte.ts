/* eslint-disable no-control-regex */

type MojiCategory = 'kana' | 'alphanumeric';
type MojiDirection = 'HtoZ' | 'ZtoH';
type MojiByte = 'ascii' | 'non-ascii';

export class Moji {
  private H_KANA = ['ｳﾞ', 'ｶﾞ', 'ｷﾞ', 'ｸﾞ', 'ｹﾞ', 'ｺﾞ', 'ｻﾞ', 'ｼﾞ', 'ｽﾞ', 'ｾﾞ', 'ｿﾞ', 'ﾀﾞ', 'ﾁﾞ', 'ﾂﾞ', 'ﾃﾞ', 'ﾄﾞ', 'ﾊﾞ', 'ﾋﾞ', 'ﾌﾞ', 'ﾍﾞ', 'ﾎﾞ', 'ﾊﾟ', 'ﾋﾟ', 'ﾌﾟ', 'ﾍﾟ', 'ﾎﾟ', 'ｱ', 'ｲ', 'ｳ', 'ｴ', 'ｵ', 'ｶ', 'ｷ', 'ｸ', 'ｹ', 'ｺ', 'ｻ', 'ｼ', 'ｽ', 'ｾ', 'ｿ', 'ﾀ', 'ﾁ', 'ﾂ', 'ﾃ', 'ﾄ', 'ﾅ', 'ﾆ', 'ﾇ', 'ﾈ', 'ﾉ', 'ﾊ', 'ﾋ', 'ﾌ', 'ﾍ', 'ﾎ', 'ﾏ', 'ﾐ', 'ﾑ', 'ﾒ', 'ﾓ', 'ﾔ', 'ﾕ', 'ﾖ', 'ﾗ', 'ﾘ', 'ﾙ', 'ﾚ', 'ﾛ', 'ﾜ', 'ｦ', 'ﾝ', 'ｧ', 'ｨ', 'ｩ', 'ｪ', 'ｫ', 'ｬ', 'ｭ', 'ｮ', 'ｯ', '､', '｡', '｢', '｣', '-'];
  private hKanaRegex = new RegExp('(' + this.H_KANA.join('|') + ')', 'g');
  private Z_KANA = ['ヴ', 'ガ', 'ギ', 'グ', 'ゲ', 'ゴ', 'ザ', 'ジ', 'ズ', 'ゼ', 'ゾ', 'ダ', 'ヂ', 'ヅ', 'デ', 'ド', 'バ', 'ビ', 'ブ', 'ベ', 'ボ', 'パ', 'ピ', 'プ', 'ペ', 'ポ', 'ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'キ', 'ク', 'ケ', 'コ', 'サ', 'シ', 'ス', 'セ', 'ソ', 'タ', 'チ', 'ツ', 'テ', 'ト', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'ヒ', 'フ', 'ヘ', 'ホ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'ユ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ワ', 'ヲ', 'ン', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ャ', 'ュ', 'ョ', 'ッ', '、', '。', '「', '」', '－'];
  private zKanaRegex = new RegExp('(' + this.Z_KANA.join('|') + ')', 'g');
  private MULTIBYTE_EXP = /[^\x01-\x7E]+/;
  private SINGLE_BYTE_EXP = /[\x01-\x7E]+/;
  private targetString = '';
  constructor(str: string) {
    this.targetString = str;
  }
  public convert(category: MojiCategory, direction: MojiDirection): Moji {
    if (category === 'alphanumeric') {
      const addition = direction === 'ZtoH' ? -65248 : 65248;
      const regex = direction === 'ZtoH' ? /[！-～]/g : /[A-Za-z0-9]/g;
      this.targetString = this.targetString.replace(regex, (char: string) =>
        String.fromCharCode(char.charCodeAt(0) + addition)
      );
      return this;
    }
    const targetTable = direction === 'ZtoH' ? this.Z_KANA : this.H_KANA;
    const conversionTable = direction === 'ZtoH' ? this.H_KANA : this.Z_KANA;
    const regex = direction === 'ZtoH' ? this.zKanaRegex : this.hKanaRegex;
    this.targetString = this.targetString.replace(regex, (char: string) => {
      const index = targetTable.indexOf(char);
      return conversionTable[index];
    });
    return this;
  }
  public toString(): string {
    return this.targetString;
  }
  public doesContain(sd: MojiByte) {
    const regex = sd === 'ascii' ? this.SINGLE_BYTE_EXP : this.MULTIBYTE_EXP;
    const isMatch = this.targetString.match(regex);
    if (isMatch) return true;
    return false;
  }
}
