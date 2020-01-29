import {
  heroReducer,
  setHero,
  removeHero
} from '../../../redux/store-helpers/hero'

describe('App Icon Reducer', () => {
  it('should return default state', () => {
    const state = heroReducer(undefined, {})
    expect(state).toBeNull()
  })

  it('should return new state for set action', () => {
    const hero = { id: 'image-id', name: 'image name' }
    const action = setHero(hero.id, hero.name)
    const state = heroReducer(undefined, action)
    expect(state).toEqual(hero)
  })

  it('should return null for remove action', () => {
    const prevState = { id: 'image-id', name: 'image name' }
    const state = heroReducer(prevState, removeHero())
    expect(state).toBeNull()
  })
})
