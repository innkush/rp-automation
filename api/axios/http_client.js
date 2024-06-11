import axios from 'axios';
import { logger } from '../../logger';

class APIClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async sendRequest(method, endpoint, data={}, headers = {}) {
    try {
      const url = this.baseUrl + endpoint;
      logger.info(url);
      const response = await axios.request({
        method,
        url,
        data,
        headers: {
          ...headers,
          'Authorization': headers.Authorization,
          'Content-Type': 'application/json',
          'accept': 'application/json, text/plain, */*',
        }
      });

      logger.info(
        `[${method.toUpperCase()}] ${this.baseUrl+endpoint} - Status: ${response.status}`
      );
      return { response, data: response.data };
    } catch (error) {
      logger.info(`[${method.toUpperCase()}] ${endpoint} - Error: ${error.message}`);
      return { response: error.response, data: error.response.data };
    }
  }
}
export default APIClient;
