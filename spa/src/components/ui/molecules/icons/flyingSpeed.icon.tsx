import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function FlyingSpeedIcon(props: SvgIconProps) {
    return (
      <Tooltip title='Flying Speed'>
        <SvgIcon viewBox='0 0 272.967 272.966' {...props}>
          <g>
            <g>
              <polygon points="253.337,0 70.794,192.994 9.362,128.764"/>
              <polygon points="147.28,272.966 79.306,201.893 263.604,7.041"/>
            </g>
          </g>
        </SvgIcon>
      </Tooltip>
    );
  }