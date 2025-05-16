import { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListAltIcon from "@mui/icons-material/ListAlt";
import * as S from "./styled";
import FormRequest from "../../components/formRequest";
import Image from "../../assets/semarquivosemfundo.png";
import { useGetRequestsForUserLoggerd } from "../../api/routes/getRequestByUserLogged";
import InfoCard from "../../components/card";

const TabPanel = ({
  children,
  value,
  index,
}: {
  children: React.ReactNode;
  value: number;
  index: number;
}) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box p={2}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const RequestPage = () => {
  const { data, isLoading, error } = useGetRequestsForUserLoggerd();

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <S.RequestContainer>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Tabs com ícones"
        centered
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: {
              xs: 1,
              lg: 20,
            },
          },
        }}
      >
        <Tab
          icon={<AddCircleOutlineIcon />}
          iconPosition="start"
          label="Criar solicitação"
        />
        <Tab
          icon={<ListAltIcon />}
          iconPosition="start"
          label="Minhas solicitações"
        />
      </Tabs>

      <TabPanel value={tabIndex} index={0}>
        <FormRequest />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: "200px", height: "200px" }}
              src={Image}
              alt="Carregando..."
            />
            Carregando...
          </div>
        ) : error || !data?.length ? (
          <div
            style={{
              width: "100%",
              height: "70vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <img
              style={{ width: "200px", height: "200px" }}
              src={Image}
              alt="not archive"
            />
            Nenhuma solicitação
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "2rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {data?.map((item) => (
              <InfoCard
                key={item.id}
                name={item.name}
                state={item.state}
                status={item.status}
                city={item.city}
                description={item.description}
                zipcode={item.zipcode}
                street={item.street}
                photos={item.photos}
                neighborhood={item.neighborhood}
                createdAt={new Date(item.createdAt).toLocaleDateString("pt-BR")}
                secondary={true}
              />
            ))}
          </div>
        )}
      </TabPanel>
    </S.RequestContainer>
  );
};

export default RequestPage;
