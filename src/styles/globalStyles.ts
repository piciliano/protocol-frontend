import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0; 
    outline: 0; 
  }

  html, body {
    width: 100%;
    height: 100vh;
    font-family: "Comic Relief", system-ui;
    background-color: #f0f0f0;
    color: ${({ theme }) => theme.colors.text.primary};
    scroll-behavior: smooth;
    font-size: 100%; 

    @media screen and (max-width: 1024px) {
      font-size: 93.75%; 
    }

    @media screen and (max-width: 768px) {
      font-size: 87.5%; 
    }

    @media screen and (max-width: 480px) {
      font-size: 81.25%; 
    }
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  ul, ol {
    list-style: none;
  }

  button {
    background: ${({ theme }) => theme.colors.button.primary};
    border: none;
    cursor: pointer;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #FFFF; 
  }

  
  .swiper-pagination-bullet {
  background:rgb(92, 90, 94); 
  opacity: 1;
}

  .swiper-pagination-bullet-active {
  background: #FFFF; 
  opacity: 1;
}



  .floating-icon {
  color: inherit;
  font-size: 28px;
  transform: translate(-14px, -28px);
  animation: floatUpDown 3s ease-in-out infinite;
}

@keyframes floatUpDown {
  0%, 100% {
    transform: translate(-14px, -28px) translateY(0);
  }
  50% {
    transform: translate(-14px, -28px) translateY(-8px);
  }
}


`;

export default GlobalStyles;
