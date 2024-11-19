import { Card, Grid, Slider, Typography, Button } from "@mui/material";
import GroupButton from "../components/GroupButton";
import { useEffect, useState } from "react";
import TextArea from "./TextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  DocSummaryApi,
  useGetDocSummaryMutation,
} from "../context/api/DocSummaryApi";
import HiddenInput from "../components/HiddenInput";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { extractText, getDocumentProxy } from "unpdf";
import { Buffer } from "buffer";
import { clearDocSummary } from "../context/reducers/DocSummaryReducer";
import LoadingButton from "@mui/lab/LoadingButton";
import SummarySkeleton from "../components/skeleton";
import AlertToast from "../components/Alert";

const buttons = ["Paragraph", "Bullet points"];
const Summarize = () => {
  const [selectedMode, setSelectedMode] = useState(0);
  const [words, setWords] = useState(100);
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const { summaryText } = useSelector((state) => state.docsummary);
  const { loading, error } = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [getDocSummary] = useGetDocSummaryMutation();

  useEffect(() => {
    let text = summaryText.replaceAll("\n", "\n<br/>");
    setTranslatedText(text);
  }, [summaryText]);
  const handleWordsChange = (e) => {
    console.log(e.target.value);
    setWords(e.target.value);
  };
  const valuetext = (value) => {
    return `${value} words`;
  };
  const summarizeText = async () => {
    if (originalText) {
      dispatch(clearDocSummary());
      const { data, error } = await dispatch(
        getDocSummary({
          mode: buttons[selectedMode],
          words,
          text: originalText,
          q: new Date().getTime(),
        })
      );
    }
  };
  const extractTextFromPDF = async (file, mergePages = true) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const pdf = await getDocumentProxy(new Uint8Array(buffer));

      const { text } = await extractText(pdf, { mergePages });
      console.log("PDF TEXT ==", String(text));
      setOriginalText(text);
      // return summarizeHandleChange(null, String(text));
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    extractTextFromPDF(file);
  };

  const originalTextLength = originalText.trim().split(" ").length;
  const errorText = "Something went wrong, please try again.";
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
        <Grid container sx={{ gap: 2, borderBottom: "1px solid #d7d7d7" }}>
          <Grid item>
            <Grid container sx={{ padding: 1, gap: 1, alignItems: "center" }}>
              Modes:
              <GroupButton
                buttons={buttons}
                selected={selectedMode}
                onClick={setSelectedMode}
              />
            </Grid>
          </Grid>
          <Grid item sx={{ display: "flex", alignItems: "center" }}>
            <Grid container sx={{ padding: 1, gap: 3, alignItems: "center" }}>
              Summary Length:
              <Slider
                aria-label="Temperature"
                defaultValue={100}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                shiftStep={5}
                step={100}
                marks
                min={100}
                max={500}
                // value={words}
                onChange={handleWordsChange}
                sx={{
                  width: 200,
                  "& .MuiSlider-valueLabel": {
                    fontSize: 12,
                    fontWeight: "normal",
                    top: 6,
                    backgroundColor: "unset",
                    color: "red",
                    "&::before": {
                      display: "none",
                    },
                    "& *": {
                      background: "transparent",
                      color: "#000",
                    },
                  },
                }}
              />
            </Grid>
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
              placeholder="Enter or paste your text and press Summarise"
              dir="ltr"
            />
          </Grid>
          <Grid item xs={6} sm={6} sx={{ padding: 1, textAlign: "left" }}>
            {/* <TextArea
                            value={translatedText}
                            setValue={setTranslatedText}
                            direction={'ltr'}
                            disabled
                        /> */}
            <Grid
              container
              sx={{ minHeight: 400, height: 400, overflow: "auto" }}
            >
              {loading ? (
                <SummarySkeleton />
              ) : (
                <Grid
                  dangerouslySetInnerHTML={{ __html: translatedText }}
                ></Grid>
              )}
            </Grid>
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
              <Grid item style={{ display: "flex", alignItems: "end" }}>
                {originalText ? (
                  <Typography variant="c5">
                    {originalTextLength +
                      ` word${originalTextLength > 1 ? "s" : ""}`}
                  </Typography>
                ) : (
                  <Button
                    component="label"
                    role={undefined}
                    variant="text"
                    color="custom"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file (PDF)
                    <HiddenInput type="file" onChange={handleFileUpload} />
                  </Button>
                )}
              </Grid>
              <Grid item>
                <LoadingButton
                  loading={loading}
                  variant="outlined"
                  onClick={summarizeText}
                  color="custom"
                >
                  Summarise
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Summarize;
