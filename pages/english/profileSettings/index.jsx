import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import styles from "../../styles/ProfileSettings.module.sass";

export default function profileSettings() {
  return (
    <header className={styles.container}>
      <h1 className={styles.settings}>Настройки Аккаунта</h1>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Тема Сайта
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          defaultValue="White"
          name="row-radio-buttons-group"
        >
          <FormControlLabel value="White" control={<Radio />} label="Белый" />
          <FormControlLabel value="Black" control={<Radio />} label="Черный" />
        </RadioGroup>
      </FormControl>
    </header>
  );
}
