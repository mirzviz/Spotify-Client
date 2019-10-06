import style from 'styled-components';


export const StyledImg = style.img`
border-radius: 30%;
width: 200px;
`;

export const StyledButton = style.button`
  background: ${props => props.primary ? "#740abf" : "white"};
  color: ${props => props.primary ? "white" : "#740abf"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #740abf;
  border-radius: 3px;
`;