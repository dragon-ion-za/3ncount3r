import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function FireDamageIcon(props: SvgIconProps) {
    return (
      <Tooltip title='Fire Damage'>
        <SvgIcon viewBox='0 0 17 17' {...props}>
          <g >
              <path d="M14.849,9.245 C14.432,8.727 12.3362842,7.14512305 13.1912842,5.02612305 C13.1912842,5.02612305 11.2834804,5.75149982 12.0424804,7.97949982 C11.6914804,7.48349982 8.7239531,6.36254004 9.0019531,0.128540039 C9.0019531,0.128540039 4.09045408,3.08276367 4.09045408,7.18774414 C4.09045408,7.18774414 4.09045408,10.4443359 6.06420896,11.9868164 C6.06420896,11.9868164 3.448,11.557 2.747,7.43 C2.571,7.924 -2.009,12.718 4.487,15.876 L7.97570798,15.9589996 L11.327,15.959 C11.327,15.959 18.699,13.466 14.849,9.245 Z"></path>
          </g>
        </SvgIcon>
      </Tooltip>
    );
  }