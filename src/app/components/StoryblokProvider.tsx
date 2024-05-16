"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

/** Import your components */
import Page from "./Page";
import Teaser from "./Teaser";
import Feature from "./Feature";
import Grid from "./Grid";

const components = {
    feature: Feature,
    grid: Grid,
    teaser: Teaser,
    page: Page,
  };

/** Init Storyblok client and connection */
storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    components
  });
 
export default function StoryblokProvider({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return children;
}