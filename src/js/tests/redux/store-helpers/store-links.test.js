import {
  addStoreInfo,
  editStoreInfo,
  deleteStoreInfo,
  storeRefsReducer,
  storesReducer
} from '../../../redux/store-helpers/store-links'

describe('Store links reducer', () => {
  let store
  beforeEach(() => {
    store = { id: '1', storeType: 'Type', url: 'https://www.example.com' }
  })

  it('should return default state', () => {
    expect(storeRefsReducer(undefined, {})).toEqual([])
    expect(storesReducer(undefined, {})).toEqual({})
  })

  it('should update state for add action', () => {
    const action = addStoreInfo(...Object.values(store))
    const refState = storeRefsReducer(undefined, action)
    const state = storesReducer(undefined, action)

    expect(refState).toEqual([store.id])
    expect(state).toEqual({ [store.id]: store })
  })

  it('should set update for edit info action', () => {
    // const storeEdit = { ...store, storeType: 'Type updated' }
    const storeEdit = Object.assign({}, store, { storeType: 'Type updated' })
    const action = editStoreInfo(...Object.values(storeEdit))
    const refState = storeRefsReducer([store.id], action)
    const state = storesReducer({ [store.id]: store }, action)

    expect(refState).toEqual([store.id])
    expect(state).toEqual({ [store.id]: storeEdit })
  })

  it('should update for delete action', () => {
    const action = deleteStoreInfo(store.id)
    const refState = storeRefsReducer([store.id], action)
    const state = storesReducer({ [store.id]: store }, action)

    expect(refState).toEqual([])
    expect(state).toEqual({})
  })
})
