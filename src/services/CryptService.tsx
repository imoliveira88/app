import CryptoJS from "crypto-js";

export default class CryptService {
    key: string = 'pTyXp0fmXPy3emthiprr3u7N85Bw+oeD+WVQKcyr5SE=';

    /**
     * Decrypt data
     * @param data
     * @author Michael Douglas 
     */
    decrypt(data: any) {
        let encryptStr = CryptoJS.enc.Base64.parse(data);
        let encryptData = encryptStr.toString(CryptoJS.enc.Utf8);
        let jsonData = JSON.parse(encryptData);
        let iv = CryptoJS.enc.Base64.parse(jsonData.iv);
        var decrypted = CryptoJS.AES.decrypt(jsonData.value, CryptoJS.enc.Utf8.parse(this.key), {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return CryptoJS.enc.Utf8.stringify(decrypted);
    }


    /**
     * Encrypt data
     * @param data 
     * @author Michael Douglas
     */
    encrypt(data: any) {
        let iv = CryptoJS.lib.WordArray.random(16);
        let key = CryptoJS.enc.Base64.parse(this.key);

        let options = {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        };

        let encrypted = CryptoJS.AES.encrypt(this.stringify(data), key, options);
        let base64iv = CryptoJS.enc.Base64.stringify(iv);
        let stringEncrypt = encrypted.toString();

        let result = {
            iv: base64iv,
            value: stringEncrypt,
            mac: CryptoJS.HmacSHA256(base64iv + stringEncrypt, key).toString()
        }

        let parseData = CryptoJS.enc.Utf8.parse(this.stringify(result));

        return CryptoJS.enc.Base64.stringify(parseData);
    }


    stringify(obj: any) {
        let seen: any = [];
        return JSON.stringify(
            obj,
            function (key, val) {
                if (val != null && typeof val == "object") {
                    if (seen.indexOf(val) >= 0)
                        return
                    seen.push(val)
                }
                return val
            }
        );
    }


    serialize(mixedValue: any) {
        var val, key, okey
        var ktype = ''
        var vals = ''
        var count = 0

        var _utf8Size = function (str: any) {
            return ~-encodeURI(str).split(/%..|./).length
        }

        var _getType = function (inp: any) {
            var match
            var key
            var cons
            var types
            var type = typeof inp
            let stringType = '';

            if (type === 'object' && !inp) {
                return 'null'
            }

            if (type === 'object') {
                if (!inp.constructor) {
                    return 'object'
                }
                cons = inp.constructor.toString()
                match = cons.match(/(\w+)\(/)
                if (match) {
                    cons = match[1].toLowerCase()
                }
                types = ['boolean', 'number', 'string', 'array']
                for (key in types) {
                    if (cons === types[key]) {
                        stringType = types[key]
                        break
                    }
                }
            }
            return stringType;
        }

        var type = _getType(mixedValue)

        switch (type) {
            case 'function':
                val = ''
                break
            case 'boolean':
                val = 'b:' + (mixedValue ? '1' : '0')
                break
            case 'number':
                val = (Math.round(mixedValue) === mixedValue ? 'i' : 'd') + ':' + mixedValue
                break
            case 'string':
                val = 's:' + _utf8Size(mixedValue) + ':"' + mixedValue + '"'
                break
            case 'array':
            case 'object':
                val = 'a'
                /*
                if (type === 'object') {
                  var objname = mixedValue.constructor.toString().match(/(\w+)\(\)/);
                  if (objname === undefined) {
                    return;
                  }
                  objname[1] = serialize(objname[1]);
                  val = 'O' + objname[1].substring(1, objname[1].length - 1);
                }
                */

                for (key in mixedValue) {
                    if (mixedValue.hasOwnProperty(key)) {
                        ktype = _getType(mixedValue[key])
                        if (ktype === 'function') {
                            continue
                        }

                        okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key)
                        vals += this.serialize(okey) + this.serialize(mixedValue[key])
                        count++
                    }
                }
                val += ':' + count + ':{' + vals + '}'
                break
            case 'undefined':
            default:
                // Fall-through
                // if the JS object has a property which contains a null value,
                // the string cannot be unserialized by PHP
                val = 'N'
                break
        }
        if (type !== 'object' && type !== 'array') {
            val += ';'
        }

        return val
    }



}