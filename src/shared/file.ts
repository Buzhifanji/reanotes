import { concatUint8Array } from "./util";

export function readChunkFile(file: File, chunkSize = 10 * 1024 * 1024) {
  return new Promise<Uint8Array>((resovle, reject) => {
    const fileSize = file.size;
    let offset = 0;
    let result: Uint8Array = new Uint8Array();

    while (offset < fileSize) {
      const reader = new FileReader();
      const chunk = file.slice(offset, offset + chunkSize);

      reader.onload = function (e) {
        const arrayBuffer = reader.result as ArrayBuffer;
        result = concatUint8Array(result, new Uint8Array(arrayBuffer));

        if (offset >= fileSize) {

          resovle(result);
        }
      };

      reader.onerror = function (e) {
        reject(e);
      };

      reader.readAsArrayBuffer(chunk);
      offset += chunkSize;
    }
  });
}