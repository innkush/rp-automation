import APIClient from './axios/http_client';

class Slack {
  static async sendSlackNotificationWhenTestStarted() {
    try {
        const apiClient = new APIClient('https://hooks.slack.com/services/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');
        const payload = {
            text: 'Tests execution has been started',
          };
          const headers = {
            'Content-Type': 'application/json',
          };
          await apiClient.sendRequest('POST', '', payload, headers);

    } catch (error) {
      throw new Error('Post request for sending slack message failed');
    }
  }

  static async sendSlackNotificationWhenTestEnded() {
    try {
        const apiClient = new APIClient('https://hooks.slack.com/services/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');
        const payload = {
            text: 'Tests execution has been stopped',
          };
          const headers = {
            'Content-Type': 'application/json',
          };
          await apiClient.sendRequest('POST', '', payload, headers);

    } catch (error) {
      throw new Error('Post request for sending slack message failed');
    }
  }
}

export default Slack;
