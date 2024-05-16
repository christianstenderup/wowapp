'use server'

import React from "react";
import CharacterSearch from "./components/wow/characterSearch";
import { getStoryblokApi } from "@storyblok/react";
import StoryblokStory from "@storyblok/react/story";

export default async function Home() {
  const { data } = await fetchData();
 
  return (
    <div>
      <StoryblokStory story={data.story} />
      <CharacterSearch/>
    </div>
  );
}

export async function fetchData() {
  let sbParams = { version: 'draft' as const};
 
  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams, {cache: "no-store"});
}