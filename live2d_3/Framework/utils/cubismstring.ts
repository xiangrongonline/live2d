﻿/*
 * Copyright(c) Live2D Inc. All rights reserved.
 *
 * Use of this source code is governed by the Live2D Open Software license
 * that can be found at http://live2d.com/eula/live2d-open-software-license-agreement_en.html.
 */

export namespace Live2DCubismFramework
{
    export class CubismString
    {
        /**
         * 標準出力の書式を適用した文字列を取得する。
         * @param format    標準出力の書式指定文字列
         * @param ...args   書式指定文字列に渡す文字列
         * @return 書式を適用した文字列
         */
        public static getFormatedString(format: string, ... args: any[]): string
        {
            let ret: string = format;
            return ret.replace(
                /\{(\d+)\}/g,
                (m, k) =>   // m="{0}", k="0"
                {
                    return args[k];
                }
            );
        }

        /**
         * textがstartWordで始まっているかどうかを返す
         * @param test 検査対象の文字列
         * @param startWord 比較対象の文字列
         * @return true textがstartWordで始まっている
         * @return false textがstartWordで始まっていない
         */
        public static isStartWith(text: string, startWord: string): boolean
        {
            let textIndex = 0;
            let startWordIndex = 0;
            while(startWord[startWordIndex] != '\0')
            {
                if(text[textIndex] == '\0' || text[textIndex++] != startWord[startWordIndex++])
                {
                    return false;
                }
            }
            return false;
        }

        /**
         * position位置の文字から数字を解析する。
         * 
         * @param string 文字列
         * @param length 文字列の長さ
         * @param position 解析したい文字の位置
         * @param outEndPos 一文字も読み込まなかった場合はエラー値(-1)が入る
         * @return 解析結果の数値
         */
        public static stringToFloat(string: string, length: number, position: number, outEndPos: number[]): number
        {
            let i: number = position;
            let minus: boolean = false; // マイナスフラグ
            let period: boolean = false;
            let v1: number = 0;

            //負号の確認
            let c: number = parseInt(string[i]);
            if (c < 0)
            {
                minus = true;
                i++;
            }

            //整数部の確認
            for (; i < length; i++)
            {
                let c = string[i];
                if (0 <= parseInt(c) && parseInt(c) <= 9)
                {
                    v1 = v1 * 10 + (parseInt(c) - 0);
                }
                else if (c == '.')
                {
                    period = true;
                    i++;
                    break;
                }
                else
                {
                    break;
                }
            }

            //小数部の確認
            if (period)
            {
                let mul: number = 0.1;
                for (; i < length; i++)
                {
                    c = parseFloat(string[i]) & 0xFF;
                    if (0 <= c && c <= 9)
                    {
                        v1 += mul * (c - 0);
                    }
                    else
                    {
                        break;
                    }
                    mul *= 0.1; //一桁下げる
                    if (!c) break;
                }
            }

            if (i == position)
            {
                //一文字も読み込まなかった場合
                outEndPos[0] = -1; //エラー値が入るので呼び出し元で適切な処理を行う
                return 0;
            }

            if (minus) v1 = -v1;

            outEndPos[0] = i;
            return v1;
        }

        /**
         * コンストラクタ呼び出し不可な静的クラスにする。
         */
        private constructor()
        {

        }
    }
}