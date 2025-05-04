import { z } from 'zod'

const rsaEncryptSchema = z.object({
  data: z.string().nonempty({ message: 'Data cannot be empty' }),
  publicKeyPem: z.string().nonempty({ message: 'Public key cannot be empty' }),
})

const rsaDecryptSchema = z.object({
  encryptedData: z.string().nonempty({ message: 'Encrypted data cannot be empty' }),
  privateKeyPem: z.string().nonempty({ message: 'Private key cannot be empty' }),
})

const pemToBinary = (pem: string): ArrayBuffer => {
  const b64 = pem.replace(/-----.*-----/g, '').replace(/\s/g, '')
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

export const importPublicKey = async (pem: string): Promise<CryptoKey> => {
  const binary = pemToBinary(pem)
  return crypto.subtle.importKey(
    'spki', // X.509 SPKI format
    binary,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt'],
  )
}

export const importPrivateKey = async (pem: string): Promise<CryptoKey> => {
  const binary = pemToBinary(pem)
  return crypto.subtle.importKey(
    'pkcs8', // PKCS#8 format
    binary,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt'],
  )
}

export const encryptWithPublicKey = async (
  input: z.infer<typeof rsaEncryptSchema>,
): Promise<string> => {
  const { data, publicKeyPem } = rsaEncryptSchema.parse(input)
  const publicKey = await importPublicKey(publicKeyPem)
  const encrypted = await crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    publicKey,
    new TextEncoder().encode(data),
  )
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)))
}

export const decryptWithPrivateKey = async (
  input: z.infer<typeof rsaDecryptSchema>,
): Promise<string> => {
  const { encryptedData, privateKeyPem } = rsaDecryptSchema.parse(input)
  const privateKey = await importPrivateKey(privateKeyPem)
  const buffer = Uint8Array.from(atob(encryptedData), (c) => c.charCodeAt(0))
  const decrypted = await crypto.subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, buffer)
  return new TextDecoder().decode(decrypted)
}

export const arrayBufferToBase64String = (arrayBuffer: ArrayBuffer): string => {
  let byteArray = new Uint8Array(arrayBuffer)
  let byteString = ''
  for (var i = 0; i < byteArray.byteLength; i++) {
    byteString += String.fromCharCode(byteArray[i])
  }
  return btoa(byteString)
}
