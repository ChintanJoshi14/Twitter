import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const config = {
   
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    apiVersion: '2021-10-21', 
    useCdn: process.env.NODE_ENV === 'production',
  }

//   to setup sanity client in order to fetch data

export const sanityClient = createClient(config)

//to get the image url from the response
export const urlFor = (source) => imageUrlBuilder(config).image(source);

