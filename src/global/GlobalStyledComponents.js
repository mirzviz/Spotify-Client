import styled, {css} from 'styled-components';
import { colors } from './helperFunctions';

export const StyledImg = styled.img`
border-radius: 50%;
width: 200px;
height: 200px;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

export const StyledButton = styled.button`
  background: ${props => props.primary ? "#740abf" : "white"};
  color: ${props => props.primary ? "white" : "#740abf"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #740abf;
  border-radius: 3px;
`;


export const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

