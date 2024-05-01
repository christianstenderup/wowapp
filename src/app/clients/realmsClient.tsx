const BASE_URL = 'https://eu.api.blizzard.com/data/wow/realm/index?region=EU&namespace=dynamic-EU&locale=en_GB';

const RealmsClient = {
  getRealms: async () => {
    const res = await fetch(BASE_URL)

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }
}
   
export default RealmsClient;