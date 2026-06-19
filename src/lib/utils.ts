export function cn(...classes: (string | boolean | undefined | null | { [key: string]: any })[]) {
  return classes
    .filter(Boolean)
    .map((c) => {
      if (typeof c === 'object' && c !== null) {
        return Object.entries(c)
          .filter(([_, active]) => active)
          .map(([className]) => className)
          .join(' ');
      }
      return c;
    })
    .join(' ');
}
