import {
  addSocial,
  editSocial,
  deleteSocial,
  socialRefsReducer,
  socialReducer
} from '../../../redux/store-helpers/social'

describe('Social menu items reducer', () => {
  let social
  beforeEach(() => {
    social = { id: '1', title: 'Social', url: 'https://www.example.com' }
  })

  it('should return default state', () => {
    expect(socialRefsReducer(undefined, {})).toEqual([])
    expect(socialReducer(undefined, {})).toEqual({})
  })

  it('should update state for add action', () => {
    const action = addSocial(...Object.values(social))
    const refState = socialRefsReducer(undefined, action)
    const state = socialReducer(undefined, action)

    expect(refState).toEqual([social.id])
    expect(state).toEqual({ [social.id]: social })
  })

  it('should set update for edit info action', () => {
    // const socialEdit = { ...social, title: 'Title updated' }
    const socialEdit = Object.assign({}, social, { title: 'Title updated' })
    const action = editSocial(...Object.values(socialEdit))
    const refState = socialRefsReducer([social.id], action)
    const state = socialReducer({ [social.id]: social }, action)

    expect(refState).toEqual([social.id])
    expect(state).toEqual({ [social.id]: socialEdit })
  })

  it('should update for delete action', () => {
    const action = deleteSocial(social.id)
    const refState = socialRefsReducer([social.id], action)
    const state = socialReducer({ [social.id]: social }, action)

    expect(refState).toEqual([])
    expect(state).toEqual({})
  })
})
