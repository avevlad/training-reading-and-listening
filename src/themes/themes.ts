import deepmerge from "deepmerge";
import { SerializedStyles } from "@emotion/core";
import styled, { CreateStyled } from '@emotion/styled';
import { Colors } from '@blueprintjs/core';

export interface Theme {
  sidebar: {
    background: string
  }
  background: string
}

export interface Styles<P = {}> {
  (props: P & { theme: Theme }): SerializedStyles;
}

export const defaultTheme = {
  sidebar: {
    background: Colors.LIGHT_GRAY4
  },
  background: Colors.LIGHT_GRAY5,
};

export const darkTheme = deepmerge(defaultTheme, <Theme>{
  sidebar: {
    background: Colors.DARK_GRAY5
  },
  background: Colors.DARK_GRAY4,
});

export default styled as CreateStyled<Theme>;
