import { Card, Grid, Button, Menu, MenuItem, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import langs from "./languages.json";
import TextArea from "./TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  DocSummaryApi,
  useGetTranslateMutation,
} from "../context/api/DocSummaryApi";
import { clearDocSummary } from "../context/reducers/DocSummaryReducer";
import SummarySkeleton from "../components/skeleton";
import AlertToast from "../components/Alert";
const Translator = () => {
  const [language, selectedLanguage] = useState(null);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("hello,\nHow are you");
  const { translateText } = useSelector((state) => state.docsummary);
  const { loading, error } = useSelector((state) => state.loader);

  const dispatch = useDispatch();
  const [getTranslate] = useGetTranslateMutation();
  useEffect(() => {
    setTranslatedText(translateText);
  }, [translateText]);
  const translate = async () => {
    console.log(language, originalText);
    if (language && originalText) {
      dispatch(clearDocSummary());
      const lang = language?.title || "Telugu";
      const { data, error } = await dispatch(
        getTranslate({
          language: lang,
          text: originalText,
          q: new Date().getTime(),
        })
      );
    }
  };

  const errorText = "Something went wrong, please try again";
  return (
    <Grid
      container
      sx={{
        padding: {
          xs: 1,
          sm: 2,
          md: 3,
        },
      }}
    >
      {error && (
        <AlertToast
          open={error}
          message={errorText}
          horizontal={"center"}
          vertical={"bottom"}
          severity="error"
        />
      )}
      <Card sx={{ width: "100%" }}>
        <Grid container sx={{ padding: 1, borderBottom: "1px solid #d7d7d7" }}>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            English
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Lang language={language} selectedLanguage={selectedLanguage} />
          </Grid>
        </Grid>
        <Grid container sx={{}}>
          <Grid
            item
            xs={6}
            sm={6}
            sx={{
              padding: 1,
              textAlign: "left",
              borderRight: "1px solid #d7d7d7",
            }}
          >
            <TextArea
              value={originalText}
              setValue={setOriginalText}
              setTranslatedText={setTranslatedText}
              translatedText={translatedText}
              placeholder="Enter or paste your text and press Translate"
              dir="ltr"
            />
          </Grid>
          <Grid item xs={6} sm={6} sx={{ padding: 1, textAlign: "left" }}>
            <Grid
              container
              sx={{
                minHeight: 400,
                textAlign: language
                  ? language.dir == "ltr"
                    ? "left"
                    : "right"
                  : "left",
              }}
            >
              {loading ? (
                <SummarySkeleton />
              ) : (
                <Grid
                  dangerouslySetInnerHTML={{ __html: translatedText }}
                ></Grid>
              )}
            </Grid>
            {/* <TextArea
                            value={translatedText}
                            disabled
                            setValue={setTranslatedText}
                            direction={language ? language.dir : 'ltr'}
                        /> */}
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "center",
              padding: 1,
              borderRight: "1px solid #d7d7d7",
            }}
          >
            <Grid container sx={{ justifyContent: "space-between" }}>
              <Grid item>
                <Typography variant="c5">
                  {originalText.length + "/" + 3000}
                </Typography>
              </Grid>
              <Grid item>
                <LoadingButton
                  loading={loading}
                  variant="outlined"
                  onClick={translate}
                  color="custom"
                >
                  Translate
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

const s = [12, 6, 4, 3, 2];
const Lang = ({ language, selectedLanguage }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onSelect = (l) => {
    selectedLanguage(l);
    handleClose();
  };
  const cols = Math.floor(langs.length / 10);
  const sx = s[cols];

  return (
    <>
      <Button endIcon={<KeyboardArrowDownIcon />} onClick={handleClick}>
        {language?.title || "Select"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Grid container sx={{ width: (cols + 1) * 100 }}>
          {langs.map((l, i) => {
            return (
              <Grid item xs={sx}>
                <MenuItem
                  key={i}
                  sx={{
                    maxHeight: 35,
                    minHeight: 35,
                    background: language
                      ? language.title == l.title
                        ? "rgba(0, 176, 116, 0.15)"
                        : "white"
                      : "white",
                  }}
                  onClick={() => onSelect(l)}
                >
                  <Typography>{l.title}</Typography>
                </MenuItem>
              </Grid>
            );
          })}
        </Grid>
      </Menu>
    </>
  );
};

export default Translator;
