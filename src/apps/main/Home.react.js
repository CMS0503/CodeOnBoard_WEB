// @flow

import * as React from "react";
import "../../../node_modules/tabler-react/dist/Tabler.css"
import {  GalleryCard, Dropdown } from "tabler-react";

import SiteWrapper from "./SiteWrapper.react";
// import HomeImg from '../images/Home.jpeg'
// import HomeImg from '/images/Home.jpeg'
import './Home.css'

function Home() {
  return (
    <SiteWrapper>
      <GalleryCard className="HomeImage">
        <GalleryCard.Image
          className='mb-0'
          src='assets/images/Home.jpeg'
        />
      </GalleryCard>
    </SiteWrapper>
  );
}

export default Home;
