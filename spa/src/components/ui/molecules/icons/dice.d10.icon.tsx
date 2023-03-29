import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function DiceD10Icon(props: SvgIconProps) {
    return (
      <Tooltip title='D10'>
        <SvgIcon viewBox='0 0 24 24' {...props}>
          <path fill="#000000" d="M10.5 16H9v-5.79l-1.78.55V9.53l3.14-1.12h.14V16m3.57-7.79c1.43 0 2.57 1.15 2.57 2.57v2.64c0 1.42-1.14 2.58-2.57 2.58s-2.57-1.16-2.57-2.58v-2.64a2.57 2.57 0 0 1 2.57-2.57m-.01 1.44c-.59 0-1.06.48-1.06 1.06v2.79c0 .57.47 1.04 1.06 1.04c.58 0 1.08-.48 1.08-1.04v-2.79c0-.59-.5-1.06-1.08-1.06M12 2c-.5 0-1 .19-1.41.59l-8 8c-.79.78-.79 2.04 0 2.82l8 8c.78.79 2.04.79 2.82 0l8-8c.79-.78.79-2.04 0-2.82l-8-8C13 2.19 12.5 2 12 2m0 2l8 8l-8 8l-8-8Z"></path>
        </SvgIcon>
      </Tooltip>
    );
  }