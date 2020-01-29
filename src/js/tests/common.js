import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

export const mockStore = configureStore()

export const mountWithStore = (component, store) => {
  return mount(<Provider store={store}>{component}</Provider>)
}

export const findTestAttr = (wrapper, attr) => {
  const query = '[data-test="' + attr + '"]'
  return wrapper.find(query)
}
