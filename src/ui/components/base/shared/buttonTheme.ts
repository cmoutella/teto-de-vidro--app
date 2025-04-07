export type ButtonType = 'default' | 'outline' | 'ghost' | 'raw'
export type ButtonSize = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
export type ButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl'

export const btnSize: { [_key in ButtonSize]: string } = {
  xsmall: 'py-0.5 px-1 text-xs',
  small: 'py-1 px-2 text-sm',
  medium: 'py-1.5 px-2 min-w-16 text-xs',
  large: 'py-1.5 px-2 min-w-16 text-xs sm:py-2 sm:px-2.5 sm:min-w-20 sm:text-sm',
  xlarge: 'py-2 px-2.5 min-w-20 text-sm sm:py-3 sm:px-3 sm:min-w-[96px] sm:text-md',
  xxlarge: 'py-3 px-3 min-w-[96px] text-md sm:py-3 px-3 sm:min-w-[120px] sm:text-md'
}

export const roundedBtnSize: { [_key in ButtonSize]: string } = {
  xsmall: 'p-0.5 h-4 text-xs',
  small: 'p-1 h-5 text-xs',
  medium: 'p-1.5 h-6 text-sm',
  large: 'p-2 h-7',
  xlarge: 'p-3 h-10',
  xxlarge: 'p-3 h-14'
}

export const btnBorderRadius: { [_key in ButtonRadius]: string } = {
  none: 'rounded-0',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl'
}
