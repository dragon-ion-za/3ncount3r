import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function PoisonDamageIcon(props: SvgIconProps) {
    return (
		<Tooltip title='Poison Damage'>
			<SvgIcon viewBox='0 0 32 32' {...props}>
				<path d="M11.714,7l-0.551-3.859C11.077,2.539,11.544,2,12.153,2h7.694c0.609,0,1.076,0.539,0.99,1.141L20.286,7
					H11.714z M26,18v10c0,1.657-1.343,3-3,3H9c-1.657,0-3-1.343-3-3V18c0-2.761,2.239-5,5-5v-2H9c-0.552,0-1-0.448-1-1V9
					c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v1c0,0.552-0.448,1-1,1h-2v2C23.761,13,26,15.239,26,18z M14,21.816V22
					c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-0.184c1.137-0.404,1.006-0.508,1-1.733c-0.008-1.629-1.274-3.029-2.902-3.081
					C14.397,16.947,13,18.31,13,20C13,21.304,12.837,21.403,14,21.816z M17.118,25.5l1.658-0.829C19.023,24.547,19.124,24.247,19,24v0
					c-0.124-0.247-0.424-0.347-0.671-0.224L16,24.941l-2.329-1.165C13.424,23.653,13.124,23.753,13,24v0
					c-0.124,0.247-0.023,0.547,0.224,0.671l1.658,0.829l-1.658,0.829C12.977,26.453,12.876,26.753,13,27v0
					c0.124,0.247,0.424,0.347,0.671,0.224L16,26.059l2.329,1.165C18.576,27.347,18.876,27.247,19,27v0
					c0.124-0.247,0.023-0.547-0.224-0.671L17.118,25.5z M15,21.11V22h2v-0.89c0,0,0.935-0.336,1.008-0.367
					C18.008,20.654,18,20.164,18,20c0-1.103-0.897-2-2-2s-2,0.897-2,2c0,0.164-0.008,0.654-0.008,0.744C14.065,20.775,15,21.11,15,21.11
					z"/>
			</SvgIcon>
		</Tooltip>
    );
  }