import * as DateFns from 'date-fns'

export interface Article {
  title: string
  rank: number
  rankOnPreviousDay: number | null
  views: number | null
}

interface ApiArticle {
  article: string
  rank: number
  views: number
}

export async function getResultsForDate(
  date: Date,
  cache: Cache | null
): Promise<Array<Article>> {
  const [atDate, atDayBefore] = await Promise.all([
    getTopPagesForDate(date, cache),
    getTopPagesForDate(DateFns.subDays(date, 1), cache),
  ])
  const dayBeforeRanking: { [key: string]: number } = {}
  for (const article of atDayBefore) {
    dayBeforeRanking[article.article] = article.rank
  }
  const top100AtDate = atDate
    .filter((article) => article.rank <= 100)
    .map((article) => {
      return {
        title: article.article,
        rank: article.rank,
        rankOnPreviousDay: dayBeforeRanking[article.article],
        views: article.views,
      }
    })

  return top100AtDate
}

export async function maxDate(cache: Cache | null): Promise<Date> {
  const tomorrow = DateFns.startOfTomorrow()
  const today = DateFns.startOfToday()
  const yesterday = DateFns.startOfYesterday()
  const twoDaysAgo = DateFns.subDays(yesterday, 1)

  const [tomorrowOkay, todayOkay, yesterdayOkay] = await Promise.all(
    [tomorrow, today, yesterday].map((date) => loadsFine(date, cache))
  )

  if (tomorrowOkay) {
    return tomorrow
  } else if (todayOkay) {
    return today
  } else if (yesterdayOkay) {
    return yesterday
  } else if (await loadsFine(twoDaysAgo, cache)) {
    return twoDaysAgo
  } else {
    // if all four requests failed there's probably a different issue and
    // there's no point in trying other dates.
    return today
  }
}

async function loadsFine(date: Date, cache: Cache | null): Promise<boolean> {
  try {
    await topPagesResponseForDate(date, cache)
    return true
  } catch {
    return false
  }
}

async function getTopPagesForDate(
  date: Date,
  cache: Cache | null
): Promise<Array<ApiArticle>> {
  const response = await topPagesResponseForDate(date, cache)
  const asJson = await response.json()
  const articles = asJson.items[0].articles
  return articles
}

async function topPagesResponseForDate(
  date: Date,
  cache: Cache | null
): Promise<Response> {
  const dateString = DateFns.format(date, 'yyyy/MM/dd')
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access/${dateString}`

  const cached = cache && (await cache.match(url))
  if (cached) {
    return cached
  } else {
    const fetched = await fetch(url)
    if (fetched.status === 200) {
      if (cache) {
        await cache.put(url, fetched)
        return (await cache.match(url)) as Response
      } else {
        return fetched
      }
    } else {
      throw new Error('Request failed')
    }
  }
}
