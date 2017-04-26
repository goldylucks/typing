// @flow

export type Text = {
  title: string,
  body: string,
};

export type State = {
  list: ?Text[],
  byId: {},
}
