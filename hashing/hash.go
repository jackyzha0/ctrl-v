package hashing

import (
	"crypto/md5"
	"encoding/hex"
	"math/big"
	"time"
)

const UrlLength = 7

// GenerateURI creates a unique identifier for a paste based on ip and timestamp
func GenerateURI(ip string) string {
	timeStamp := time.Now().String()
	return hashString(ip + timeStamp)[:UrlLength]
}

// hashes using MD5 and then converts to base 62
func hashString(text string) string {
	hash := md5.Sum([]byte(text))
	hexStr := hex.EncodeToString(hash[:])

	bi := big.NewInt(0)
	bi.SetString(hexStr, 16)
	return bi.Text(62)
}