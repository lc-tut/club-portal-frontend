import type { ComponentMeta, ComponentStory } from "@storybook/react"

import { MenuButton } from "."

export default {
  title: "Club Portal/Button/MenuButton",
  component: MenuButton,
  argTypes: {
    mbtype: {
      options: ["main", "sub"],
      control: { type: "radio" },
    },
    height: {
      control: { type: "text" },
    },
    children: {
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof MenuButton>

const Template: ComponentStory<typeof MenuButton> = (args) => (
  <MenuButton {...args} />
)

export const Default = Template.bind({})

Default.args = {
  mbtype: "main",
  children: "foo",
}
