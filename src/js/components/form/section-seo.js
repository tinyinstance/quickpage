import React from 'react'

import CollapsableSection from './collapsable-section'
import { TextInput } from './generic-text-input'
import { TextAreaInput } from './generic-textarea-input'
import {
  setMetaDescription,
  setMetaTitle
} from '../../redux/store-helpers/text-fields'

/**
 * Form SEO section
 */
export const SectionSEO = () => (
  <CollapsableSection id="section-seo-meta" title="SEO">
    <TextInput
      label="Title"
      placeholder="Leave empty to use app name"
      action={setMetaTitle}
      selector={state => state.seo.metaTitle}
    />
    <TextAreaInput
      label="Description"
      placeholder="Will be visible on search results"
      action={setMetaDescription}
      selector={state => state.seo.metaDescription}
    />
  </CollapsableSection>
)
