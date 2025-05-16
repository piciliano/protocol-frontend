import { CardHeader, CardMedia, CardContent, Typography } from "@mui/material";
import { StyledCard, AddressBox } from "./styled";
import {
  Request,
  RequestStatus,
  RequestStatusLabels,
} from "../../api/routes/getRequest";

const statusColors: Record<RequestStatus, string> = {
  [RequestStatus.PENDENTE]: "#FF9800",
  [RequestStatus.EM_ANDAMENTO]: "#2196F3",
  [RequestStatus.CONCLUIDO]: "#4CAF50",
  [RequestStatus.CANCELADO]: "#F44336",
};

const InfoCard = ({
  photos,
  name,
  description,
  street,
  city,
  state,
  zipcode,
  status,
  neighborhood,
  createdAt,
  secondary,
}: Request) => {
  const colorStatus = statusColors[status] || "#9E9E9E";

  return (
    <StyledCard $secondary={secondary}>
      <CardMedia
        component="img"
        height={secondary ? "150" : "220"}
        image={photos?.[0]?.url || "https://via.placeholder.com/400x200"}
        alt={`${name} image`}
        sx={{
          objectFit: "cover",
          borderBottom: "1px solid #eee",
        }}
      />
      <CardHeader
        title={name}
        titleTypographyProps={{
          variant: "h5",
          fontWeight: 600,
          color: "#333",
        }}
        sx={{
          paddingBottom: 0,
        }}
      />
      <CardContent
        style={{
          padding: secondary ? "0px" : "",
        }}
      >
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            marginBottom: 2,
            lineHeight: 1.6,
            paddingLeft: secondary ? "1.2rem" : "",
          }}
        >
          {description}
        </Typography>

        <AddressBox $secondary={secondary} statuscolor={colorStatus}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              marginBottom: 1,
              color: "#1976d2",
            }}
          >
            Endereço:
          </Typography>
          <div
            style={{
              display: secondary ? "" : "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
              {neighborhood}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
              {createdAt}
            </Typography>
          </div>

          <Typography variant="body2" sx={{ marginBottom: 0.5 }}>
            {street}
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {city}, {state} - {zipcode}
          </Typography>
          <Typography variant="body2">
            Status:{" "}
            <span
              style={{
                color: "white",
                backgroundColor: colorStatus,
                borderRadius: "12px",
                padding: "4px 12px",
                fontSize: secondary ? "0.5rem" : "0.8rem",
                fontWeight: 500,
                textTransform: "capitalize",
              }}
            >
              {RequestStatusLabels[status]}
            </span>
          </Typography>
        </AddressBox>
      </CardContent>
    </StyledCard>
  );
};

export default InfoCard;
