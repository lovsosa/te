import React, { useState } from "react";
import cn from "classnames";
import styles from "./ModalLogin.module.sass";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "../../../api/axios.news";
import { useCookies } from "react-cookie";
import Link from "next/link";
import BackDrop from "../BackDrop/BackDrop";
import { useRouter } from "next/router";

const DEFAULT = {
  value: {
    identifier: "",
    password: "",
  },
  errorInput: true,
};
function ModalLogin({ show, close }) {
  //state
  const [cookie, setCookie] = useCookies(["user"]);
  const [loginUser, setLoginUser] = useState({ ...DEFAULT });
  const [result, setResult] = useState(null);
  const router = useRouter();

  // Handler
  const changeHandler = (e) => {
    setLoginUser({
      ...loginUser,
      value: {
        ...loginUser.value,
        [e.target.name]: e.target.value,
      },
    });
  };

  //Submit userForm
  const onSubmit = async (e) => {
    e.preventDefault();
    if (loginUser.value.identifier && loginUser.value.password) {
      try {
        const response = await axios.post(
          "/auth/local",
          loginUser.value
        ).finally(() => {
          close()
          router.push("/")
          window.location.reload();
        })
        const data = { token: response.data.jwt, ...response.data.user };
        if (!response && !data) {
          throw new Error();
        }
        setCookie("user", JSON.stringify(data), {
          path: "/",
          maxAge: 3600,
          sameSite: true,
        });
      } catch (error) {
        setResult("Пользователь не найден");
        setLoginUser({
          ...DEFAULT,
          errorInput: false,
        });
      }
    } else {
      setResult("Заполните поле");
      setLoginUser({
        ...DEFAULT,
        errorInput: false,
      });
    }
  };
  const errorFormBack = () => {
    setLoginUser({ ...DEFAULT });
    close();
  };

  return (
    <>
      <BackDrop errorForm={() => errorFormBack()} show={show} />
      <div
        className={cn(styles.modal__container, { [styles.modalShow]: show })}
      >
        <h2 className={styles.modal__title}>Войти</h2>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
          className={styles.form__container}
          onSubmit={onSubmit}
        >
          {loginUser.errorInput ? (
            <>
              <TextField
                id="standard-password-input"
                label="Email"
                type="email"
                variant="standard"
                value={loginUser.value.identifier}
                name="identifier"
                onChange={changeHandler}
              />
              <TextField
                id="standard-password-input"
                label="Пароль"
                type="password"
                autoComplete="current-password"
                variant="standard"
                value={loginUser.value.password}
                name="password"
                onChange={changeHandler}
              />
            </>
          ) : (
            <>
              <TextField
                error
                id="standard-error-helper-text"
                label="Email"
                type="email"
                helperText={result}
                variant="standard"
                value={loginUser.value.identifier}
                name="identifier"
                onChange={changeHandler}
              />
              <TextField
                error
                id="standard-error-helper-text"
                label="Пароль"
                type="password"
                helperText={result}
                variant="standard"
                value={loginUser.value.password}
                name="password"
                onChange={changeHandler}
              />
            </>
          )}
          <div className={styles.modalBtn}>
            <Button variant="outlined" color="error" type="submit">
              Войти
            </Button>
            <Link href="/createUserLogin">
              <a
                // onClick={close}
                style={{
                  fontSize: "12px",
                  alignSelf: "center",
                  margin: "10px 0 0 0",
                }}
              >
                Зарегистрироваться
              </a>
            </Link>
          </div>
        </Box>
      </div>
    </>
  );
}

export default ModalLogin;
