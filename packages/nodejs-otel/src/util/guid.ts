export function guid(): string {
  let d = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = ((d + Math.random() * 16) % 16) | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function encodeGUID(guid: string) {
  return btoa(guid.replace(/-/g, '')).replace(/=/g, '')
}

export function decodeGUID(encodedGUID: string) {
  const guid = atob(
    encodedGUID.replace(/-/g, '').replace(/_/g, '/').replace(/~/g, '+'),
  )
  return `${guid.substring(0, 8)}-${guid.substring(8, 12)}-${guid.substring(
    12,
    16,
  )}-${guid.substring(16, 20)}-${guid.substring(20)}`
}
