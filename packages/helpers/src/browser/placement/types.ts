import { tuple, ElementOf } from '../../utils/internal/tuple'

export type Rect = ClientRect | DOMRect
export type Direction = 'top' | 'right' | 'bottom' | 'left'
export type Alignment = 'start' | 'center' | 'end'
export type CSSPosition = Partial<Record<'top' | 'left', number>>

/**
 * Full version of placement values. Every two elements is a group of synonyms.
 */
export const placements = /*@__PURE__*/ tuple(
  'top',
  'top-center',

  'top-start',
  'top-left',

  'top-end',
  'top-right',

  'bottom',
  'bottom-center',

  'bottom-start',
  'bottom-left',

  'bottom-end',
  'bottom-right',

  'left',
  'left-center',

  'left-start',
  'left-top',

  'left-end',
  'left-bottom',

  'right',
  'right-center',

  'right-start',
  'right-top',

  'right-end',
  'right-bottom'
)

/** the position of tooltip/popover */
export type Placement = ElementOf<typeof placements>
