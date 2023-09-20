export default {
  encode(decoded) {
    return btoa(decoded);
  },
  decode(encoded) {
    return atob(encoded);
  },
};
