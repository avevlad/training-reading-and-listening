import styled, { Theme } from "../../themes/themes";

export const App = styled.div<{}>`
  width: 100vw;
  height: 100%;
  position: relative;
  display: flex;
  flex: 1 1 0;
  background: ${({theme}) => (theme as Theme).background};
  cursor: text;
  overflow: hidden;
`;

export const PageContainer = styled.div<{}>`
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  z-index: 1;
  height: 100vh;
  max-height: 100%;
  overflow: auto;
`;
