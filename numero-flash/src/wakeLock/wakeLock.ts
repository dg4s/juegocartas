type Sentinel = {
  released: boolean
  release: () => Promise<void>
}

let sentinel: Sentinel | null = null

function getWakeLock(): { request: (type: 'screen') => Promise<Sentinel> } | undefined {
  return navigator.wakeLock
}

export async function requestWakeLock(): Promise<void> {
  const api = getWakeLock()
  if (!api || document.visibilityState !== 'visible') return
  try {
    sentinel = await api.request('screen')
  } catch {
    sentinel = null
  }
}

export async function releaseWakeLock(): Promise<void> {
  if (!sentinel) return
  try {
    if (!sentinel.released) {
      await sentinel.release()
    }
  } catch {
    /* no crítico */
  } finally {
    sentinel = null
  }
}

export async function restoreWakeLockIfActive(matchActive: boolean): Promise<void> {
  if (!matchActive || document.visibilityState !== 'visible') return
  await requestWakeLock()
}
