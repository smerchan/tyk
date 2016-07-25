// +build !coprocess

package main

import (
	"github.com/Sirupsen/logrus"
	"net/http"
)

var EnableCoProcess bool = false

func CoProcessInit() {
	log.WithFields(logrus.Fields{
		"prefix": "coprocess",
	}).Info("Disabled feature")
}

func CreateCoProcessMiddleware(MiddlewareName string, IsPre, UseSession bool, tykMwSuper *TykMiddleware) func(http.Handler) http.Handler {
	return nil
}