import type { RuleConfigCondition, TargetCaseType } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      ['wip', 'linter', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'style', 'test', 'merge']
    ] as [RuleConfigSeverity, RuleConfigCondition, string[]],
    'scope-case': [
      RuleConfigSeverity.Error,
      'always',
      ['sentence-case', 'kebab-case', 'pascal-case', 'camel-case']
    ] as [RuleConfigSeverity, RuleConfigCondition, TargetCaseType[]],
    'scope-min-length': [RuleConfigSeverity.Error, 'always', 2] as const,
    'subject-min-length': [RuleConfigSeverity.Error, 'always', 5] as const,
    'subject-case': [RuleConfigSeverity.Error, 'always', ['lower-case', 'sentence-case']] as [
      RuleConfigSeverity,
      RuleConfigCondition,
      TargetCaseType[]
    ],
    'body-empty': [RuleConfigSeverity.Disabled, 'always'] as const,
    'footer-empty': [RuleConfigSeverity.Disabled, 'always'] as const
  }
}
