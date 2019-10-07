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

export const StyledNavBar = style.div`
    overflow: hidden;
    background-color: #333;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
    display: grid;
    grid-template-columns: ${props => {
        var str = "";
        var i;
        for(i = 0; i < props.numOfElements; i++){
			str = str + '1fr '
        }
        console.log(str);
        return str;
    }};
    // background: #8633b694;
    min-height: 4vh;
    opacity: 0.8;
`

export const NavBarItem = style.div`
    display: block;
    color: #f2f2f2;
    padding: 8px 16px;
    text-transform: uppercase;
    text-decoration: underline;
    letter-spacing: 3px;
    :hover {
        background: #ddd;
        color: black;
      }
`;