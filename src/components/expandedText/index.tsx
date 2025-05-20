import { useState } from "react";
import Typography from "@mui/material/Typography";

interface ExpandableTextProps {
  description: string;
  secondary?: boolean;
}

export default function ExpandableText({
  description,
  secondary,
}: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false);

  const words = description.split(" ");
  const shouldTruncate = words.length > 5;
  const shortText = words.slice(0, 5).join(" ");

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
