import { useState } from "react";
import {
  CardHeader,
  CardContent,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledCard, AddressBox } from "./styled";
import {
  Request,
  RequestStatus,
  RequestStatusLabels,
} from "../../api/routes/getRequest";
import theme from "../../styles/theme";
import ExpandableText from "../expandedText";
import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";

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
  protocol,
}: Request) => {
  const colorStatus = statusColors[status] || "#9E9E9E";

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (url: string) => {
    setSelectedImage(url);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <StyledCard $secondary={secondary}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        style={{
          width: "100%",
          height: secondary ? 150 : 220,
          borderBottom: "1px solid #eee",
          borderRadius: "4px 4px 0 0",
          overflow: "hidden",
        }}
      >
        {(photos && photos.length > 0
          ? photos
          : [{ url: "https://via.placeholder.com/400x200" }]
        ).map((photo, index) => (
          <SwiperSlide key={index}>
            <img
              src={photo.url}
              alt={`${name} image ${index + 1}`}
              style={{
                width: "100%",
                height: secondary ? 150 : 220,
                objectFit: "cover",
                borderRadius: "4px 4px 0 0",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(photo.url)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

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
          padding: secondary ? "0px" : undefined,
        }}
      >
        <ExpandableText description={description} secondary={secondary} />

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
              display: secondary ? undefined : "flex",
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
          {secondary ? (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "#f0f0f0",
                  color: theme.colors.text.secondary,
                  padding: "6px 12px",
                  borderRadius: "10px",
                  fontWeight: 600,
                  marginTop: "8px",
                  border: "1px solid #ccc",
                }}
              >
                # {protocol}
              </span>
            </Typography>
          ) : null}
        </AddressBox>
      </CardContent>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent sx={{ position: "relative", padding: 0 }}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "white",
              zIndex: 1,
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Imagem ampliada"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </StyledCard>
  );
};

export default InfoCard;
