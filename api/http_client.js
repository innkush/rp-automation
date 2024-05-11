import axios from 'axios';
const logger = require('logger');

class APIClient {
  constructor(baseUrl, getAuthToken) {
    this.baseUrl = baseUrl;
    this.auth = getAuthToken;
  }

  async sendRequest(method, url, data = {}, headers = {}) {
    try {
      if (this.getAuthToken) {
        const token = await this.getAuthToken();
        headers = {
          ...headers,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };
        const response = await axios.request({
          method,
          url: this.baseUrl + url,
          data,
          headers,
        });
        logger.info(
          `[${method.toUpperCase()}] ${url} - Status: ${response.status}`
        );
        return response;
      }
    } catch (error) {
      logger.error(
        `[${method.toUpperCase()}] ${url} - Error: ${error.message}`
      );
      throw error;
    }
  }
}
export default APIClient;
