import type { ReactNode } from 'react'

import cx from 'classnames'

import ChevronDownMicro from '@/assets/icons/micro/chevron-down.svg'
import ChevronUpMicro from '@/assets/icons/micro/chevron-up.svg'
import EyeSlashMicro from '@/assets/icons/micro/eye-slash.svg'
import EyeMicro from '@/assets/icons/micro/eye.svg'
import TrashMicro from '@/assets/icons/micro/trash.svg'
import ChevronDownMini from '@/assets/icons/mini/chevron-down.svg'
import ChevronUpMini from '@/assets/icons/mini/chevron-up.svg'
import EyeSlashMini from '@/assets/icons/mini/eye-slash.svg'
import EyeMini from '@/assets/icons/mini/eye.svg'
import TrashMini from '@/assets/icons/mini/trash.svg'
import ChevronDownOutline from '@/assets/icons/outline/chevron-down.svg'
import ChevronUpOutline from '@/assets/icons/outline/chevron-up.svg'
import EyeSlashOutline from '@/assets/icons/outline/eye-slash.svg'
import EyeOutline from '@/assets/icons/outline/eye.svg'
import TrashOutline from '@/assets/icons/outline/trash.svg'
import ChevronDownSolid from '@/assets/icons/solid/chevron-down.svg'
import ChevronUpSolid from '@/assets/icons/solid/chevron-up.svg'
import EyeSlashSolid from '@/assets/icons/solid/eye-slash.svg'
import EyeSolid from '@/assets/icons/solid/eye.svg'
import TrashSolid from '@/assets/icons/solid/trash.svg'

type IconMode = 'solid' | 'outline' | 'mini' | 'micro'

type AvailableIcon = 'chevron-down' | 'chevron-up' | 'eye' | 'eye-slash' | 'trash'

type ModeIconCollection = { [_key in AvailableIcon]: ReactNode }

interface IconProps {
  icon: AvailableIcon
  className?: string
  mode?: IconMode
  size?: IconSize
}

type IconSize = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

const Icon = ({ icon, className, mode = 'outline', size = 'sm' }: IconProps) => {
  /**
   * SOLID ICONS
   */
  const solidIcons: ModeIconCollection = {
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
    return <IconSVG className={cx('min-h-4 min-w-4 text-inherit', iconSize[size], className)} />
  }

  return typeof IconElement === 'function' ? <IconElement /> : null
}

export default Icon
