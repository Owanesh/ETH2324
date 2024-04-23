import crypto from 'crypto';

// Retrieve encryption key and IV from environment variables
const encryptionKey = process.env.ENCRYPTION_KEY || '';
const iv = process.env.INITIALIZATION_VECTOR || '';

// Encrypt data using AES encryption
export const encryptData = (data: string) => {
  if (!encryptionKey || !iv) {
    throw new Error('Encryption key or initialization vector is missing');
  }

  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
  let encryptedData = cipher.update(data, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return encryptedData;
};


// Decrypt data using AES decryption
export const decryptData = (encryptedData: string) => {
    if (!encryptionKey || !iv) {
        throw new Error('Encryption key or initialization vector is missing');
      }
      const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
      let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
      decryptedData += decipher.final('utf-8');
    
      // Parse the decrypted string into a JSON object
      return JSON.parse(decryptedData);
};