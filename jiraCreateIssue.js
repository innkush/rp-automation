const axios = require('axios');
require('dotenv').config();
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY
const JIRA_ISSUE_TYPE = process.env.JIRA_ISSUE_TYPE;
const JIRA_URL = process.env.JIRA_URL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_USER = process.env.JIRA_USER;

import { logger } from './logger';

async function createJiraIssue(testCase, error, status) {
    const issueData = {
        fields: {
            project: {
                key: JIRA_PROJECT_KEY
            },
            summary: `Test: ${testCase} with status ${status}`,
            description: `Error: ${error}`,
            issuetype: {
                name: JIRA_ISSUE_TYPE
            }
        }
    };

    try {
         await axios.post(
            `${JIRA_URL}/rest/api/3/issue`,
            issueData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${Buffer.from(`${JIRA_USER}:${JIRA_API_TOKEN}`).toString('base64')}`
                }
            }
        );
        logger.info(`Issue created for ${testCase}`);
    } catch (error) {
        logger.info(`Failed to create issue for ${testCase}:`, error.response.data);
    }
}
export async function createIssuesFromResults(failedTests) {
    for (const element of failedTests){
        const summary = 'Test Failed: ' + element.title; 
        const error = 'Detailed description of failure: ' + element.error;
        const status = 'Status: ' + element.status
        createJiraIssue(summary, error, status);
    }
}
