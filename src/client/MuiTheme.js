import createTheme from "@mui/material/styles/createTheme";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: "Barlow",
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // background: "var(--bg)",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          // Map the new variant to render a <h1> by default
          poster: "h1",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          background: "var(--bg)",
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
          "&::placeholder": {
            color: "var(--input-placeholder)",
          },
        },
        notchedOutline: {
          border: "1px solid var(--border-color)",
          borderRadius: "8px",
        },
      },
    },
  },
  typography: {
    fontFamily: "Quicksand",
    c1: {
      fontSize: 24,
      fontWeight: 700,
      color: "var(--text-color)",
    },
    c3: {
      fontSize: 18,
      fontWeight: 600,
      color: "var(--text-color)",
    },
    c5: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-color)",
    },
    c6: {
      fontSize: 12,
      fontWeight: 300,
      color: "var(--text-color)",
    },
    c7: {
      fontSize: 20,
      fontWeight: 800,
      color: "var(--text-color)",
    },
  },
  palette: {
    custom: {
      main: "#00B074",
      light: "#00B074",
      dark: "#00B074",
      contrastText: "#00B074",
    },
  },
});

export default theme;
