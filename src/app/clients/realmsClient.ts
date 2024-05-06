'use server'

import { getAccessToken } from "./tokenClient";

const BASE_URL = 'https://eu.api.blizzard.com/data/wow/realm/index?region=EU&namespace=dynamic-EU&locale=en_GB';

export const getRealms = async () => {
  const accessToken = await getAccessToken();

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const body = await res.json();

    return body.realms;
  }
  catch (error) {
    // throw new Error(error.message)
  }
}

export interface RealmsDTO {
  name: string,
  id: string,
  slug: string
}