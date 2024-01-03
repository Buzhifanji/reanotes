export const getPathName = (pathname: string, path: string) => pathname === path ? 'page' : undefined;

export const subString = (input: string, from: string, to: string) => {
  return input.slice(input.indexOf(from) + from.length, input.lastIndexOf(to))
}

export const isWeb = () => (window as any)?.__TAURI_IPC__ === undefined;

export const concatUint8Array = (buf1: Uint8Array, buf2: Uint8Array) => {
  const n = buf1.length + buf2.length;
  const result = new Uint8Array(n);
  result.set(buf1);
  result.set(buf2, buf1.length);
  return result;
}

export const isArray = <T>(val: any): val is Array<T> => Array.isArray(val);

export const isObj = (val: any): val is object =>
  Object.prototype.toString.call(val) === '[object Object]';