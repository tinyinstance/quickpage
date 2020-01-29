import React from 'react'
import { useSelector } from 'react-redux'

import { SectionBasicInfo } from './form/section-basic-info'
import { SectionDownloadLinks } from './form/section-download-links'
import { SectionVanityLinks } from './form/section-vanity-links'
import { SectionBenefits } from './form/section-benefits'
import { SectionFooterInfo } from './form/section-footer-info'
import { SectionFooterMenuInfoItems } from './form/section-footer-menu-info'
import { SectionFooterMenuSocialLinks } from './form/section-footer-menu-social'
import { SectionSEO } from './form/section-seo'
import { FormActions } from './form/form-actions'

const BuilderForm = () => {
  const drawerIsOpen = useSelector(state => state.ui.drawer)

  const className = () => {
    if (drawerIsOpen) return 'builder-form open'
    return 'builder-form close'
  }

  return (
    <div id="builder-form" className={className()}>
      <SectionBasicInfo />
      <SectionDownloadLinks />
      <SectionVanityLinks />
      <SectionBenefits />
      <SectionFooterInfo />
      <SectionFooterMenuInfoItems />
      <SectionFooterMenuSocialLinks />
      <SectionSEO />
      <FormActions />
    </div>
  )
}

export default BuilderForm
