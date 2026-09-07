import type { Phase } from './types'

export type VisibilityEffect = 'cancel' | 'cancel-hide' | 'ignore'

export function visibilityOnHidden(phase: Phase): VisibilityEffect {
  switch (phase) {
    case 'COUNTDOWN':
    case 'GO_SIGNAL':
      return 'cancel'
    case 'EXPOSURE':
      return 'cancel-hide'
    default:
      return 'ignore'
  }
}
