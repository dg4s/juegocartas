import { registerSW } from 'virtual:pwa-register'

export function registerPwa(isIdle: () => boolean): void {
  const updateSW = registerSW({
    immediate: false,
    onNeedRefresh() {
      if (isIdle()) {
        void updateSW(true)
      }
    },
  })
}
