// Common text field names

const makeType = (action, name) =>
  action.toUpperCase() + '_' + name.toUpperCase()

export const actionType = {
  name: { set: makeType('set', 'name') },
  icon: { set: makeType('set', 'icon') },
  tagline: { set: makeType('set', 'tagline') },
  description: { set: makeType('set', 'description') },
  videoURL: { set: makeType('set', 'video_URL') },
  hero: { set: makeType('set', 'hero') },
  footerCopy: { set: makeType('set', 'footer_copy') },
  contact: { set: makeType('set', 'contact') },
  showBuildBy: { toggle: makeType('toggle', 'showBuildBy') },
  benefit: {
    add: makeType('add', 'benefit'),
    edit: makeType('edit', 'benefit'),
    delete: makeType('delete', 'benefit'),
    reorder: makeType('reorder', 'benefit')
  },
  vanity: {
    add: makeType('add', 'vanity'),
    edit: makeType('edit', 'vanity'),
    delete: makeType('delete', 'vanity'),
    reorder: makeType('reorder', 'vanity')
  },
  storeInfo: {
    add: makeType('add', 'store_info'),
    edit: makeType('edit', 'store_info'),
    delete: makeType('delete', 'store_info'),
    reorder: makeType('reorder', 'store_info')
  },
  other: {
    add: makeType('add', 'other'),
    edit: makeType('edit', 'other'),
    delete: makeType('delete', 'other')
  },
  social: {
    add: makeType('add', 'social'),
    edit: makeType('edit', 'social'),
    delete: makeType('delete', 'social'),
    reorder: makeType('reorder', 'social')
  },
  ui: {
    drawer: {
      toggle: makeType('toggle', 'drawer')
    },
    collapsed: {
      toggle: makeType('toggle', 'collapse')
    },
    info: {
      toggle: makeType('toggle', 'info')
    },
    isHome: {
      toggle: makeType('toggle', 'isHome')
    },
    zip: {
      inProgress: makeType('set', 'inProgress')
    }
  },
  seo: {
    metaTitle: { set: makeType('set', 'metaTitle') },
    metaDescription: { set: makeType('set', 'metaDescription') }
  }
}
