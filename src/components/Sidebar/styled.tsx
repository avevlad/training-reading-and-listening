import { css } from "@emotion/core";
import { SidebarProps } from "./Sidebar";
import styled, { Styles, Theme } from "../../themes/themes";

const sizeStyles: Styles<SidebarProps> = (props) => css`
  background: ${props.theme.background};
`;

export const Root = styled.div<SidebarProps>`
  background: ${({theme}) => (theme as Theme).sidebar.background};
`;

export const Placeholder = styled.div<SidebarProps>`
  width: 200px;
  height: 100px;
  //border: 2px solid green;
  font-size: 28px;
`;


