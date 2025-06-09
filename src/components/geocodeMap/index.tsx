import { useEffect, useState, useRef } from "react";
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

const CACHE_KEY = "geocodeCache";

const GeocodeMap = ({ services }: GeocodeMapProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const URL = import.meta.env.VITE_API_BASE_URL;

  const cache = useRef<Record<string, Location>>({});

  useEffect(() => {
    const storedCache = localStorage.getItem(CACHE_KEY);
    if (storedCache) {
      try {
        cache.current = JSON.parse(storedCache);
      } catch {
        cache.current = {};
      }
    }
  }, []);

  useEffect(() => {
    if (services.length === 0) {
      setLocations([]);
      return;
    }

    const validAddresses = new Set(
      services.map(
        (s) => `${s.address}, ${s.neighborhood}, Atalaia, Alagoas, Brasil`
      )
    );

    Object.keys(cache.current).forEach((address) => {
      if (!validAddresses.has(address)) {
        delete cache.current[address];
      }
    });

    localStorage.setItem(CACHE_KEY, JSON.stringify(cache.current));

    const fetchCoordinates = async () => {
      const results: Location[] = [];

      for (const service of services) {
        const fullAddress = `${service.address}, ${service.neighborhood}, Atalaia, Alagoas, Brasil`;

        if (cache.current[fullAddress]) {
          const cached = cache.current[fullAddress];
          const updated = {
            ...cached,
            status: service.status,
            title: service.title,
          };
          results.push(updated);
          continue;
        }

        try {
          const res = await fetch(
            `${URL}/geocode?q=${encodeURIComponent(fullAddress)}`
          );

          if (!res.ok) {
            console.error(
              `Erro HTTP ao buscar coordenadas para ${fullAddress}:`,
              res.status
            );
            continue;
          }

          const data = await res.json();

          if (data.lat && data.lng) {
            const location = {
              lat: data.lat,
              lng: data.lng,
              title: service.title,
              status: service.status,
            };

            cache.current[fullAddress] = location;
            results.push(location);

            localStorage.setItem(CACHE_KEY, JSON.stringify(cache.current));
          } else {
            console.warn(`Coordenadas não encontradas para: ${fullAddress}`);
          }
        } catch (err) {
          console.error("Erro ao buscar coordenadas:", err);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setLocations(results);
    };

    fetchCoordinates();
  }, [services, URL]);

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
