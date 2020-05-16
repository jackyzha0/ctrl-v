package cache

import (
	"errors"
	"github.com/jackyzha0/ctrl-v/security"
	"sync"

	"github.com/jackyzha0/ctrl-v/db"
)

type Cache struct {
	m    map[string]db.Paste
	lock sync.RWMutex
}

var C *Cache

var PasteNotFound = errors.New("could not find a paste with that hash")
var UserUnauthorized = errors.New("paste is password protected")

func init() {
	C = &Cache{
		m: map[string]db.Paste{},
	}
}

func (c *Cache) Get(hash, userPassword string) (db.Paste, error) {
	c.lock.RLock()

	// check if hash in cache
	p, ok := c.m[hash]
	c.lock.RUnlock()

	// if it doesnt, lookup from db
	if !ok {
		var err error

		p, err = db.Lookup(hash)
		if err != nil {
			return db.Paste{}, PasteNotFound
		}

		c.add(p)
	}

	// if there is a password, check the provided one against it
	if p.Password != "" {
		// if passwords do not match, the user is unauthorized
		if !security.PasswordsEqual(p.Password, userPassword) {
			return db.Paste{}, UserUnauthorized
		}

		// if password matches, decrypt content
		key, _, err := security.DeriveKey(userPassword, p.Salt)
		if err != nil {
			return db.Paste{}, security.EncryptionError
		}

		decryptedContent, err := security.Decrypt(key, p.Content)
		if err != nil {
			return db.Paste{}, security.EncryptionError
		}

		p.Content = decryptedContent
	}

	return p, nil
}

func (c *Cache) add(p db.Paste) {
	c.lock.Lock()
	defer c.lock.Unlock()

	c.m[p.Hash] = p
}
