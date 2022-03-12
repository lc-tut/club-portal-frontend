export function toAbsolutePath(path: string): string {
  return path.startsWith("blob")
    ? path
    : `${location.protocol}//${location.host}/${path}`
}
