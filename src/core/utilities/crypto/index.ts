import { enc } from "crypto-js";

import AES from "crypto-js/aes";
import config from "@/config/environment";
import Base64 from "crypto-js/enc-base64";
import hmacSHA256 from "crypto-js/hmac-sha256";

const key = config.signature.key ?? "";
const iv = enc.Utf8.parse(config.signature.iv ?? "");

export const CryptoUtil = {
  HmacSHA256: (value: string) => Base64.stringify(hmacSHA256(value, key)),
  AESencrypt: (value: string) => AES.encrypt(value, key, { iv }).toString(),
  AESdecrypt: (value: string) => {
    try {
      const decrypted = AES.decrypt(decodeURIComponent(value), key, { iv });

      return decrypted.toString(enc.Utf8) || null;
    } catch (error) {
      console.log("Decrypted failed :", error);
      return null;
    }
  },
};
