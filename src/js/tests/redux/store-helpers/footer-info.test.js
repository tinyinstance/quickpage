import {
  addInfoItem,
  editInfoItem,
  deleteInfoItem,
  toggleShowBuildBy,
  otherRefsReducer,
  othersReducer,
  showBuildByReducer
} from '../../../redux/store-helpers/footer-info'

describe('Footer Info Reducers', () => {
  it('should return default state', () => {
    expect(otherRefsReducer(undefined, {})).toEqual([])
    expect(othersReducer(undefined, {})).toEqual({})
    expect(showBuildByReducer(undefined, {})).toEqual(true)
  })

  describe('Footer Info Items', () => {
    let info
    beforeEach(() => {
      info = { id: '1', title: 'Title', content: 'Content' }
    })

    it('should set state for add info item action', () => {
      const action = addInfoItem(...Object.values(info))
      const refsState = otherRefsReducer(undefined, action)
      const state = othersReducer(undefined, action)

      expect(refsState).toEqual([info.id])
      expect(state).toEqual({ [info.id]: info })
    })

    it('should set update for edit info action', () => {
      // const infoEdit = { ...info, content: 'Content updated' }
      const infoEdit = Object.assign({}, info, { content: 'Content updated' })
      const action = editInfoItem(...Object.values(infoEdit))
      const refState = otherRefsReducer([info.id], action)
      const state = othersReducer({ [info.id]: info }, action)

      expect(refState).toEqual([infoEdit.id])
      expect(state).toEqual({ [info.id]: infoEdit })
    })

    it('should update for delete action', () => {
      const action = deleteInfoItem(info.id)
      const refState = otherRefsReducer([info.id], action)
      const state = othersReducer({ [info.id]: info }, action)

      expect(refState).toEqual([])
      expect(state).toEqual({})
    })
  })

  describe('Toggle Built By', () => {
    it('should toggle state', () => {
      const action = toggleShowBuildBy()

      expect(showBuildByReducer(true, action)).toBe(false)
      expect(showBuildByReducer(false, action)).toBe(true)
    })
  })
})
