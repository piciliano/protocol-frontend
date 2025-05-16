import { useEffect, useState } from "react";
import MapView from "../mapView";
import * as S from "./styled";

type Service = {
  title: string;
  address: string;
  neighborhood: string;
  status: "pendente" | "em andamento" | "concluído" | "cancelado";
};

type Location = {
  lat: number;
  lng: number;
  title: string;
  status: "pendente" | "em andamento" | "concluído" | "cancelado";
};

type GeocodeMapProps = {
  services: Service[];
};

const GeocodeMap = ({ services }: GeocodeMapProps) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchCoordinates = async () => {
      const results: Location[] = [];

      for (const service of services) {
        const fullAddress = `${service.address}, ${service.neighborhood}, Atalaia, Alagoas, Brasil`;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              fullAddress
            )}&format=json`
          );
          const data = await res.json();

          if (data[0]) {
            results.push({
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
              title: service.title,
              status: service.status,
            });
          }
        } catch (err) {
          console.error("Erro ao buscar coordenadas:", err);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setLocations(results);
    };

    fetchCoordinates();
  }, [services]);

  return (
    <S.MapContainer>
      <S.ContainerColor>
        <S.Title>Acompanhe as solicitações Recentes</S.Title>
        <S.Divider />
      </S.ContainerColor>

      <MapView locations={locations} />
    </S.MapContainer>
  );
};

export default GeocodeMap;
