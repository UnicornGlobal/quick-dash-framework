export default {
  profile: true,
  name: true,
  logo: false,
  mobileLogo: true,
  avatar: true,
  logout: false,
  role: (user) => {
    // Perform some custom code to populate the main role
    // This is compatible with the strong-lumen style
    return user.roles[1].name
  }
}
