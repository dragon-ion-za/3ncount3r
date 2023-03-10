import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function LightningDamageIcon(props: SvgIconProps) {
    return (
      <Tooltip title='Lightning Damage'>
        <SvgIcon viewBox='0 0 36 36' {...props}>
          <path d="M30.8,2.29A.49.49,0,0,0,30.35,2H16.42a.5.5,0,0,0-.42.23l-10.71,17A.49.49,0,0,0,5.7,20h7.67L6.6,33.25a.52.52,0,0,0,.46.75h3a.5.5,0,0,0,.37-.16L28,14.85a.5.5,0,0,0-.37-.85H20.89L30.72,2.82A.49.49,0,0,0,30.8,2.29Z"></path>
        </SvgIcon>
      </Tooltip>
    );
  }