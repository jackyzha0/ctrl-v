package cache

import (
	"errors"
	"github.com/jackyzha0/ctrl-v/hashing"
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
	v, ok := c.m[hash]
	c.lock.RUnlock()

	if ok {
		return v, nil
	}

	// if it doesnt, lookup from db
	p, err := db.Lookup(hash)
	if err != nil {
		return p, PasteNotFound
	}

	// if there is a password, check the provided one against it
	println(p.Password)
	if p.Password != "" {
		// if passwords do not match, the user is unauthorized
		if !hashing.PasswordsEqual(p.Password, userPassword) {
			return db.Paste{}, UserUnauthorized
		}
	}

	c.add(p)
	return p, err
}

func (c *Cache) add(p db.Paste) {
	c.lock.Lock()
	defer c.lock.Unlock()

	c.m[p.Hash] = p
}
