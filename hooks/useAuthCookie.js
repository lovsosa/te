import { useState, useEffect } from "react";

import { getCookies } from "cookies-next";

export function useAuthCookie() {
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const data = getCookies("user");
    const user = data.user ? JSON.parse(decodeURIComponent(data.user)) : "";
    if (data.user) {
      setDataUser({ ...user });
    }
  }, []);
  return { dataUser, setDataUser };
}
