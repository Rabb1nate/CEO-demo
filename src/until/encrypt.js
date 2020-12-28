import CryptoJS from "crypto-js";
const key = CryptoJS.enc.Utf8.parse("GeEk_1s_AwEs0Me!")
const iv = CryptoJS.enc.Utf8.parse('ImH@ckErabcdefgh')
const Encrypto = str => {
    let srcs = CryptoJS.enc.Utf8.parse(str);
    let encrypted = CryptoJS.AES.encrypt(
        srcs,
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );
    return encrypted.ciphertext.toString().toUpperCase();
}
export default Encrypto