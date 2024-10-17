import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const ErrorMessage = ({ message }: { message?: string }) => {
  const theme = useTheme();

  if (!message) {
    return null;
  }

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      padding={1}
      sx={{ backgroundColor: theme.palette.error.light, borderRadius: 1 }}
    >
      <Typography variant="caption" component="p">
        Error: {message}
      </Typography>
    </Box>
  );
};
