import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
const TextArea = ({ value, setValue, direction, setTranslatedText, translatedText, ...props }) => {
    const height = value ? 400 : 30;
    const onPaste = async (e) => {
        // let paste = (e.clipboardData || window.clipboardData)?.getData("Text");
        const text = await navigator.clipboard.readText();
        setValue(text);
        // console.log(paste, text)
    }

    const handleClearClick = () => {
        setTranslatedText('')
        setValue('');
    }

    const onHandleChange = (e) => {
        setValue(e.target.value)
        setTranslatedText(e.target.value.length > 0 ? translatedText : '')
    }
    return (
        <>
            <TextField
                className="noborder"
                multiline
                value={value}
                onChange={(e) => onHandleChange(e)}
                {...props}
                InputProps = {{
                    endAdornment: (
                    <IconButton
                      sx={{ visibility: value ? "visible" : "hidden", marginBottom: value ? '55%' : 0 }}
                      onClick={handleClearClick}
                    >
                      <ClearRoundedIcon />
                    </IconButton>
                        ),
                      }}
                sx={{
                    width: '100%',
                    // height: '100%',
                    padding: 0,
                    borderRadius: 0,
                    '& .MuiOutlinedInput-input': {
                        border: 'none',
                        minHeight: height,
                        maxHeight: height,
                        overflow: 'auto !important',
                        textAlign: direction == 'rtl' ? 'right' : 'left',
                    },
                    '& .MuiOutlinedInput-root': {
                        padding: 0
                    },
                    '& fieldset': {
                        border: 'none',
                    }
                }}
            />
            {
                !value &&
                <Grid container sx={{ height: 370, justifyContent: 'center', alignItems: 'center' }}>
                    <Button
                        onClick={onPaste}
                        sx={{ gap: 1, width: 120, height: 90, border: '1px solid #00B074', borderRadius: '10px', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <ContentPasteIcon sx={{ width: 30, color: '#00B074' }} />
                        <Typography sx={{ fontSize: 14, color: '#00B074' }}>Paste Text</Typography>

                    </Button>

                </Grid>

            }
        </>
    )

}

export default TextArea;