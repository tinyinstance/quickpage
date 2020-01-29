import {
  benefitRefsReducer,
  benefitsReducer,
  addBenefit,
  editBenefit,
  deleteBenefit
} from '../../../redux/store-helpers/benefits'

describe('Benefits Reducers', () => {
  it('should return default state', () => {
    const benefitsRefsState = benefitRefsReducer(undefined, [])
    expect(benefitsRefsState).toEqual([])

    const benefitsState = benefitsReducer(undefined, {})
    expect(benefitsState).toEqual({})
  })

  it('should set state for add action', () => {
    const benefit = {
      id: '1',
      title: 'Title',
      content: 'Content',
      position: 'left',
      image: { name: 'image1', id: 'imageID1' }
    }
    const action = addBenefit(...Object.values(benefit))

    const benefitsState = benefitsReducer(undefined, action)
    const expected = { [benefit.id]: benefit }
    expect(benefitsState).toEqual(expected)

    const benefitRefsState = benefitRefsReducer(undefined, action)
    expect(benefitRefsState).toEqual([benefit.id])
  })

  it('should update state for edit action', () => {
    const prevBenefit = {
      id: '1',
      title: 'Title',
      content: 'Content Before',
      position: 'left',
      image: { name: 'image1', id: 'imageID1' }
    }
    const prevState = { [prevBenefit.id]: prevBenefit }
    const benefit = {
      id: '1',
      title: 'Title',
      content: 'Content After',
      position: 'left',
      image: { name: 'image1', id: 'imageID1' }
    }
    const action = editBenefit(...Object.values(benefit))

    const benefitsState = benefitsReducer(prevState, action)
    const expected = { [benefit.id]: benefit }
    expect(benefitsState).toEqual(expected)
  })

  it('should delete for delete action', () => {
    const benefit = {
      id: '1',
      title: 'Title',
      content: 'Content',
      position: 'left',
      image: { name: 'image1', id: 'imageID1' }
    }
    const state = { [benefit.id]: benefit }
    const action = deleteBenefit(benefit.id)

    const benefitsState = benefitsReducer(state, action)
    expect(benefitsState).toEqual({})

    const benefitRefsState = benefitRefsReducer([benefit.id], action)
    expect(benefitRefsState).toEqual([])
  })
})
