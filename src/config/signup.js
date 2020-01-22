export default {
  id: 'signup-page',
  name: 'QuickDash',
  customHeader: null,
  customFooter: null,
  logo: false,
  emojiLogo: () => {
    return '⚡️'
  },
  title: 'Personal Details',
  registrationAccessKey: process.env.registrationAccessKey,
  registrationUrl: `${process.env.apiUrl}/register/email`,
  loginUrl: '/login?welcome=true',
  pages: [
    {
      name: 'personal',
      tag: 'personal',
      fields: [
        {
          id: 'firstName',
          label: 'First Name',
          type: 'text',
          disabled: false,
          name: 'firstName',
          required: true
        },
        {
          id: 'lastName',
          label: 'Last Name',
          type: 'text',
          disabled: false,
          name: 'lastName',
          required: true
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          disabled: false,
          name: 'email',
          required: true
        },
        {
          id: 'mobile',
          label: 'Mobile',
          type: 'phone',
          disabled: false,
          name: 'mobile',
          required: true
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          disabled: false,
          required: true,
          name: 'password',
          confirm: true
        }
      ]
    }
  ]
}
