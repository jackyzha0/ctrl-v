package security

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"golang.org/x/crypto/scrypt"
)

func Encrypt(key, data []byte) ([]byte, error) {
	blockCipher, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(blockCipher)
	if err != nil {
		return nil, err
	}

	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return nil, err
	}

	cipherText := gcm.Seal(nonce, nonce, data, nil)

	return cipherText, nil
}

func Decrypt(key, data []byte) ([]byte, error) {
	blockCipher, err := aes.NewCipher(key)
	if err != nil {
		return nil, err
	}

	gcm, err := cipher.NewGCM(blockCipher)
	if err != nil {
		return nil, err
	}

	nonce, cipherText := data[:gcm.NonceSize()], data[gcm.NonceSize():]
	plaintext, err := gcm.Open(nil, nonce, cipherText, nil)
	if err != nil {
		return nil, err
	}

	return plaintext, nil
}

func DeriveKey(password, salt []byte) ([]byte, []byte, error) {
	if salt == nil {
		salt = make([]byte, 16)
		if _, err := rand.Read(salt); err != nil {
			return nil, nil, err
		}
	}

	key, err := scrypt.Key(password, salt, 16384, 8, 1, 16)
	if err != nil {
		return nil, nil, err
	}

	return key, salt, nil
}
