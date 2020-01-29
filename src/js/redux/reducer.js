import { combineReducers } from 'redux'

import {
  nameReducer,
  taglineReducer,
  descriptionReducer,
  footerCopyReducer,
  contactReducer,
  videoURLReducer,
  metaTitleReducer,
  metaDescriptionReducer
} from './store-helpers/text-fields'
import { storeRefsReducer, storesReducer } from './store-helpers/store-links'
import { benefitRefsReducer, benefitsReducer } from './store-helpers/benefits'
import { vanityReducer, vanityRefsReducer } from './store-helpers/vanity'
import {
  othersReducer,
  otherRefsReducer,
  showBuildByReducer
} from './store-helpers/footer-info'
import { socialRefsReducer, socialReducer } from './store-helpers/social'
import { iconReducer } from './store-helpers/app-icon'
import { heroReducer } from './store-helpers/hero'
import {
  drawerReducer,
  collapsedSectionReducer,
  infoDisplayReducer,
  isHomeReducer,
  zipProgressReducer
} from './store-helpers/ui'

/* 
State shape

{
    name: "App Name",   
    icon: {id: imageID, name: imageName}, // null or imageDB data
    tagline: "App tagline lorem ipsum",
    description: "App description lorem ipsum ",
    videoURL: "",
    hero: {id: imageID, name: imageName}, 
    storeRefs: [1, 2, 3, 4],
    benefitRefs: [1, 2, 3],
    footerCopy: "Lorem Ipsum",
    showBuildBy: true, 
    contact: "info@example.com",
    otherRefs: [1, 2, 3], 
    socialRefs: [1, 2, 3], 
    stores: {
        1: { id: 1, storeType: "Apple Store", url: "https://url" },
        2: { id: 2, storeType: "google", url: "https://url" },
        3: { id: 3, storeType: "amazon", url: "https://url" },
        4: { id: 4, storeType: "other", url: "https://url" }
    }
    benefits: {
        1: { id: 1, title: "Lorem", content: "Lorem ipsum", image: { id: imageDB_id1", name:"image_name" }},
        2: { id: 2, title: "Lorem", content: "Lorem ipsum", image: { id: imageDB_id1", name:"image_name" }},
        3: { id: 3, title: "Lorem", content: "Lorem ipsum", image: { id: imageDB_id1", name:"image_name" }},
    },
    others: {
        1: { id: 1, title: "Terms", content: "Lorem ipsum"} ,
        2: { id: 2, title: "Privacy", content: "Lorem ipsum"} ,
        3: { id: 3, title: "Credits", content: "Lorem ipsum"} ,
    },
    socials: {
        1: { id: 1, title: "Twitter", url: "https://url"} ,
        2: { id: 2, title: "Facebook", url: "https://url"} ,
        3: { id: 3, title: "Instagram", url: "https://url"} ,
    }
    seo: {
        metaTitle: "defaults to app name"
        metaDescription: "160 chars lorem ipsum",
    }
    ui: {
        drawer: true/false (open/close), 
        collapsed: [collapsable-section-ids], 
        info: [shown-info-items],
        isHome: true,
        zipInProgress: false,
    }
}

*/

const appReducer = combineReducers({
  name: nameReducer,
  icon: iconReducer,
  tagline: taglineReducer,
  description: descriptionReducer,
  videoURL: videoURLReducer,
  hero: heroReducer,
  storeRefs: storeRefsReducer,
  stores: storesReducer,
  benefitRefs: benefitRefsReducer,
  benefits: benefitsReducer,
  vanityRefs: vanityRefsReducer,
  vanities: vanityReducer,
  footerCopy: footerCopyReducer,
  showBuildBy: showBuildByReducer,
  otherRefs: otherRefsReducer,
  others: othersReducer,
  contact: contactReducer,
  socialRefs: socialRefsReducer,
  socials: socialReducer,
  ui: combineReducers({
    drawer: drawerReducer,
    collapsed: collapsedSectionReducer,
    info: infoDisplayReducer,
    isHome: isHomeReducer,
    zipInProgress: zipProgressReducer
  }),
  seo: combineReducers({
    metaTitle: metaTitleReducer,
    metaDescription: metaDescriptionReducer
  })
})

const rootReducer = (state, action) => {
  if (action.type == 'RESET_FORM') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
