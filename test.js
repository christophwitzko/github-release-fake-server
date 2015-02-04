'use strict'

var GitHubApi = require('github')

var github = new GitHubApi({
  version: '3.0.0',
  port: 4343,
  protocol: 'http',
  host: '127.0.0.1',
  debug: true
})

var release = {
  owner: 'example',
  repo: 'test',
  tag_name: 'v1.0.0',
  target_commitish: 'master',
  draft: false,
  prerelease: false,
  body: '*test*'
}

github.authenticate({
  type: 'oauth',
  token: '**********'
})

github.releases.createRelease(release, function (err, res) {
  console.log('error1:', err)
  github.releases.getRelease({ owner: 'example', repo: 'test', id: 1}, function (err, res) {
    console.log('error2:', err)
    console.log(res)
  })
})