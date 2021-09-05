import Button, { BUTTON_VARIENTS } from 'components/shared/Button'

export default {
  component: Button,
  title: 'Shared/Button',
  args: {
    label: 'Button',
    onClick: () => alert('clicked')
  }
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  varient: BUTTON_VARIENTS.PRIMARY
}
export const PrimaryDisabled = Template.bind({})
PrimaryDisabled.args = {
  varient: BUTTON_VARIENTS.PRIMARY,
  disabled: true
}

export const Secondary = Template.bind({})
Secondary.args = {
  varient: BUTTON_VARIENTS.SECONDARY
}
export const SecondaryDisabled = Template.bind({})
SecondaryDisabled.args = {
  varient: BUTTON_VARIENTS.SECONDARY,
  disabled: true
}

export const Link = Template.bind({})
Link.args = {
  varient: BUTTON_VARIENTS.LINK
}
export const LinkDisabled = Template.bind({})
LinkDisabled.args = {
  varient: BUTTON_VARIENTS.LINK,
  disabled: true
}
