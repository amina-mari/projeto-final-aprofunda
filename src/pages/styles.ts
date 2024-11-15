import styled from "styled-components";
import finance from '../assets/finance.png';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
  background-color: #fae3fa; 
`;

export const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  text-align: center;
  margin-top: 20px;
`;


export const ImageContainer = styled.div`
background-image: url(${finance});
background-size: cover;
margin-bottom: 50px;
width: 200px;
height: 200px;
`;
