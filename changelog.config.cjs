module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji} {subject}',
  list: [
    'wip',
    'linter',
    'chore',
    'ci',
    'docs',
    'feat',
    'fix',
    'refactor',
    'style',
    'merge'
  ],
  questions: ['type', 'scope', 'subject'],
  scopes: ['component', 'ui', 'template', 'page', 'providers',  'service', 'request', 'config', 'app' ],
  types: {
    wip: {
      // description: 'Work in progress.',
      description: 'Em andamento / não concluído',
      emoji: '🚧',
      value: 'wip'
    },
    linter: {
      // description: 'Fix compiler / linter warnings / Improve structure / format of the code.',
      description: 'Melhorias de compilador, linter, estrutura / formatação de código',
      emoji: '🚨',
      value: 'linter'
    },
    chore: {
      // description: 'Build process or auxiliary tool changes',
      description: 'Melhorias de processos e ferramentas auxiliares',
      emoji: '🤖',
      value: 'chore'
    },
    ci: {
      // description: 'Add or update CI build system.',
      description: 'Melhorias de CI',
      emoji: '👷',
      value: 'ci'
    },
    docs: {
      // description: 'Add or update documentation.',
      description: 'Documentação',
      emoji: '📝',
      value: 'docs'
    },
    feat: {
      // description: 'Introduce new features.',
      description: 'Novas funcionalidades neste projeto',
      emoji: '✨',
      value: 'feat'
    },
    fix: {
      // description: 'Fix a bug.',
      description: 'Correção de bugs',
      emoji: '🐛',
      value: 'fix'
    },
    refactor: {
      // description: 'Refactor / Reorganize code.',
      description: 'Refatorar / reorganizar o código',
      emoji: '♻️',
      value: 'refactor'
    },
    style: {
      // description: 'Add or update the UI or style files',
      description: 'Adição / correção de estilo',
      emoji: '💄',
      value: 'style'
    },
    merge: {
      // description: 'Merge branches.',
      description: 'Merge',
      emoji: '🔀',
      value: 'merge'
    }
  },
  messages: {
    type: 'Selecione o tipo de alteração que foi feita:',
    scope: '\nDetermine o escopo dessa alteração:',
    customScope: '\nDetermine o escopo dessa alteração:',
    subject: 'Uma descrição curta e sucinta desta alteração:\n',
    body: 'De mais detalhes desta alteração. \n Se necessário liste mudanças críticas. Use "|" to break new line:\n',
    breaking: 'Liste mudanças críticas:\n',
    confirmCommit: 'Confirme se o commit condiz com a alteração feita:'
  },
  allowBreakingChanges: ['feat', 'fix'],
  isTicketNumberRequired: false,
  maxMessageLength: 72,
  minMessageLength: 3,
  subjectLimit: 100,
  breaklineChar: '|',
  allowTicketNumber: false
}
