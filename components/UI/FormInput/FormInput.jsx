import React, { useContext, useState } from "react";
import { Autocomplete } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./FormInput.module.sass";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "../../../api/axios.news";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AppContext } from "../../Layout/Layout";
import cn from "classnames";
import { useAuthCookie } from "../../../hooks/useAuthCookie";

const DEFAULT = {
  categories: null,
  title: "",
  smallDes: "",
  fullDescription: "",
};

function FormInput({ data }) {
  // State
  const [formNews, setFormNews] = useState({ ...DEFAULT });
  const [uploadImage, setUploadImage] = useState();
  const [loading, setLoading] = useState(false);
  const { webColor } = useContext(AppContext);
  const { dataUser, setDataUser } = useAuthCookie();

  //Handler
  const changeHandler = (e) => {
    setFormNews({
      ...formNews,
      [e.target.name]: e.target.value,
    });
  };
  const changeHandlerInnerText = (_, newValue) => {
    if (newValue) {
      setFormNews({
        ...formNews,
        categories: newValue.id,
      });
    } else {
      return;
    }
  };

  const onFileState = (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUploadImage(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Submit
  const onSubmitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/news", {
        data: {
          ...formNews,
          // user: dataUser.id,
          image: { ...uploadImage },
        },
      })
      .then(() => {
        setFormNews({ ...DEFAULT });
      })
      .catch((error) => {
        setLoading(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Box
        onSubmit={onSubmitForm}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
        className={styles.formHeader}
      >
        <div className={styles.sidebar}>
          <Autocomplete
            id="combo-box-demo"
            options={data}
            sx={{ width: 300, maxWidth: "100%" }}
            onChange={changeHandlerInnerText}
            renderInput={(params) => {
              return (
                <TextField
                  onChange={changeHandler}
                  name="categories"
                  value={data.id}
                  {...params}
                  id="standard-basic"
                  label="Выберите категорию"
                  variant="standard"
                />
              );
            }}
          />
          <TextField
            value={formNews.title}
            name="title"
            id="standard-basic"
            label="Загаловок новости"
            variant="standard"
            onChange={changeHandler}
          />
          <TextField
            value={formNews.smallDes}
            name="smallDes"
            onChange={changeHandler}
            id="standard-textarea"
            label="Краткое описание"
            minRows={3}
            maxRows={3}
            placeholder="Введите краткое описание"
            multiline
            variant="standard"
          />
        </div>
        <TextField
          value={formNews.fullDescription}
          name="fullDescription"
          id="standard-multiline-static"
          label="Полное описание новости"
          placeholder="Введите тект новости"
          multiline
          rows={8}
          fullWidth
          variant="standard"
          onChange={changeHandler}
        />
        <div className={styles.fileImg__span}>
          {uploadImage ? (
            <img
              className={styles.fileUpload__img}
              src={`${uploadImage.url}`}
              alt="#"
            />
          ) : null}
        </div>
        <div className={styles.formBtn}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ m: 0 }}>
            <label
              htmlFor="icon-button-file"
              className={cn(styles.iconPhoto__file, {
                [styles.blackColor]: webColor === "black",
              })}
            >
              <input
                style={{ display: "none" }}
                accept="image/*"
                id="icon-button-file"
                onChange={onFileState}
                type="file"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </label>
          </Stack>
          {formNews.title &&
          formNews.categories !== 0 &&
          formNews.smallDes &&
          formNews.fullDescription &&
          uploadImage ? (
            <Button
              variant="outlined"
              color="error"
              type="submit"
              disabled={loading}
            >
              {!loading ? "Отправить" : "Отправляем файлы"}
            </Button>
          ) : (
            <Button variant="outlined" disabled>
              Заполните форму
            </Button>
          )}
        </div>
      </Box>
    </>
  );
}
export default FormInput;
