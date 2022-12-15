import { Moji } from './multibyte';

describe('utils/multibyte', () => {
  test('全角英数字から半角英数字', () => {
    const test1 = new Moji('１０９０１２３').convert('alphanumeric', 'ZtoH').toString();
    expect(test1).toEqual('1090123');
    const test2 = new Moji('ＡＺmo204４3').convert('alphanumeric', 'ZtoH').toString();
    expect(test2).toEqual('AZmo20443');
  });
  test('半角英数字から全角英数字', () => {
    const test1 = new Moji('1090123').convert('alphanumeric', 'HtoZ').toString();
    expect(test1).toEqual('１０９０１２３');
    const test2 = new Moji('Azmo20443').convert('alphanumeric', 'HtoZ').toString();
    expect(test2).toEqual('Ａｚｍｏ２０４４３');
  });
  test('半角カナから全角カナ', () => {
    const test1 = new Moji('｢ﾓﾄｸﾛｽﾊﾞｲｸ｣').convert('kana', 'HtoZ').toString();
    expect(test1).toEqual('「モトクロスバイク」');
    const test2 = new Moji('ﾃﾞｨｽﾞﾆ-ランﾄﾞ').convert('kana', 'HtoZ').toString();
    expect(test2).toEqual('ディズニ－ランド');
  });
  test('全角カナから半角カナ', () => {
    const test1 = new Moji('「モトクロスバイク」').convert('kana', 'ZtoH').toString();
    expect(test1).toEqual('｢ﾓﾄｸﾛｽﾊﾞｲｸ｣');
    const test2 = new Moji('ディズニ－ﾗﾝド').convert('kana', 'ZtoH').toString();
    expect(test2).toEqual('ﾃﾞｨｽﾞﾆ-ﾗﾝﾄﾞ');
  });
  test('全角文字検知', () => {
    const test1 = new Moji('東京都1234').doesContain('non-ascii');
    expect(test1).toBe(true);
    const test2 = new Moji('google.com').doesContain('non-ascii');
    expect(test2).toBe(false);
  });
  test('半角文字検知', () => {
    const test1 = new Moji('東京都文京区').doesContain('ascii');
    expect(test1).toBe(false);
    const test2 = new Moji('東京都港区芝公園４丁目２-８').doesContain('ascii');
    expect(test2).toBe(true);
  });
});
