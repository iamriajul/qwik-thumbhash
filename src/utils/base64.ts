import {thumbHashToDataURL} from "thumbhash";

export const decodeThumbhashBase64ToDataUrl = (hash: string): string => {
  return thumbHashToDataURL(Uint8Array.from(atob(hash), c => c.charCodeAt(0)));
}