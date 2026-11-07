import sha256 from "crypto-js/sha256";
import { CryptoUtil } from "../crypto";

export const SignatureUtil = {
  generate: (path: string, method: string, timestamp: string) => {
    const hashDigest = sha256(
      `${path}:${method.toUpperCase()}:${timestamp}`,
    ).toString();
    return CryptoUtil.HmacSHA256(hashDigest);
  },
};
