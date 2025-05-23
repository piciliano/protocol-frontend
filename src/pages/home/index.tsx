import * as S from "./styled";
import InfoCard from "../../components/card";
import IMAGE from "../../assets/mapa.jpg";
import Info from "../../components/info";
import About from "../../components/about";
import GeocodeMap from "../../components/geocodeMap";
import {
  RequestStatusLabels,
  useGetRequests,
} from "../../api/routes/getRequest";
import { Zoom, CircularProgress, Box } from "@mui/material";
import { useState } from "react";

export const HomePage = () => {
  const { data: services, isLoading, isError } = useGetRequests();
  const [showAll, setShowAll] = useState(false);

  if (isLoading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  if (isError || !services) return <p>Erro ao carregar as solicitações.</p>;

  const sortedServices = services.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const displayedServices = showAll
    ? sortedServices
    : sortedServices.slice(0, 3);

  return (
    <S.HomeContainer>
      <S.ImageBanner src={IMAGE} alt="atalaia" />
      <S.ContainerTitleAndRequest>
        <S.Title>Solicitações recentes</S.Title>
        <S.Divider />
        <S.RequestContainer>
          {displayedServices.map((service) => (
            <Zoom in={true} timeout={1000} key={service.id}>
              <div>
                <InfoCard
                  photos={service.photos}
                  name={service.name}
                  description={service.description}
                  street={service.street}
                  city={service.city}
                  state={service.state}
                  neighborhood={service.neighborhood}
                  zipcode={service.zipcode}
                  status={service.status}
                  createdAt={new Date(service.createdAt).toLocaleDateString(
                    "pt-BR"
                  )}
                />
              </div>
            </Zoom>
          ))}
        </S.RequestContainer>
        <S.ToggleButton onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Ver menos" : "Ver todas"}
        </S.ToggleButton>
      </S.ContainerTitleAndRequest>
      <Info />
      <About />
      <GeocodeMap
        services={displayedServices.map((service) => ({
          title: service.name,
          address: service.street,
          neighborhood: service.neighborhood,
          status: RequestStatusLabels[service.status].toLowerCase() as
            | "pendente"
            | "em andamento"
            | "concluído"
            | "cancelado",
        }))}
      />
    </S.HomeContainer>
  );
};
