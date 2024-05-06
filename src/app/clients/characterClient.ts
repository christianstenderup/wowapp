'use server'

import { getAccessToken } from "./tokenClient";

export async function getCharacters(realmName: string | undefined, characterName: string | undefined) {
  const accessToken = await getAccessToken();

  const BASE_URL = `https://eu.api.blizzard.com/profile/wow/character/${realmName}/${characterName}?region=EU&namespace=profile-eu&locale=en_GB`;

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const character = await res.json();

    return character;
  }
  catch (error) {
    // throw new Error(error.message)
  }
}

export async function getCharacterRaids(realmName: string | undefined, characterName: string | undefined) {
  const accessToken = await getAccessToken();

  const BASE_URL = `https://eu.api.blizzard.com/profile/wow/character/${realmName}/${characterName}//encounters/raids?region=EU&namespace=profile-eu&locale=en_GB`;

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const encounters = await res.json();

    return encounters.expansions;
  }
  catch (error) {
    // throw new Error(error.message)
  }
}

export async function getCharacterDungeons(realmName: string | undefined, characterName: string | undefined) {
  const accessToken = await getAccessToken();

  const BASE_URL = `https://eu.api.blizzard.com/profile/wow/character/${realmName}/${characterName}//encounters/dungeons?region=EU&namespace=profile-eu&locale=en_GB`;

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const encounters = await res.json();

    return encounters;
  }
  catch (error) {
    // throw new Error(error.message)
  }
}

interface Link {
  self: {
    href: string;
  };
}

interface Name {
  en_US: string;
  es_MX: string;
  pt_BR: string;
  de_DE: string;
  en_GB: string;
  es_ES: string;
  fr_FR: string;
  it_IT: string;
  ru_RU: string;
  ko_KR: string;
  zh_TW: string;
  zh_CN: string;
}

interface Key {
  href: string;
}

interface Faction {
  type: string;
  name: Name;
}

interface Race {
  key: Key;
  name: Name;
  id: number;
}

interface CharacterClass {
  key: Key;
  name: Name;
  id: number;
}

interface Realm {
  key: Key;
  name: Name;
  id: number;
  slug: string;
}

interface ActiveSpec {
  key: Key;
  name: Name;
  id: number;
}

interface ChosenCovenant {
  key: Key;
  name: Name;
  id: number;
}

interface CovenantProgress {
  chosen_covenant: ChosenCovenant;
  renown_level: number;
  soulbinds: {
    href: string;
  };
}

export interface WowCharacter {
  _links: Link;
  id: number;
  name: string;
  gender: {
    type: string;
    name: Name;
  };
  faction: Faction;
  race: Race;
  character_class: CharacterClass;
  active_spec: ActiveSpec;
  realm: Realm;
  level: number;
  experience: number;
  achievement_points: number;
  achievements: {
    href: string;
  };
  titles: {
    href: string;
  };
  pvp_summary: {
    href: string;
  };
  encounters: {
    href: string;
  };
  media: {
    href: string;
  };
  last_login_timestamp: number;
  average_item_level: number;
  equipped_item_level: number;
  specializations: {
    href: string;
  };
  statistics: {
    href: string;
  };
  mythic_keystone_profile: {
    href: string;
  };
  equipment: {
    href: string;
  };
  appearance: {
    href: string;
  };
  collections: {
    href: string;
  };
  reputations: {
    href: string;
  };
  quests: {
    href: string;
  };
  achievements_statistics: {
    href: string;
  };
  professions: {
    href: string;
  };
  covenant_progress: CovenantProgress;
  name_search: string;
}

export interface Expansion {
  key: {
      href: string;
  };
  name: string;
  id: number;
}

export interface Encounter {
  key: {
      href: string;
  };
  name: string;
  id: number;
}

export interface Difficulty {
  type: string;
  name: {
      [key: string]: string;
  };
}

export interface Status {
  type: string;
  name: {
      [key: string]: string;
  };
}

export interface Progress {
  completed_count: number;
  total_count: number;
  encounters: {
      encounter: Encounter;
      completed_count: number;
      last_kill_timestamp: number;
  }[];
}

export interface Mode {
  difficulty: Difficulty;
  status: Status;
  progress: Progress;
}

interface Instance {
  key: {
      href: string;
  };
  name: string;
  id: number;
}

export interface ExpansionInstance {
  expansion: Expansion;
  instances: {
      instance: Instance;
      modes: Mode[];
  }[];
}

interface JournalData {
  expansions: ExpansionInstance[];
}
