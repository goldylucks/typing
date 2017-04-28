// @flow

export const calcMinutesDifference = (timestamp1: number, timestamp2: number): number =>
  (timestamp2 - timestamp1) / 1000 / 60

export const calcSecondsDifference = (timestamp1: number, timestamp2: number): number =>
  (timestamp2 - timestamp1) / 1000
