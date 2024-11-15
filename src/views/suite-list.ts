import * as core from '@actions/core'
import { CtrfTest } from '../../types/ctrf'
import { getEmojiForStatus } from './common'
import { stripAnsi } from '../common'

export function generateSuiteListView(tests: CtrfTest[], useSuite: boolean): void {
  try {
    let markdown = `\n`

    const workspacePath = process.env.GITHUB_WORKSPACE || ''

    const testResultsByGroup: Record<string, { tests: CtrfTest[], statusEmoji: string }> = {}

    tests.forEach((test) => {
      const groupKey = useSuite
        ? test.suite || 'No suite provided'
        : (test.filePath || 'No file path provided').replace(workspacePath, '').replace(/^\//, '')

      if (!testResultsByGroup[groupKey]) {
        testResultsByGroup[groupKey] = { tests: [], statusEmoji: '✅' }
      }

      testResultsByGroup[groupKey].tests.push(test)

      if (test.status === 'failed') {
        testResultsByGroup[groupKey].statusEmoji = '❌'
      }
    })

    function escapeMarkdown(text: string): string {
      return text.replace(/([\\*_{}[\]()#+\-.!])/g, '\\$1')
    }

    Object.entries(testResultsByGroup).forEach(([groupKey, groupData]) => {
      markdown += `## ${groupData.statusEmoji} ${escapeMarkdown(groupKey)}\n\n`

      groupData.tests.forEach((test) => {
        const statusEmoji = getEmojiForStatus(test.status)

        const testName = escapeMarkdown(test.name)

        markdown += `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**${statusEmoji} ${testName}**\n`

        if (test.status === 'failed' && test.message) {
          let message = stripAnsi(test.message || "No failure message")
          message = message.replace(/\n{2,}/g, '\n').trim()

          const escapedMessage = escapeMarkdown(message)

          const indentedMessage = escapedMessage
            .split('\n')
            .filter(line => line.trim() !== '')
            .map(line => `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${line}`)
            .join('\n')

          markdown += `${indentedMessage}\n`
        }
      })

      markdown += `\n`
    })

    markdown += `[Github Test Reporter](https://github.com/ctrf-io/github-test-reporter)`

    core.summary.addRaw(markdown)

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Failed to display test suite list: ${error.message}`)
    } else {
      core.setFailed('An unknown error occurred')
    }
  }
}
