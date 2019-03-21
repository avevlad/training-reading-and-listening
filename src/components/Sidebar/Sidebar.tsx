import React from "react";
import * as Styled from './styled';

export interface SidebarProps {}

export function Sidebar(props: SidebarProps) {
  return (
    <Styled.Root {...props}>
      <Styled.Placeholder {...props}/>
      Shift + D -> Toggle theme
    </Styled.Root>
  )
}
