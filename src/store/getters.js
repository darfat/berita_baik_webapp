const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  image: state => state.user.image,
  name: state => state.user.name,
  roles: state => state.user.roles,
  role: state => state.user.role,
  user_id: state => state.user.user_id,
  email: state => state.user.email
}
export default getters
