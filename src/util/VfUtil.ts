import { FaceAttributes } from "../types/response";

/**
 * VisualforceページのHTLMを操作するためのClass
 */
export default class VfUtil {

    /**
     * APIの取得結果を年齢・性別・メガネフィールドにセット
     * @param gender 性別
     * @param age 年齢
     * @param glass メガネ
     */
    public static setFieldValues(val: FaceAttributes) {
        VfUtil.setGenderFieldValues(val.gender);
        VfUtil.setAgeFieldValues(val.age.toString());
        VfUtil.setGlassFieldValues(val.glasses !== "NoGlasses");
    }

    /**
     * 画面の年齢・性別・メガネフィールドの値をクリア
     */
    public static clearFieldValues() {
        VfUtil.setGenderFieldValues("");
        VfUtil.setAgeFieldValues("");
        VfUtil.setGlassFieldValues(false);
    }

    /**
     * ImageFieldとして指定されたフィールドからURLを取得
     */
    public static getImageUrlStrings(): Array<string> {
        // richText(InputField)
        const richTextInput = document.querySelectorAll("[title*=" + FaceApiParams.ImageField + "]")[0] as HTMLIFrameElement;
        if (richTextInput) {
            return VfUtil.convertToStringArray(richTextInput.contentWindow.document.getElementsByTagName("img"));
        }

        // richText(OutputField)
        const richTextOutput = document.querySelectorAll("div[id*=" + FaceApiParams.ImageField + "]")[0] as HTMLDivElement;
        if (richTextOutput) {
            return VfUtil.convertToStringArray(richTextOutput.getElementsByTagName("img"));
        }

        // text(input)
        const normalTextInput = document.querySelectorAll("input[id$=" + FaceApiParams.ImageField + "]")[0] as HTMLInputElement;
        if (normalTextInput) {
            return [normalTextInput.value];
        }

        // url(output)
        const outputUrl = document.querySelectorAll("[id$=" + FaceApiParams.ImageField + "]>a")[0] as HTMLAnchorElement;
        if (outputUrl) {
            return [outputUrl.href];
        }

        // text(output)
        const normalTextOutput = document.querySelectorAll("span[id$=" + FaceApiParams.ImageField + "]")[0] as HTMLSpanElement;
        if (normalTextOutput) {
            return [normalTextOutput.innerText];
        }

        return null;
    }

    /**
     * NodeListOf<HTMLImageElement>のsrcをArray<string>で返す
     * @param elms 変換元
     */
    private static convertToStringArray(elms: NodeListOf<HTMLImageElement>): Array<string> {
        let urls: Array<string> = [];
        for (let i = 0; i < elms.length; i++) {
            urls.push((elms[i] as HTMLImageElement).currentSrc);
        }

        return urls;
    }

    static genderField: HTMLInputElement;
    static ageField: HTMLInputElement;
    static glassField: HTMLInputElement;

    /**
     * APIで取得した性別を性別フィールドにセット
     * @param val 性別の取得結果
     */
    private static setGenderFieldValues(val: string) {
        if (!FaceApiParams.GenderField) return;
        if (!VfUtil.genderField) VfUtil.genderField = document.querySelectorAll("[id$=" + FaceApiParams.GenderField + "]")[0] as HTMLInputElement;
        VfUtil.genderField.value = val;
    }

    /**
     * APIで取得した年齢を年齢フィールドにセット
     * @param val 年齢の取得結果
     */
    private static setAgeFieldValues(val: string) {
        if (!FaceApiParams.AgeField) return;
        if (!VfUtil.ageField) VfUtil.ageField = document.querySelectorAll("[id$=" + FaceApiParams.AgeField + "]")[0] as HTMLInputElement;
        VfUtil.ageField.value = val;
    }

    /**
     * APIで取得したメガネをメガネフィールドにセット
     * @param val メガネの取得結果
     */
    private static setGlassFieldValues(val: boolean) {
        if (!FaceApiParams.GlassField) return;
        if (!VfUtil.glassField) VfUtil.glassField = document.querySelectorAll("[id$=" + FaceApiParams.GlassField + "]")[0] as HTMLInputElement;
        VfUtil.glassField.checked = val;
    }
}