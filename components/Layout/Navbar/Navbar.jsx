import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.sass";
import logoImg from "./logoImgNews.png";
import { nav } from "../../../data/nav";
import Button from "@mui/material/Button";
import ModalLogin from "../../UI/Modal/ModalLogin";
import { removeCookies } from "cookies-next";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box } from "@mui/system";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAuthCookie } from "../../../hooks/useAuthCookie";

const settings = [
  { name: "Профиль", click: "/profileSettings", id: "Profile" },
  { name: "Добавить Новость", click: "/addNews", id: "AddNews" },
  { name: "Выход", click: "/", id: "Output" },
];

function Navbar({}) {
  //state
  const [showBtn, setShowBtn] = useState(false);
  const getHandlerBtn = () => setShowBtn(!showBtn);
  const [anchorElUser, setAnchorElUser] = useState();
  const router = useRouter();
  const { dataUser, setDataUser } = useAuthCookie();


  // fun
  const handleOpenUserMenu = (e) => {
    setAnchorElUser(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const AddListenerUser = () => {
    setAnchorElUser(null);
    removeCookies("user");
    setDataUser("");
    router.push("/");
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <label>
            <img src={logoImg.src} alt="#" className={styles.logoImg} />
            <h3 className={styles.logoTitle}>News</h3>
          </label>
        </div>
        <nav className="nav">
          {nav.map(({ href, title, id }) => {
            return (
              <Link key={id} href={href}>
                <a className={styles.navLink}>{title}</a>
              </Link>
            );
          })}
        </nav>
        {!dataUser ? (
          <div className="account">
            <Button
              variant="outlined"
              onClick={() => setShowBtn(!showBtn)}
              color="error"
            >
              Войти
            </Button>
          </div>
        ) : (
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircle
                  style={{
                    maxWidth: "40px",
                    maxHeight: "40px",
                    minWidth: "30px",
                    minHeight: "35px",
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) =>
                setting.id === "Output" ? (
                  <MenuItem key={setting.id} onClick={AddListenerUser}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                    <Link href={setting.click}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </Link>
                  </MenuItem>
                )
              )}
            </Menu>
          </Box>
        )}
      </div>
      <ModalLogin close={getHandlerBtn} show={showBtn} />
    </header>
  );
}

export default Navbar;
