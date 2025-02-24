export type ButtonType = 'default' | 'outline' | 'ghost' | 'raw'
export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export const btnSize: { [_key in ButtonSize]: string } = {
  xsmall: 'py-0.5 px-2 max-h-7 text-xs',
  small: 'py-1 px-2 max-h-7 min-w-15 text-sm',
  medium: 'py-1.5 px-2 max-h-8 min-w-16 text-sm',
  large: 'py-2 px-2.5 max-h-9 min-w-20 text-sm',
  xlarge: 'py-3 px-3 max-h-12 min-w-[96px] text-md'
}

export const roundedBtnSize: { [_key in ButtonSize]: string } = {
  xsmall: 'p-0.5 h-4 text-xs',
  small: 'p-1 h-5 text-xs',
  medium: 'p-1.5 h-6 text-sm',
  large: 'p-2 h-7',
  xlarge: 'p-3 h-10'
}

export const btnBorderRadius: { [_key in ButtonRadius]: string } = {
  none: 'rounded-0',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}
