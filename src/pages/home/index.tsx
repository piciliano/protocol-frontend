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
import { Zoom } from "@mui/material";

export const HomePage = () => {
  const { data: services, isLoading, isError } = useGetRequests();

  if (isLoading) return <p>Carregando solicitações...</p>;
  if (isError || !services) return <p>Erro ao carregar as solicitações.</p>;

  const recentServices = services
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <S.HomeContainer>
      <S.ImageBanner src={IMAGE} alt="atalaia" />
      <S.ContainerTitleAndRequest>
        <S.Title>Solicitações recentes</S.Title>
        <S.Divider />
        <S.RequestContainer>
          {Array.isArray(recentServices) &&
            recentServices.map((service) => (
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
      </S.ContainerTitleAndRequest>
      <Info />
      <About />
      <GeocodeMap
        services={recentServices.map((service) => ({
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
