import * as S from "./styled";
import Photo from "../../assets/maosremovebg.png";
import Description from "../../assets/descreverremove.png";
import Loc from "../../assets/localizacaoremove.png";
import Solution from "../../assets/acceptedremove.png";

const Info = () => {
  return (
    <S.InfoContainer>
      <S.Title>Como funciona?</S.Title>
      <S.StepsContainer>
        <S.StepItem>
          <S.ImageContainer>
            <S.Image src={Photo} alt="Tirar foto" />
          </S.ImageContainer>
          <S.ContentText>Primeiro, tire uma foto</S.ContentText>
          <S.StepNumber>1</S.StepNumber>
        </S.StepItem>

        <S.StepItem>
          <S.ImageContainer>
            <S.Image src={Description} alt="Descrever problema" />
          </S.ImageContainer>
          <S.ContentText>Descreva o problema</S.ContentText>
          <S.StepNumber>2</S.StepNumber>
        </S.StepItem>

        <S.StepItem>
          <S.ImageContainer>
            <S.Image src={Loc} alt="Enviar localização" />
          </S.ImageContainer>
          <S.ContentText>Envie a localização</S.ContentText>
          <S.StepNumber>3</S.StepNumber>
        </S.StepItem>

        <S.StepItem>
          <S.ImageContainer>
            <S.Image src={Solution} alt="Aguardar solução" />
          </S.ImageContainer>
          <S.ContentText>Pronto, aguarde a solução</S.ContentText>
          <S.StepNumber>4</S.StepNumber>
        </S.StepItem>
      </S.StepsContainer>
    </S.InfoContainer>
  );
};

export default Info;
