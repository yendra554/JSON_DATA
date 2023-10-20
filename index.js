
function encrypt(text, key, type) {
    const iv = "0123456789abcABC";
    const size = 16;
    const pad = size - (text.length % size);
    const padtext = text + String.fromCharCode(pad).repeat(pad);
    const crypt = CryptoJS.AES.encrypt(padtext, key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      padding: CryptoJS.pad.ZeroPadding
    });
    return crypt.toString(CryptoJS.enc.Base64);
  }
  


function decrypt(crypt, key, type) {
    const iv = "0123456789abcABC";
    const cryptBytes = CryptoJS.enc.Base64.parse(crypt);
    const padtext = CryptoJS.AES.decrypt(
      { ciphertext: cryptBytes },
      key,
      {
        iv: CryptoJS.enc.Utf8.parse(iv),
        padding: CryptoJS.pad.ZeroPadding
      }
    ).toString(CryptoJS.enc.Utf8);
    const pad = padtext.charCodeAt(padtext.length - 1);
    if (pad > padtext.length) {
      return false;
    }
    if (
      padtext.substring(padtext.length - pad).split("").every((char) => char === padtext[padtext.length - 1])
    ) {
      return "Error";
    }
    const text = padtext.substring(0, padtext.length - pad);
    return text;
  }