import { MenuButton } from "."

import type { ComponentStory, ComponentMeta } from "@storybook/react"

export default {
  title: "MenuButton",
  component: MenuButton,
} as ComponentMeta<typeof MenuButton>

const Template: ComponentStory<typeof MenuButton> = (args) => (
  <MenuButton {...args} />
)

export const MenuButtonStory = Template.bind({})

MenuButtonStory.args = {
  children: "foo",
}
