// safe jwt decode helper to avoid default/named export mismatch
import * as jwt from "jwt-decode";

const _decode = jwt && jwt.default ? jwt.default : jwt;

export function decodeToken(token){
  if(!token) return null;
  try {
    return _decode(token);
  } catch (e) {
    return null;
  }
}
