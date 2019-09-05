export default {
  name: 'QuickDash',
  logo: false,
  emojiLogo: () => {
    return '⚡️'
  },
  title: 'Personal Details',
  registrationAccessKey: process.env.registrationAccessKey,
  registrationUrl: `${process.env.apiUrl}/register/email`,
  loginUrl: '/login',
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
          required: true
        },
        {
          id: 'lastName',
          label: 'Last Name',
          type: 'text',
          disabled: false,
          required: true
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          disabled: false,
          required: true
        },
        {
          id: 'mobile',
          label: 'Mobile',
          type: 'phone',
          disabled: false,
          required: true
        },
        {
          id: 'password',
          label: 'Password',
          type: 'password',
          disabled: false,
          required: true,
          confirm: true
        }
      ]
    }
  ]
}
