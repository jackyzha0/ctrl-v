package security

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"errors"
	"golang.org/x/crypto/scrypt"
)

var EncryptionError = errors.New("could not encrypt the given content")

func Encrypt(key, data string) (string, error) {
	// initialize aes block cipher with given key
	blockCipher, err := aes.NewCipher([]byte(key))
	if err != nil {
		return "", err
	}

	// wrap block cipher with Galois Counter Mode and standard nonce length
	gcm, err := cipher.NewGCM(blockCipher)
	if err != nil {
		return "", err
	}

	// generate nonce (number once used) unique to the given key
	nonce := make([]byte, gcm.NonceSize())
	if _, err = rand.Read(nonce); err != nil {
		return "", err
	}

	// seal nonce with data to use during decryption
	cipherText := gcm.Seal(nonce, nonce, []byte(data), nil)

	return string(cipherText), nil
}

func Decrypt(key, data string) (string, error) {
	// similar to encrypt, create cipher and wrap with GCM
	blockCipher, err := aes.NewCipher([]byte(key))
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(blockCipher)
	if err != nil {
		return "", err
	}

	// extract the nonce from the data
	nonce, cipherText := data[:gcm.NonceSize()], data[gcm.NonceSize():]

	// use nonce to decrypt the data
	plaintext, err := gcm.Open(nil, []byte(nonce), []byte(cipherText), nil)
	if err != nil {
		return "", err
	}

	return string(plaintext), nil
}

const keyBytes = 16
const iterations = 16384
const relativeMemoryCost = 8
const relativeCPUCost = 1

func DeriveKey(password string, salt []byte) (string, []byte, error) {
	if salt == nil {
		salt = make([]byte, keyBytes)
		if _, err := rand.Read(salt); err != nil {
			return "", nil, err
		}
	}

	key, err := scrypt.Key([]byte(password), salt, iterations, relativeMemoryCost, relativeCPUCost, keyBytes)
	if err != nil {
		return "", nil, err
	}

	return string(key), salt, nil
}
