'use strict'

var fs = require('fs')

var bodyParser = require('body-parser')
var defaults = require('lodash.defaults')
var dot = require('dot')
var express = require('express')

var releaseStore = {}

var responseTemplate = dot.template(fs.readFileSync(__dirname + '/response.dot'))

var defaultReleaseValues = {
  tag_name: 'v1.0.0',
  target_commitish: 'master',
  name: 'v1.0.0',
  body: '',
  draft: false,
  prerelease: false
}

var app = module.exports = express()

app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.set('X-RateLimit-Limit', '5000')
  res.set('X-RateLimit-Remaining', '4999')
  next()
})

app.post('/repos/:owner/:repo/releases', function (req, res) {
  var owner = req.params.owner
  var repo = req.params.repo
  var key = owner + ':' + repo
  res.set('Location', 'https://api.github.com/repos/' + owner + '/' + repo + '/releases/1')
  defaults(req.body, defaultReleaseValues, {owner: owner, repo: repo})
  req.body.body = JSON.stringify(req.body.body)
  req.body.name = JSON.stringify(req.body.name)
  releaseStore[key] = req.body
  res.status(201).send(responseTemplate(req.body))
})

app.get('/repos/:owner/:repo/releases/:id', function (req, res) {
  var owner = req.params.owner
  var repo = req.params.repo
  var key = owner + ':' + repo
  if (!releaseStore[owner + ':' + repo]) return res.status(404).end()
  res.status(200).send(responseTemplate(releaseStore[owner + ':' + repo]))
})
