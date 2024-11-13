// context/SnackbarContext.tsx

"use client";

import React, { createContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarContextProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  showSnackbar: (
    message: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
  hideSnackbar: () => void;
}

export const SnackbarContext = createContext<SnackbarContextProps>({
  open: false,
  message: "",
  severity: "success",
  showSnackbar: () => {},
  hideSnackbar: () => {},
});

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  const showSnackbar = (
    msg: string,
    sev: "success" | "error" | "info" | "warning"
  ) => {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  };

  const hideSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ open, message, severity, showSnackbar, hideSnackbar }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={hideSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={hideSnackbar} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
