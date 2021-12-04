import React, { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
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
  const [value, setValue] = useState("");
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    if (props.accion === 1 && value !== props.data) {
      setFieldValue(field.name, props.data, true);
      setValue(props.data);
    }
  }, [props.accion, props.data, value, setFieldValue, field.name]);
  return (
    <div>
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
    <div>
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

export const MyCheckbox = ({
  children,
  checked,
  setChecked,
  setTermsModal,
  ...props
}) => {
  const { touched, values, setFieldValue } = useFormikContext();
  const handleCheck = () => {
    // const Formik = this.form;
    if (checked === true) {
      setChecked(false);
      setFieldValue("checkbox", false, true);
    } else if (checked === false) {
      setTermsModal(true);
    }
  };

  return (
    <div>
      <FormControlLabel
        className={
          !values.checkbox && touched.checkbox
            ? "animate__animated animate__shakeX"
            : null
        }
        control={
          <Checkbox
            {...props}
            checked={checked}
            onChange={handleCheck}
            color="primary"
          />
        }
        label={children}
      />
      {!values.checkbox && touched.checkbox ? (
        <div className="error">Requerido</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ children, label, despachador, ...props }) => {
  const dispatch = useDispatch();
  const [field, meta] = useField(props);
  const [value, setValue] = useState("");

  if (props.accion === 1 && field.value !== value) {
    setValue(field.value);
    if (props.elements === 2) {
      if (props.first !== "" && props.second !== "")
        dispatch(despachador(props.first, props.second));
    }
  }
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
    <div>
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
