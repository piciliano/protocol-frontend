import { useState } from "react";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface ExpandableTextProps {
  description: string;
  secondary?: boolean;
}

export default function ExpandableText({
  description,
  secondary,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width:720px)");

  const words = description.split(" ");
  const wordLimit = isLargeScreen ? 3 : 5;
  const shouldTruncate = words.length > wordLimit;
  const shortText = words.slice(0, wordLimit).join(" ");

  return (
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        marginBottom: 2,
        lineHeight: 1.6,
        paddingLeft: secondary ? "1.2rem" : "",
        cursor: shouldTruncate ? "pointer" : "default",
        display: "inline-block",
        fontStyle: "italic",
      }}
      onClick={() => shouldTruncate && setExpanded((prev) => !prev)}
    >
      {expanded || !shouldTruncate ? description : shortText + "... "}
      {shouldTruncate && (
        <span
          style={{
            color: "#8a2be2",
            textDecoration: "underline",
            marginLeft: "0.4rem",
          }}
        >
          {expanded ? "menos" : " mais"}
        </span>
      )}
    </Typography>
  );
}
