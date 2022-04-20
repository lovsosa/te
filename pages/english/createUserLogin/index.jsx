import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import style from "./createUserLogin.module.sass";
import Head from "next/head";
import { Button } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";

const DEFAULT = {
  username: "",
  lastName: "",
  login: "",
  email: "",
  password: "",
};
function createUserLogin() {
  const [userForm, setUserForm] = useState({ ...DEFAULT });
  const [cookie, setCookie] = useCookies(["user"]);
  const changeHandler = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local/register",
        userForm
      );
      const data = { token: response.data.jwt, ...response.data.user };
      setCookie("user", JSON.stringify(data), {
        path: "/",
        maxAge: 3600,
        sameSite: true,
      });
    } catch (error) {
      console.log(error);
    }
    setUserForm({ ...DEFAULT });
  };
  
  return (
    <div className="container">
      <Head>
        <title>Sign up</title>
        <meta name="createNewUser" content="News in Kyrgyzstan" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        className={style.form__container}
        onSubmit={onSubmit}
      >
        <div className={style.userLogin}>
          <div className={style.userName}>
            <TextField
              id="standard-search"
              label="Имя"
              type="text"
              variant="standard"
              value={userForm.username}
              name="username"
              onChange={changeHandler}
            />
            <TextField
              id="standard-search"
              label="Фамилия"
              type="text"
              variant="standard"
              value={userForm.lastName}
              name="lastName"
              onChange={changeHandler}
            />
          </div>
          <TextField
            id="standard-password-input"
            label="Логин"
            type="text"
            variant="standard"
            value={userForm.login}
            name="login"
            onChange={changeHandler}
          />
          <TextField
            id="standard-password-input"
            label="Email"
            type="email"
            variant="standard"
            value={userForm.email}
            name="email"
            onChange={changeHandler}
          />
          <TextField
            id="standard-password-input"
            label="Пароль"
            type="password"
            autoComplete="current-password"
            variant="standard"
            value={userForm.password}
            name="password"
            onChange={changeHandler}
          />
          <Button variant="outlined" color="error" type="submit">
            Отправить
          </Button>
        </div>
      </Box>
    </div>
  );
}

export default createUserLogin;

// export const getStaticProps = async () => {
//   try {
//     const res = await axios.get("/auth/local");
//     if (!res.data) {
//       throw new Error();
//     }
//     return {
//       props: {
//         data: res.data.data,
//       },
//     };
//   } catch (error) {
//     return {
//       props: {
//         data: [],
//         error,
//       },
//     };
//   }
// };
