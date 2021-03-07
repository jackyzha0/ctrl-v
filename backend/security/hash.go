package security

import (
	"crypto/md5"
	"encoding/hex"
	"golang.org/x/crypto/bcrypt"
	"math/big"
	"time"
)

const UrlLength = 7

// GenerateURI creates a unique identifier for a paste based on ip and timestamp
func GenerateURI(content string) string {
	timeStamp := time.Now().String()
	return hashString(content + timeStamp)[:UrlLength]
}

// hashes using MD5 and then converts to base 62
func hashString(text string) string {
	hash := md5.Sum([]byte(text))
	hexStr := hex.EncodeToString(hash[:])

	bi := big.NewInt(0)
	bi.SetString(hexStr, 16)
	return bi.Text(62)
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(hashedPassword), err
}

func PasswordsEqual(dbPassword, parsedPassword string) bool {
	dbPassBytes := []byte(dbPassword)
	parsedPassBytes := []byte(parsedPassword)
	compErr := bcrypt.CompareHashAndPassword(dbPassBytes, parsedPassBytes)

	// if comparison error, the given password is not valid
	return compErr == nil
}