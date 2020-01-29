import React from 'react'

import CollapsableSection from './collapsable-section'
import { TextInput } from './generic-text-input'
import { TextAreaInput } from './generic-textarea-input'
import { ImageInput } from './generic-image-picker'
import {
  setName,
  setTagline,
  setDescription,
  setVideoURL
} from '../../redux/store-helpers/text-fields'
import { setIcon, removeIcon } from '../../redux/store-helpers/app-icon'
import { setHero, removeHero } from '../../redux/store-helpers/hero'

/**
 * Form basic info section
 */
const iconSelector = state => state.icon
const heroSelector = state => state.hero
export const SectionBasicInfo = () => (
  <CollapsableSection id="section-basic-information" title="Basic information">
    <ImageInput
      selector={iconSelector}
      label="App Icon"
      setAction={setIcon}
      removeAction={removeIcon}
    />
    <TextInput
      label="Name"
      placeholder="Name of your app"
      action={setName}
      selector={state => state.name}
    />
    <TextInput
      label="Tagline"
      placeholder="Tagline for your app"
      action={setTagline}
      selector={state => state.tagline}
    />
    <TextAreaInput
      label="Description"
      placeholder="Description for your app (can be markdown)"
      action={setDescription}
      selector={state => state.description}
    />
    <ImageInput
      selector={heroSelector}
      label="Hero Image"
      setAction={setHero}
      removeAction={removeHero}
    />
    <TextAreaInput
      label="Video Embed"
      placeholder="Your video embed code if exists e.g <iframe>...</iframe>"
      action={setVideoURL}
      selector={state => state.videoURL}
    />
  </CollapsableSection>
)
