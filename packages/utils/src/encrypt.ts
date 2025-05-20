import { devLog } from '@monorepo-starter/utils/console';
import crypto, { type RSAKeyPairOptions } from 'crypto';

/**
 * 단방향 해시 (PBKDF2)
 * @example
 * const hash = createOneWayHash('텍스트', 'salt');
 */
export function createOneWayHash(text: string, salt: string, length: number = 32) {
  return crypto.pbkdf2Sync(text, salt, 100, length, 'sha512').toString('hex');
}

/**
 * 양방향 암호화 (AES-256)
 * @example
 * encryptText('텍스트', '__key');
 */
export function createTwoWayEncryption(text: string, salt: string) {
  const iv = crypto.randomBytes(16);
  const key = salt.length > 32 ? salt.slice(0, 32) : salt.padEnd(32, '_');
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  const encryptValue = cipher.update(text);

  return `${iv.toString('hex')}:${Buffer.concat([encryptValue, cipher.final()]).toString('hex')}`;
}

/**
 * 양방향 복호화 (AES-256)
 * @example
 * decryptText('암호화 텍스트', '__key');
 */
export function createTwoWayDecryption(text: string, salt: string) {
  const texts = text.split(':');
  if (texts.length !== 2) {
    return null;
  }

  const key = salt.length > 32 ? salt.slice(0, 32) : salt.padEnd(32, '_');
  const iv = Buffer.from(texts.shift()!, 'hex');
  const encryptedText = Buffer.from(texts.join(':'), 'hex');
  try {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    const decrypted = decipher.update(encryptedText);
    return Buffer.concat([decrypted, decipher.final()]).toString();
  } catch (error) {
    devLog('error', error);
    return null;
  }
}

/**
 * 비대칭 키 암호화
 * @example
 * // Example 1
 * const { publicKey, privateKey } = await generateRsaKeyPair();
 * const enc = encryptAsymmetricPublicKey('암호화 내용', publicKey);
 * const dec = decryptAsymmetricPrivateKey(enc, privateKey);
 *
 * // Example 2
 * const { publicKey, privateKey } = await generateRsaKeyPair();
 * const enc = encryptAsymmetricPrivateKey('암호화 내용', privateKey);
 * const dec = decryptAsymmetricPublicKey(enc, publicKey);
 */
export async function generateRsaKeyPair(): Promise<{
  [name in `${'public' | 'private'}Key`]: string;
}> {
  const passphrase = '';

  /** @type {crypto.RSAKeyPairOptions<'pem', 'pem'>} */
  const options: RSAKeyPairOptions<'pem', 'pem'> = {
    modulusLength: 1024, // Key 길이
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc', // 암호화 알고리즘
      passphrase,
    },
  };

  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', options, (err, publicKey, privateKey) => {
      if (err) return reject(err);
      resolve({ publicKey, privateKey });
    });
  });
}

/**
 * Public Key로 암호화
 * 복호화 시, decryptAsymmetricPrivateKey 로 복호화 해야함
 */
export function encryptWithRsaPublicKey(text: string, publicKey: string) {
  return crypto.publicEncrypt(publicKey, Buffer.from(text)).toString('base64');
}

/**
 * Private key 복호화
 * encryptAsymmetricPublicKey 의 결과값만 복호화 가능
 */
export function decryptWithRsaPrivateKey(publicData: string, privateKey: string) {
  const decPrivateKey = crypto.createPrivateKey({
    key: privateKey,
    format: 'pem',
    passphrase: '',
  });
  return crypto.privateDecrypt(decPrivateKey, Buffer.from(publicData, 'base64')).toString('utf8');
}

/**
 * Private Key로 암호화
 * 복호화 시, decryptAsymmetricPublicKey 로 복호화 해야함
 */
export function encryptWithRsaPrivateKey(text: string, privateKey: string) {
  const encPrivateKey = crypto.createPrivateKey({
    key: privateKey,
    format: 'pem',
    passphrase: '',
  });
  return crypto.privateEncrypt(encPrivateKey, Buffer.from(text)).toString('base64');
}

/**
 * Private key 복호화
 * encryptAsymmetricPrivateKey 의 결과값만 복호화 가능
 */
export function decryptWithRsaPublicKey(privateData: string, publicKey: string) {
  return crypto.publicDecrypt(publicKey, Buffer.from(privateData, 'base64')).toString('utf-8');
}
