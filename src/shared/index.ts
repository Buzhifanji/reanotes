export const getPathName = (pathname: string, path: string) => pathname === path ? 'page' : undefined;

export const subString = (input: string, from: string, to: string) => {
  return input.slice(input.indexOf(from) + from.length, input.lastIndexOf(to))
}

export const isWeb = () => (window as any)?.__TAURI_IPC__ === undefined;