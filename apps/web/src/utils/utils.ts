
export function missingClass(string?: string, prefix?: string) {
  if (!string) {
    return true
  }

  const regex = new RegExp(` ?${prefix}`, 'g')
  return regex.exec(string) === null
}