import type { IconProps } from "@chakra-ui/react"

type InternalIconProps = Omit<IconProps, "css">

export type IconComponent = React.FC<InternalIconProps>
