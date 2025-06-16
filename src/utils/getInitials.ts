export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((part) => part.trim() !== '')
    .map((part) => part[0].toUpperCase())
    .join('')
}
