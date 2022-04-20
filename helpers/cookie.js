import cookie from "cookie";

export async function getCookie(req) {
  let userData = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

  if (Object.keys(userData).length !== 0 && "user" in userData) {
    userData = JSON.parse(userData?.user);
  }

  return {
    userData,
  };
}
