export const getToDoName = (name: string): string =>
  name.length > 40 ? name.substring(0, 40) + '...' : name
