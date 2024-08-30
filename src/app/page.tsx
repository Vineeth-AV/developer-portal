
import React from 'react';
import { Hero } from './hero';
import { HomeTitle } from '@/components/tags/home-title';
import { AppLink, Divider, Table, TD, TH, TR } from 'components';
import { Explore } from '@/components/tags/explore';
import { Examples } from '@/components/tags/examples';
import { License } from '@/components/tags/license';

export default async function Home() {
  return (
    <div className="mt-[3.75rem] flex grow flex-row justify-center lg:mt-[6.4rem]">
      <div className="relative flex max-w-[120rem] grow flex-col items-center justify-center">
        <div id="skip-nav" />
        <Hero />
        <div className="flex shrink flex-row justify-center overflow-y-clip lg:justify-start">
          <article className="mx-6 mb-20 mt-10 size-full max-w-[52rem] md:mx-10 lg:mx-16">
            <HomeTitle title="Welcome" description="" />
            <p>
              Welcome to the Verteil API documentation! You will find on this site a
              wide range of materials, including installation instructions,
              tutorials, programming guides, and more.
            </p>
            <Divider />
            <HomeTitle title="Key Features" description="Discover Verteil APIs" />
            <p>
              Jump directly to the documentation of these distinctive features:
            </p>
            <Table>
              <thead>
                <TR>
                  <TH>Feature</TH>
                  <TH>Description</TH>
                </TR>
              </thead>
              <tbody>
                <TR>
                  <TD>
                    <AppLink href=" ">
                    Core NDC Concepts
                    </AppLink>
                  </TD>
                  <TD>
                  Offer & OfferItem, Fare Component and more.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="">
                    Deal codes  
                    </AppLink>
                  </TD>
                  <TD>
                    Promo and deal codes.
                  </TD>
                </TR>
                <TR>
                  <TD>
                    <AppLink href="">
                    Modify itinerary
                    </AppLink>
                  </TD>
                  <TD>
                    Learn how to modify itinerary
                  </TD>
                </TR>
                 
                 
                   
              </tbody>
            </Table>
            <Divider />
            <HomeTitle
              title="Api by example"
              description="See Verteil API in action"
            />
            <Examples />
            <Divider />
            
             
            <Divider />
               
          </article>
        </div>
      </div>
    </div>
  );
}
