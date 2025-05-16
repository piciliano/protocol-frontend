import * as S from "./styled";

const About = () => {
  return (
    <S.AboutContainer id="about">
      <S.ContentWrapper>
        <S.Title>Cuidando de Atalaia com você</S.Title>
        <S.Divider />
        <S.Description>
          Este é o canal oficial da Prefeitura de Atalaia para que você possa
          participar ativamente do cuidado com a nossa cidade. Por aqui, é
          possível registrar solicitações como buracos nas ruas, iluminação
          pública com defeito, entulho em locais indevidos e outros serviços
          essenciais para o bem-estar da população. A plataforma foi criada com
          base no nosso compromisso com uma gestão
          <S.Highlight> afetiva, eficiente e transparente</S.Highlight>,
          conectando você diretamente com a administração municipal e tornando o
          atendimento mais rápido, prático e acessível. Com a sua colaboração,
          seguimos construindo uma Atalaia melhor para todos.
        </S.Description>
        <S.CityImage />
      </S.ContentWrapper>
    </S.AboutContainer>
  );
};

export default About;
