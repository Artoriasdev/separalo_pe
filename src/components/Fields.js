import React, { useState } from "react";
import { useField } from "formik";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Paper,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { cleanSearch } from "../actions/search";

export const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props);
  return (
    <div className="input">
      <TextField
        label={label}
        variant="outlined"
        className={
          meta.touched && meta.error
            ? "animate__animated animate__shakeX"
            : null
        }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyPasswordInput = ({ label, ...props }) => {
  const [show, setShow] = useState(false);
  const [field, meta] = useField(props);
  const handleShowPassword = () => {
    setShow(!show);
  };
  return (
    <div className="input">
      <OutlinedInput
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "animate__animated animate__shakeX"
            : null
        }
        autoComplete="off"
        type={show ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleShowPassword}
              edge="end"
            >
              {show ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        placeholder={label}
      />
      {meta.touched && meta.error ? (
        <div className="error font-p">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyCheckbox = ({ children, ...props }) => {
  // React treats radios and checkbox inputs differently other input types, select, and textarea.
  // Formik does this too! When you specify `type` to useField(), it will
  // return the correct bag of props for you -- a `checked` prop will be included
  // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
  const [field, meta] = useField({ ...props, type: "checkbox" });

  return (
    <div>
      <FormControlLabel
        className={
          meta.touched && meta.error
            ? "animate__animated animate__shakeX"
            : null
        }
        control={<Checkbox {...field} {...props} color="primary" />}
        label={children}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ children, label, ...props }) => {
  const [field, meta] = useField(props);
  //   console.log(props.children.length);
  return (
    <div>
      <Select
        fullWidth
        variant="outlined"
        displayEmpty
        {...field}
        {...props}
        className={
          meta.touched && meta.error
            ? "animate__animated animate__shakeX"
            : null
        }
      >
        {children}
      </Select>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyButton = ({ children, ...props }) => {
  return (
    <div>
      <Button
        size="large"
        color="primary"
        variant="contained"
        className="btn-primary"
        fullWidth
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

export const MySearchHomeInput = ({ label, ...props }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleRedirectBusiness = (id, category) => {
    history.push(`/services-menu-category/${id}/${category}`);
    dispatch(cleanSearch());
  };
  const { business } = useSelector((state) => state.search);
  return (
    <div className="input">
      <OutlinedInput
        {...props}
        fullWidth
        autoComplete="off"
        type="text"
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
        placeholder={label}
      />
      {business && (
        <Paper className="autocomplete">
          {business.map(({ id, tradeName, idCategory }) => (
            <MenuItem
              // className="animate__animated animate__slideInUp"
              onClick={(e) => {
                handleRedirectBusiness(id, idCategory);
                console.log("Redirección del business");
              }}
              key={id}
            >
              {tradeName}
            </MenuItem>
          ))}
        </Paper>
      )}
    </div>
  );
};
