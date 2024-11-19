import { Button, ButtonGroup, Grid } from "@mui/material";

const GroupButton = ({ buttons, selected, onClick }) => {
  return (
    <ButtonGroup color="custom">
      {buttons.map((button, index) => {
        return (
          <Button
            sx={{
              background:
                selected == index ? "rgba(0, 176, 116, 0.15)" : "white",
            }}
            onClick={() => onClick(index)}
          >
            {button}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

export default GroupButton;
