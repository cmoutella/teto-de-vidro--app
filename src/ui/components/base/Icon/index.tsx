import type { ElementType, ReactNode } from 'react'

import cx from 'classnames'

import OfficeMicro from '@/assets/icons/micro/building-library.svg'
import CheckMicro from '@/assets/icons/micro/check.svg'
import ChevronDoubleRightMicro from '@/assets/icons/micro/chevron-double-right.svg'
import ChevronDownMicro from '@/assets/icons/micro/chevron-down.svg'
import ChevronLeftMicro from '@/assets/icons/micro/chevron-left.svg'
import ChevronRightMicro from '@/assets/icons/micro/chevron-right.svg'
import ChevronUpMicro from '@/assets/icons/micro/chevron-up.svg'
import EyeSlashMicro from '@/assets/icons/micro/eye-slash.svg'
import EyeMicro from '@/assets/icons/micro/eye.svg'
import MinusCircleMicro from '@/assets/icons/micro/minus-circle.svg'
import MinusMicro from '@/assets/icons/micro/minus.svg'
import PencilMicro from '@/assets/icons/micro/pencil.svg'
import PlusCircleMicro from '@/assets/icons/micro/plus-circle.svg'
import PlusMicro from '@/assets/icons/micro/plus.svg'
import RecycleMicro from '@/assets/icons/micro/recycle.svg'
import TrashMicro from '@/assets/icons/micro/trash.svg'
import XMicro from '@/assets/icons/micro/x.svg'
import OfficeMini from '@/assets/icons/mini/building-library.svg'
import CheckMini from '@/assets/icons/mini/check.svg'
import ChevronDoubleRightMini from '@/assets/icons/mini/chevron-double-right.svg'
import ChevronDownMini from '@/assets/icons/mini/chevron-down.svg'
import ChevronLeftMini from '@/assets/icons/mini/chevron-left.svg'
import ChevronRightMini from '@/assets/icons/mini/chevron-right.svg'
import ChevronUpMini from '@/assets/icons/mini/chevron-up.svg'
import EyeSlashMini from '@/assets/icons/mini/eye-slash.svg'
import EyeMini from '@/assets/icons/mini/eye.svg'
import MinusCircleMini from '@/assets/icons/mini/minus-circle.svg'
import MinusMini from '@/assets/icons/mini/minus.svg'
import PencilMini from '@/assets/icons/mini/pencil.svg'
import PlusCircleMini from '@/assets/icons/mini/plus-circle.svg'
import PlusMini from '@/assets/icons/mini/plus.svg'
import RecycleMini from '@/assets/icons/mini/recycle.svg'
import TrashMini from '@/assets/icons/mini/trash.svg'
import XMini from '@/assets/icons/mini/x.svg'
import OfficeOutline from '@/assets/icons/outline/building-library.svg'
import CheckOutline from '@/assets/icons/outline/check.svg'
import ChevronDoubleRightOutline from '@/assets/icons/outline/chevron-double-right.svg'
import ChevronDownOutline from '@/assets/icons/outline/chevron-down.svg'
import ChevronLeftOutline from '@/assets/icons/outline/chevron-left.svg'
import ChevronRightOutline from '@/assets/icons/outline/chevron-right.svg'
import ChevronUpOutline from '@/assets/icons/outline/chevron-up.svg'
import EyeSlashOutline from '@/assets/icons/outline/eye-slash.svg'
import EyeOutline from '@/assets/icons/outline/eye.svg'
import MinusCircleOutline from '@/assets/icons/outline/minus-circle.svg'
import MinusOutline from '@/assets/icons/outline/minus.svg'
import PencilOutline from '@/assets/icons/outline/pencil.svg'
import PlusCircleOutline from '@/assets/icons/outline/plus-circle.svg'
import PlusOutline from '@/assets/icons/outline/plus.svg'
import RecycleOutline from '@/assets/icons/outline/recycle.svg'
import TrashOutline from '@/assets/icons/outline/trash.svg'
import XOutline from '@/assets/icons/outline/x.svg'
import OfficeSolid from '@/assets/icons/solid/building-library.svg'
import CheckSolid from '@/assets/icons/solid/check.svg'
import ChevronDoubleRightSolid from '@/assets/icons/solid/chevron-double-right.svg'
import ChevronDownSolid from '@/assets/icons/solid/chevron-down.svg'
import ChevronLeftSolid from '@/assets/icons/solid/chevron-left.svg'
import ChevronRightSolid from '@/assets/icons/solid/chevron-right.svg'
import ChevronUpSolid from '@/assets/icons/solid/chevron-up.svg'
import EyeSlashSolid from '@/assets/icons/solid/eye-slash.svg'
import EyeSolid from '@/assets/icons/solid/eye.svg'
import MinusCircleSolid from '@/assets/icons/solid/minus-circle.svg'
import MinusSolid from '@/assets/icons/solid/minus.svg'
import PencilSolid from '@/assets/icons/solid/pencil.svg'
import PlusCircleSolid from '@/assets/icons/solid/plus-circle.svg'
import PlusSolid from '@/assets/icons/solid/plus.svg'
import RecycleSolid from '@/assets/icons/solid/recycle.svg'
import TrashSolid from '@/assets/icons/solid/trash.svg'
import XSolid from '@/assets/icons/solid/x.svg'

type IconMode = 'solid' | 'outline' | 'mini' | 'micro'

type AvailableIcon =
  | 'check'
  | 'chevron-down'
  | 'chevron-up'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-double-right'
  | 'eye'
  | 'eye-slash'
  | 'minus'
  | 'minus-circle'
  | 'office'
  | 'pencil'
  | 'plus'
  | 'plus-circle'
  | 'recycle'
  | 'trash'
  | 'x'

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
    check: CheckSolid,
    minus: MinusSolid,
    'minus-circle': MinusCircleSolid,
    office: OfficeSolid,
    pencil: PencilSolid,
    plus: PlusSolid,
    'plus-circle': PlusCircleSolid,
    'chevron-up': ChevronUpSolid,
    'chevron-down': ChevronDownSolid,
    'chevron-left': ChevronLeftSolid,
    'chevron-right': ChevronRightSolid,
    'chevron-double-right': ChevronDoubleRightSolid,
    eye: EyeSolid,
    'eye-slash': EyeSlashSolid,
    recycle: RecycleSolid,
    trash: TrashSolid,
    x: XSolid
  }

  /**
   * OUTLINE ICONS
   */
  const outlineIcons: ModeIconCollection = {
    check: CheckOutline,
    minus: MinusOutline,
    'minus-circle': MinusCircleOutline,
    office: OfficeOutline,
    pencil: PencilOutline,
    plus: PlusOutline,
    'plus-circle': PlusCircleOutline,
    'chevron-up': ChevronUpOutline,
    'chevron-down': ChevronDownOutline,
    'chevron-left': ChevronLeftOutline,
    'chevron-right': ChevronRightOutline,
    'chevron-double-right': ChevronDoubleRightOutline,
    eye: EyeOutline,
    'eye-slash': EyeSlashOutline,
    recycle: RecycleOutline,
    trash: TrashOutline,
    x: XOutline
  }

  /**
   * MINI ICONS
   */
  const miniIcons: ModeIconCollection = {
    check: CheckMini,
    minus: MinusMini,
    'minus-circle': MinusCircleMini,
    office: OfficeMini,
    pencil: PencilMini,
    plus: PlusMini,
    'plus-circle': PlusCircleMini,
    'chevron-up': ChevronUpMini,
    'chevron-down': ChevronDownMini,
    'chevron-left': ChevronLeftMini,
    'chevron-right': ChevronRightMini,
    'chevron-double-right': ChevronDoubleRightMini,
    eye: EyeMini,
    'eye-slash': EyeSlashMini,
    recycle: RecycleMini,
    trash: TrashMini,
    x: XMini
  }

  /**
   * MICRO ICONS
   */
  const microIcons: ModeIconCollection = {
    check: CheckMicro,
    minus: MinusMicro,
    'minus-circle': MinusCircleMicro,
    office: OfficeMicro,
    pencil: PencilMicro,
    plus: PlusMicro,
    'plus-circle': PlusCircleMicro,
    'chevron-up': ChevronUpMicro,
    'chevron-down': ChevronDownMicro,
    'chevron-left': ChevronLeftMicro,
    'chevron-right': ChevronRightMicro,
    'chevron-double-right': ChevronDoubleRightMicro,
    eye: EyeMicro,
    'eye-slash': EyeSlashMicro,
    recycle: RecycleMicro,
    trash: TrashMicro,
    x: XMicro
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
    const IconSVG = icons[mode][icon] as ElementType
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
