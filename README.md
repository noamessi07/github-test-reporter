# Github Actions Publish Test Results

> View Test Results Report on Github Actions

Display test results directly within your GitHub workflow summary without installing a custom action.

![Example view](images/summary.png)

⭐ **If you find this project useful, consider giving it a GitHub star** ⭐

It means a lot to us and helps us grow this open source library.

## Features

- View test results on Github Actions summary
- Several views available, `Test Summary`, `Test Details`, `Failed Tests`, `Flaky Tests`
- Run with a single command `npx github-actions-ctrf report.json`
- Detect flaky tests

## Usage

Before using the commands, ensure that your GitHub Actions runner has Node.js installed. If not, here's how you can set up Node.js in your workflow:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v2
  with:
    node-version: '20'
```

You'll need a CTRF report generated by your testing framework. [CTRF reporters](https://www.ctrf.io/docs/category/reporters) are available for most testing frameworks and easy to install.

### Generating Test Summary Table

For a test summary table, add the following to your workflow YAML:

``` yaml
- name: Publish CTRF Test Summary Results
  run: npx github-actions-ctrf summary path/to/your/ctrf-report.json
```

### Generating Detailed Test Table

For a test details table, add the following to your workflow YAML:

``` yaml
- name: Publish CTRF Detailed Test Summary Results
  run: npx github-actions-ctrf tests path/to/your/ctrf-report.json
```

### Generating Failed Test Details Table

For a failed test details table, add the following to your workflow yaml:

``` yaml
- name: Publish CTRF Failed Test Summary Results
  run: npx github-actions-ctrf failed path/to/your/ctrf-report.json
```

### Generating Flaky Test Details Table

For a flaky test details table, add the following to your workflow yaml:

``` yaml
- name: Publish CTRF Flaky Test Summary Results
  run: npx github-actions-ctrf flaky path/to/your/ctrf-report.json
```

### Generating Fail annotations

``` yaml
- name: Annotate failed tests
  run: npx github-actions-ctrf annotate path/to/your/ctrf-report.json
```

### Notes

You can use multiple summaries in the same job, for example: 

``` yaml
- name: Publish CTRF Test Summary Results
  run: npx github-actions-ctrf summary path/to/your/ctrf-report.json
- name: Publish CTRF Failed Test Summary Results
  run: npx github-actions-ctrf failed path/to/your/ctrf-report.json
- name: Publish CTRF Flaky Test Summary Results
  run: npx github-actions-ctrf flaky path/to/your/ctrf-report.json
- name: Publish CTRF Detailed Test Summary Results
  run: npx github-actions-ctrf tests path/to/your/ctrf-report.json
- name: Annotate failed tests
  run: npx github-actions-ctrf annotate path/to/your/ctrf-report.json
```

## Components

### Summary

![Project Logo](images/summary.png)

### Test details

![Project Logo](images/tests.png)

### Failed details

![Project Logo](images/failed.png)

### Flaky details

![Project Logo](images/flaky.png)

## What is CTRF?

CTRF is a universal JSON test report schema that addresses the lack of a standardized format for JSON test reports.

**Consistency Across Tools:** Different testing tools and frameworks often produce reports in varied formats. CTRF ensures a uniform structure, making it easier to understand and compare reports, regardless of the testing tool used.

**Language and Framework Agnostic:** It provides a universal reporting schema that works seamlessly with any programming language and testing framework.

**Facilitates Better Analysis:** With a standardized format, programatically analyzing test outcomes across multiple platforms becomes more straightforward.

## Support Us

If you find this project useful, consider giving it a GitHub star ⭐ It means a lot to us.
