import * as forge from 'node-forge';

const ENCRYPTION_ALGO = "AES-CBC";
const ENCRYPTION_PASSWORD = "helloworld";
const SALT = "salt";
const KEY_SIZE = 32;
const ITERATIONS = 1000;
const DELIMITER = "-";
const HASH_ALGO = "sha256";

class CryptUtils {
  static convertPasswordToHash(password) {
    if (typeof password === "string" && password.length > 0) {
      const hash = forge.md.sha256.create();
      hash.update(password);
      return hash.digest().toHex();
    } else {
      throw new TypeError("Provided value is not a valid string");
    }
  }

  static encryptString(str) {
    if (typeof str === "string" && str.length > 0) {
      const iv = forge.random.getBytesSync(16);

      const key = forge.pkcs5.pbkdf2(
        ENCRYPTION_PASSWORD,
        SALT,
        ITERATIONS,
        KEY_SIZE,
        HASH_ALGO
      );

      const cipher = forge.cipher.createCipher(ENCRYPTION_ALGO, key);
      cipher.start({ iv });
      cipher.update(forge.util.createBuffer(str, "utf8"));
      cipher.finish();
      return `${forge.util.bytesToHex(iv)}-${cipher.output.toHex()}`;
    } else {
      throw new TypeError("Provided value is not a valid string");
    }
  }

  static decryptString(encryptedString) {
    if (typeof encryptedString === "string" && encryptedString.length > 0) {
      encryptedString = encryptedString.split(DELIMITER);
      const iv = forge.util.createBuffer(
        forge.util.hexToBytes(encryptedString[0]),
        "raw"
      );
      const encrypted = forge.util.createBuffer(
        forge.util.hexToBytes(encryptedString[1]),
        "raw"
      );
      const key = forge.pkcs5.pbkdf2(
        ENCRYPTION_PASSWORD,
        SALT,
        ITERATIONS,
        KEY_SIZE,
        HASH_ALGO
      );
      const decipher = forge.cipher.createDecipher(ENCRYPTION_ALGO, key);
      decipher.start({ iv });
      decipher.update(encrypted);
      decipher.finish();
      return decipher.output.toString();
    } else {
      throw new TypeError("Provided value is not a valid string");
    }
  }
}

export default CryptUtils;
