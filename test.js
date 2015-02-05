'use strict'

var test = require('tape')

var GitHubApi = require('github')

var github = new GitHubApi({
  version: '3.0.0',
  port: 4343,
  protocol: 'http',
  host: '127.0.0.1'
})

github.authenticate({
  type: 'oauth',
  token: '***'
})

var createRelease = {
  owner: 'example',
  repo: 'test',
  tag_name: 'v2.0.0',
  target_commitish: 'master',
  draft: false,
  prerelease: false,
  body: '*test*\n\n### Feature:'
}

var getRelease = {
  owner: 'example',
  repo: 'test',
  id: 1
}

test('create new release', function (t) {
  t.plan(4)
  github.releases.createRelease(createRelease, function (err, res) {
    t.error(err, 'no error')
    t.equal(res.tag_name, createRelease.tag_name, 'tag name')
    t.equal(res.body, createRelease.body, 'body')
    t.equal(res.author.login, createRelease.owner, 'user')
  })
})

test('get release', function (t) {
  t.plan(4)
  github.releases.getRelease(getRelease, function (err, res) {
    t.error(err, 'no error')
    t.equal(res.tag_name, createRelease.tag_name, 'tag name')
    t.equal(res.body, createRelease.body, 'body')
    t.equal(res.author.login, createRelease.owner, 'user')
  })
})
