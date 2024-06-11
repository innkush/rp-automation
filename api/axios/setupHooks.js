/* eslint-disable no-undef */
const matchers = require('jest-extended');
expect.extend(matchers);
const { default: Slack } = require('../slack_notification');


beforeAll(async () => {
  await Slack.sendSlackNotificationWhenTestStarted();
});

afterAll(async () => {
  await Slack.sendSlackNotificationWhenTestEnded();
});
