import {
  vanityReducer,
  vanityRefsReducer,
  addVanity,
  deleteVanity,
  editVanity
} from '../../../redux/store-helpers/vanity'

describe('Benefits Reducers', () => {
  it('should return default state', () => {
    const vanityRefsState = vanityRefsReducer(undefined, [])
    expect(vanityRefsState).toEqual([])

    const vanityState = vanityReducer(undefined, {})
    expect(vanityState).toEqual({})
  })

  it('should set state for add action', () => {
    const vanity = {
      id: '1',
      image: { name: 'image1', id: 'imageID1' },
      url: 'some-link'
    }
    const action = addVanity(...Object.values(vanity))

    const vanityState = vanityReducer(undefined, action)
    const expected = { [vanity.id]: vanity }
    expect(vanityState).toEqual(expected)

    const vanityRefsState = vanityRefsReducer(undefined, action)
    expect(vanityRefsState).toEqual([vanity.id])
  })

  it('should update state for edit action', () => {
    const prevBenefit = {
      id: '1',
      image: { name: 'image1', id: 'imageID1' },
      url: 'some-link'
    }
    const prevState = { [prevBenefit.id]: prevBenefit }
    const vanity = {
      id: '1',
      image: { name: 'image1', id: 'imageID1' },
      url: 'some-updated-link'
    }
    const action = editVanity(...Object.values(vanity))

    const vanityState = vanityReducer(prevState, action)
    const expected = { [vanity.id]: vanity }
    expect(vanityState).toEqual(expected)
  })

  it('should delete for delete action', () => {
    const vanity = {
      id: '1',
      image: { name: 'image1', id: 'imageID1' },
      url: 'some-link'
    }
    const state = { [vanity.id]: vanity }
    const action = deleteVanity(vanity.id)

    const vanityState = vanityReducer(state, action)
    expect(vanityState).toEqual({})

    const vanityRefsState = vanityRefsReducer([vanity.id], action)
    expect(vanityRefsState).toEqual([])
  })
})
