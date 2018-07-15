import React from "react"
import _ from "lodash"

import { _1 } from "./Steps/_1"
import _2 from "./Steps/_2"
import _3 from "./Steps/_3"
import _4 from "./Steps/_4"

const components = [ _1, _2, _3, _4 ]

export const Steps = _(components).reduce((acc, Component, key) => {
  acc[key] = props => <Component {...props} />
  return acc
}, {})