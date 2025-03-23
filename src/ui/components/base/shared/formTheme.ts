export type FormSizes = 'md' | 'lg'
export type FormTheme = 'light' | 'dark' | 'nude'
export type InputFieldParts = 'wrapper' | 'input' | 'label' | 'helpText'

export const iSizes: { [_key in FormSizes]: string } = {
  md: 'px-2 rounded-lg h-10',
  lg: 'px-2 rounded-lg h-12'
}

export const formTheme: {
  [_key in FormTheme]: { [_key in InputFieldParts]: string }
} = {
  light: {
    wrapper: 'border border-1 border-brand-primary-700 bg-white bg-opacity-80',
    input: 'text-brand-gray-700 text-sm',
    label: 'text-sm font-bold text-brand-primary-600',
    helpText: 'text-xs text-brand-gray-700'
  },
  dark: {
    wrapper: 'border border-1 border-brand-primary-700 bg-brand-gray-800 bg-opacity-80',
    input: 'text-white text-sm',
    label: 'text-sm font-bold text-white',
    helpText: 'text-xs text-white'
  },
  nude: {
    wrapper: 'border-none bg-white bg-opacity-80',
    input: 'text-brand-gray-700 text-sm',
    label: 'text-sm font-bold text-brand-gray-700',
    helpText: 'text-xs text-brand-gray-700'
  }
}

export const baseInputStyle = 'block w-full border-none bg-transparent'
