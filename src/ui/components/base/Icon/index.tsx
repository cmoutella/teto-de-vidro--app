import type { ReactNode } from 'react'

import cx from 'classnames'

import ChevronDownMicro from '@/assets/icons/micro/chevron-down.svg'
import ChevronUpMicro from '@/assets/icons/micro/chevron-up.svg'
import EyeSlashMicro from '@/assets/icons/micro/eye-slash.svg'
import EyeMicro from '@/assets/icons/micro/eye.svg'
import MinusCircleMicro from '@/assets/icons/micro/minus-circle.svg'
import MinusMicro from '@/assets/icons/micro/minus.svg'
import PlusCircleMicro from '@/assets/icons/micro/plus-circle.svg'
import PlusMicro from '@/assets/icons/micro/plus.svg'
import TrashMicro from '@/assets/icons/micro/trash.svg'
import ChevronDownMini from '@/assets/icons/mini/chevron-down.svg'
import ChevronUpMini from '@/assets/icons/mini/chevron-up.svg'
import EyeSlashMini from '@/assets/icons/mini/eye-slash.svg'
import EyeMini from '@/assets/icons/mini/eye.svg'
import MinusCircleMini from '@/assets/icons/mini/minus-circle.svg'
import MinusMini from '@/assets/icons/mini/minus.svg'
import PlusCircleMini from '@/assets/icons/mini/plus-circle.svg'
import PlusMini from '@/assets/icons/mini/plus.svg'
import TrashMini from '@/assets/icons/mini/trash.svg'
import ChevronDownOutline from '@/assets/icons/outline/chevron-down.svg'
import ChevronUpOutline from '@/assets/icons/outline/chevron-up.svg'
import EyeSlashOutline from '@/assets/icons/outline/eye-slash.svg'
import EyeOutline from '@/assets/icons/outline/eye.svg'
import MinusCircleOutline from '@/assets/icons/outline/minus-circle.svg'
import MinusOutline from '@/assets/icons/outline/minus.svg'
import PlusCircleOutline from '@/assets/icons/outline/plus-circle.svg'
import PlusOutline from '@/assets/icons/outline/plus.svg'
import TrashOutline from '@/assets/icons/outline/trash.svg'
import ChevronDownSolid from '@/assets/icons/solid/chevron-down.svg'
import ChevronUpSolid from '@/assets/icons/solid/chevron-up.svg'
import EyeSlashSolid from '@/assets/icons/solid/eye-slash.svg'
import EyeSolid from '@/assets/icons/solid/eye.svg'
import MinusCircleSolid from '@/assets/icons/solid/minus-circle.svg'
import MinusSolid from '@/assets/icons/solid/minus.svg'
import PlusCircleSolid from '@/assets/icons/solid/plus-circle.svg'
import PlusSolid from '@/assets/icons/solid/plus.svg'
import TrashSolid from '@/assets/icons/solid/trash.svg'

type IconMode = 'solid' | 'outline' | 'mini' | 'micro'

type AvailableIcon =
  | 'chevron-down'
  | 'chevron-up'
  | 'eye'
  | 'eye-slash'
  | 'minus'
  | 'minus-circle'
  | 'plus'
  | 'plus-circle'
  | 'trash'

type ModeIconCollection = { [_key in AvailableIcon]: ReactNode }

type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface IconProps {
  icon: AvailableIcon
  className?: string
  mode?: IconMode
  size?: IconSize
  onClick?: () => void
}

const Icon = ({ icon, className, mode = 'outline', size = 'sm', onClick }: IconProps) => {
  /**
   * SOLID ICONS
   */
  const solidIcons: ModeIconCollection = {
    minus: MinusSolid,
    'minus-circle': MinusCircleSolid,
    plus: PlusSolid,
    'plus-circle': PlusCircleSolid,
    'chevron-up': ChevronUpSolid,
    'chevron-down': ChevronDownSolid,
    eye: EyeSolid,
    'eye-slash': EyeSlashSolid,
    trash: TrashSolid
  }

  /**
   * OUTLINE ICONS
   */
  const outlineIcons: ModeIconCollection = {
    minus: MinusOutline,
    'minus-circle': MinusCircleOutline,
    plus: PlusOutline,
    'plus-circle': PlusCircleOutline,
    'chevron-up': ChevronUpOutline,
    'chevron-down': ChevronDownOutline,
    eye: EyeOutline,
    'eye-slash': EyeSlashOutline,
    trash: TrashOutline
  }

  /**
   * MINI ICONS
   */
  const miniIcons: ModeIconCollection = {
    minus: MinusMini,
    'minus-circle': MinusCircleMini,
    plus: PlusMini,
    'plus-circle': PlusCircleMini,
    'chevron-up': ChevronUpMini,
    'chevron-down': ChevronDownMini,
    eye: EyeMini,
    'eye-slash': EyeSlashMini,
    trash: TrashMini
  }

  /**
   * MICRO ICONS
   */
  const microIcons: ModeIconCollection = {
    minus: MinusMicro,
    'minus-circle': MinusCircleMicro,
    plus: PlusMicro,
    'plus-circle': PlusCircleMicro,
    'chevron-up': ChevronUpMicro,
    'chevron-down': ChevronDownMicro,
    eye: EyeMicro,
    'eye-slash': EyeSlashMicro,
    trash: TrashMicro
  }

  const icons: { [_key in IconMode]: ModeIconCollection } = {
    solid: solidIcons,
    outline: outlineIcons,
    mini: miniIcons,
    micro: microIcons
  }

  const iconSize: { [_key in IconSize]: string } = {
    '2xs': 'h-4 w-4',
    xs: 'h-5 w-5',
    sm: 'h-6 w-6',
    md: 'h-7 w-7',
    lg: 'h-8 w-8',
    xl: 'h-9 w-9',
    '2xl': 'h-10 w-10'
  }

  const IconElement = () => {
    const IconSVG = icons[mode][icon]
    return (
      <IconSVG
        className={cx('min-h-4 min-w-4 text-inherit', iconSize[size], className)}
        onClick={onClick}
      />
    )
  }

  return typeof IconElement === 'function' ? <IconElement /> : null
}

export default Icon
