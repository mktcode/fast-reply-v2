import sc2 from 'sc2-sdk'

export const sc2api = sc2.Initialize({
  app: 'mkt.test',
  callbackURL: 'http://localhost:3000/auth',
  scope: ['vote', 'comment', 'custom_json']
})