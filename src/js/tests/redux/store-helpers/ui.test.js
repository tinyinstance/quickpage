import {
  toggleIsHome,
  toggleDrawer,
  toggleCollapse,
  toggleInfo,
  setZipProgress,
  isHomeReducer,
  drawerReducer,
  collapsedSectionReducer,
  infoDisplayReducer,
  zipProgressReducer
} from '../../../redux/store-helpers/ui'

describe('UI reducers', () => {
  it('should return default state', () => {
    expect(isHomeReducer(undefined, {})).toEqual(true)
    expect(drawerReducer(undefined, {})).toEqual(true)
    expect(collapsedSectionReducer(undefined, {})).toEqual([])
    expect(zipProgressReducer(undefined, {})).toEqual(false)
  })

  it('should toggle home', () => {
    expect(isHomeReducer(true, toggleIsHome())).toEqual(false)
    expect(isHomeReducer(false, toggleIsHome())).toEqual(true)
  })

  it('should toggle form drawer', () => {
    expect(drawerReducer(true, toggleDrawer())).toEqual(false)
    expect(drawerReducer(false, toggleDrawer())).toEqual(true)
  })

  it('should set zip progress', () => {
    expect(zipProgressReducer(undefined, setZipProgress(true))).toEqual(true)
    expect(zipProgressReducer(undefined, setZipProgress(false))).toEqual(false)
  })

  it('should toggle section collapse', () => {
    const sectionId = '1'
    const action = toggleCollapse(sectionId)
    expect(collapsedSectionReducer([sectionId], action)).toEqual([])
    expect(collapsedSectionReducer([], action)).toEqual([sectionId])
  })

  it('should toggle info display', () => {
    const infoId = '1'
    const action = toggleInfo(infoId)
    expect(infoDisplayReducer([infoId], action)).toEqual([])
    expect(infoDisplayReducer([], action)).toEqual([infoId])
  })
})
