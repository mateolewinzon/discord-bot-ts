import { Service } from "@helpers/service";
import { days } from "@helpers/weekdays";

const soccerAPI = new Service("https://api-football-v1.p.rapidapi.com/v3/", {
  headers: {
    "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
  },
});

const ARG_LEAGUE_ID = "128";
const SEASON = "2023";

export async function getRandomArgentinaPlayer() {
  const randomPage = Math.floor(Math.random() * 54) + 1;
  const { response } = await soccerAPI.get("players", {
    params: {
      league: ARG_LEAGUE_ID,
      season: SEASON,
      page: randomPage,
    },
  });
  const randomIndex = Math.floor(Math.random() * response.length);
  console.log(response[randomIndex]);
  return response[randomIndex];
}

export async function getNextArgentinaGames() {
  const now = new Date();
  const formattedFrom = now.toISOString().split("T")[0];
  const to = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 10);
  const formattedTo = to.toISOString().split("T")[0];

  const { response }: { response: any[] } = await soccerAPI.get("fixtures", {
    params: {
      league: ARG_LEAGUE_ID,
      season: SEASON,
      from: formattedFrom,
      to: formattedTo,
    },
  });

  const orderedResponse = response.sort(
    (a, b) =>
      new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime()
  );

  const matches = orderedResponse.map((match: any) => {
    const {
      fixture,
      teams: { home, away },
    } = match;

    const date = new Date(fixture.date);
    const formattedDate = date.toLocaleString("es-AR", {
      timeZone: "America/Buenos_Aires",
    });

    const weekday = days[date.getDay()];

    return {
      date: formattedDate,
      weekday,
      home: home.name,
      away: away.name,
    };
  });

  return matches;
}
