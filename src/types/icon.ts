import type { IconProps } from "@chakra-ui/react"
import React from "react"

type InternalIconProps = Omit<IconProps, "css">

export type IconComponent = React.VFC<InternalIconProps>
