// @flow

export default {
  list: '/texts',
  item: (id: ?string) => `/texts/${id || ':id'}`,
}
