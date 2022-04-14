import React, { useState } from "react";
import { Autocomplete } from "@mui/material";
import { category } from "../../../data/category";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import style from "./FormInput.module.sass";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "../../../api/axios.news";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

// import styled from "styled-components";
// const Input = styled("input")({
//   display: "none",
// });

function FormInput({ data }) {
  const [formNews, setFormNews] = useState({
    category: "",
    title: "",
    smallDes: "",
    fullDescription: "",
  });

  const changeHandler = (e) => {
    setFormNews({
      ...formNews,
      [e.target.name]: e.target.value,
    });
  };

  const changeHandlerInnerText = (e) => {
    setFormNews({
      ...formNews,
      category: e.target.innerText,
    });
  };

  const [uploadImage, setUploadImage] = useState();

  const onFileState = (e) => {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);
    axios
      .post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res.data[0]);
        setUploadImage(res.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post("/news", {
        data: {
          ...formNews,
          image: uploadImage,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Object.keys(data).map((key) => {
  //   console.log();
  //   return {
  //     ...data[key],
  //     id: key,
  //   };
  // });
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
        className={style.formHeader}
      >
        <div className={style.sidebar}>
          <Autocomplete
            id="combo-box-demo"
            options={category}
            sx={{ width: 300, maxWidth: "100%" }}
            onChange={changeHandlerInnerText}
            renderInput={(params) => (
              <TextField
                name="category"
                value={formNews.category}
                {...params}
                id="standard-basic"
                label="Выберите категорию"
                variant="standard"
              />
            )}
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
        <div className={style.fileImg__span}>
          {uploadImage ? (
            <img
              className={style.fileUpload__img}
              src={`${uploadImage.url}`}
              alt="#"
            />
          ) : null}
        </div>
        <div className={style.formBtn}>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ m: 0 }}>
            <label htmlFor="icon-button-file" className={style.iconPhoto__file}>
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
          <Button variant="outlined" color="error" type="submit">
            Отправить
          </Button>
        </div>
      </Box>
    </>
  );
}
export default FormInput;
