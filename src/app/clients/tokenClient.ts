'use server'

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export const getAccessToken = async () => {
  const clientId = process.env.BLIZZARD_CLIENT_ID ?? "a602d56d5dee44cd9b34baf4c2400a06";
  const clientSecret = process.env.BLIZZARD_CLIENT_SECRET ?? "rygxcvxbp1jLhJVEmwylnuURVOMZaHta";
  const tokenEndpoint = process.env.BLIZZARD_ACCESS_TOKEN_URL ?? "https://oauth.battle.net/token";

  if (!clientId) {
    throw new Error('OAuth clientId not configured');
  }
  if (!clientSecret) {
    throw new Error('OAuth clientSecret not configured');
  }
  if (!tokenEndpoint) {
    throw new Error('OAuth tokenEndpoint not configured');
  }

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch access token');
  }

  const data: TokenResponse = await response.json();
  return data.access_token;
};
