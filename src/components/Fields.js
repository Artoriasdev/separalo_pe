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
    if (
      props.accion === 1 &&
      value !== props.data &&
      props.data !== undefined
    ) {
      setFieldValue(field.name, props.data, true);
      setValue(props.data);
    }
  }, [props.accion, props.data, value, setFieldValue, field.name]);
  return (
    <div>
      <TextField
        label={label}
        variant="outlined"
        // className={
        //   meta.touched && meta.error
        //     ? "animate__animated animate__shakeX"
        //     : null
        // }
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error" style={{ marginBottom: "0.5rem" }}>
          {meta.error}
        </div>
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
    <div style={{ marginBottom: "10px" }}>
      <OutlinedInput
        {...field}
        {...props}
        // className={
        //   meta.touched && meta.error
        //     ? "animate__animated animate__shakeX"
        //     : null
        // }
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
        // className={
        //   !values.checkbox && touched.checkbox
        //     ? "animate__animated animate__shakeX"
        //     : null
        // }
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
        <div className="error">*Este campo es obligatorio</div>
      ) : null}
    </div>
  );
};

export const MySelect = ({ children, label, despachador, ...props }) => {
  const dispatch = useDispatch();
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  const [value, setValue] = useState("a");

  useEffect(() => {
    if (props.accion === 1 && field.value !== value) {
      setValue(field.value);
      if (props.elements === 2) {
        if (props.first !== "" && props.second !== "")
          dispatch(despachador(props.first, props.second));
      } else if (props.elements === 1) {
        if (props.first !== "") dispatch(despachador(props.first));
      }
    } else if (props.accion === 2 && field.value !== value) {
      setValue(field.value);

      if (props.elements === 2) {
        if (props.first !== "" && props.second !== "")
          dispatch(despachador(props.first, props.second));
      } else if (props.elements === 1) {
        if (props.first !== "") dispatch(despachador(props.first));
      }
    }
  }, [
    props.accion,
    field.value,
    props.elements,
    props.first,
    props.second,
    setFieldValue,
    dispatch,
    despachador,
    field.name,
    props.data,
    value,
  ]);

  useEffect(() => {
    if (field.value !== props.data && props.data !== undefined) {
      setFieldValue(field.name, props.data, true);
    }
  }, [props.data]);

  return (
    <div>
      <Select
        fullWidth
        variant="outlined"
        displayEmpty
        {...field}
        {...props}
        // className={
        //   meta.touched && meta.error
        //     ? "animate__animated animate__shakeX"
        //     : null
        // }
      >
        {children}
      </Select>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const MyDocumentSelect = ({
  children,
  label,
  accion,
  MaxValueSet,
  MinValueSet,
  ...props
}) => {
  const dispatch = useDispatch();
  const { documentsList } = useSelector((state) => state.documents);
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);

  useEffect(() => {
    if (accion === 1) {
      let maxLengthInput;
      let minLengthInput;
      let valor = "[0-9]";
      const id = documentsList.find((arreglo) => arreglo.id === field.value);
      if (id !== undefined) {
        maxLengthInput = id.maxLength;
        minLengthInput = id.minLength;
      }

      if (field.value === "04" || field.value === "07") {
        valor = "";
      } else {
        valor = "[0-9]";
      }
      MaxValueSet(maxLengthInput);
      MinValueSet(minLengthInput);
      setFieldValue("ingreso", valor, true);
    }
  }, [
    accion,
    dispatch,
    documentsList,
    field.name,
    field.value,
    props.data,
    setFieldValue,
    MaxValueSet,
    MinValueSet,
  ]);

  useEffect(() => {
    if (field.value !== props.data) {
      setFieldValue(field.name, props.data, true);
    }
  }, [props.data]);

  return (
    <div>
      <Select
        fullWidth
        variant="outlined"
        displayEmpty
        {...field}
        {...props}
        // className={
        //   meta.touched && meta.error
        //     ? "animate__animated animate__shakeX"
        //     : null
        // }
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
    <div className="autocomplete-container">
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
        style={{ maxWidth: "216px" }}
      />
      {business && (
        <Paper className="autocomplete">
          {business.map(({ id, tradeName, idCategory }) => (
            <MenuItem
              // className="animate__animated animate__slideInUp"
              onClick={(e) => {
                handleRedirectBusiness(id, idCategory);
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
