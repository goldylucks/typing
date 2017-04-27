// @flow

export type Text = {
  title: string,
  body: string,
  _id: string,
}

export type State = {
  list: ?Text[],
  byId: {},
}
