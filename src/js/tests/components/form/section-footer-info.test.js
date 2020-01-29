import React from 'react'

import { actionType } from '../../../redux/action-types'
import { BuildWithDisplay } from '../../../components/form/section-footer-info'
import { mountWithStore, mockStore, findTestAttr } from '../../common'

jest.mock('pouchdb')
jest.mock('../../../components/common/hooks')
jest.mock('../../../pouchDB/imageDB')

afterEach(() => {
  jest.resetAllMocks()
})

describe('<SectionFooterInfo />', () => {
  describe('<BuildWithDisplay />', () => {
    const toggleActionType = actionType.showBuildBy.toggle

    it('should show and work', () => {
      const store = mockStore({
        showBuildBy: true
      })

      const wrapper = mountWithStore(<BuildWithDisplay />, store)

      expect(findTestAttr(wrapper, 'showing').length).toBe(1)
      const button = wrapper.find('button')
      expect(button.length).toBe(1)
      button.simulate('click')
      const actions = store.getActions()
      expect(actions[0].type).toEqual(toggleActionType)
    })

    it('should hide and work', () => {
      const store = mockStore({
        showBuildBy: false
      })

      const wrapper = mountWithStore(<BuildWithDisplay />, store)

      expect(findTestAttr(wrapper, 'hiding').length).toBe(1)
      const button = wrapper.find('button')
      expect(button.length).toBe(1)
      button.simulate('click')
      const actions = store.getActions()
      expect(actions[0].type).toEqual(toggleActionType)
    })
  })
})
