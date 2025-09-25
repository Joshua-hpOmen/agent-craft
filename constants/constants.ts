export const APPOINTMENT_TIME_SLOTS: {slot: string}[] = [
  {
    slot: '3:30pm',
  },
  {
    slot: '4:00pm',
  },
  {
    slot: '4:30pm',
  },
  {
    slot: '5:00pm',
  },
  {
    slot: '5:30pm',
  },
  {
    slot: '6:00pm',
  },
]

type IntegrationsListItemProps = {
  id: string
  name: 'stripe'
  logo: string
  description: string
  title: string
  modalDescription: string
}

export const INTEGRATION_LIST_ITEMS: IntegrationsListItemProps[] = [
  {
    id: '1',
    name: 'stripe',
    description:
      'Stripe is the fastest and easiest way to integrate payments and financial services into your software platform or marketplace.',
    logo: '56e34d47-a8e3-4468-b23a-125987b61a44',
    title: 'Connect Stripe Account',
    modalDescription:
      'The world’s most successful platforms and marketplaces including Shopify and DoorDash, use Stripe Connect.',
  },
]
