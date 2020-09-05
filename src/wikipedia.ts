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
  cache: Cache | null,
): Promise<Array<Article>> {
  const atDate = await getTopPagesForDate(date, cache)
  const atDayBefore = await getTopPagesForDate(DateFns.subDays(date, 1), cache)
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

async function getTopPagesForDate(
  date: Date,
  cache: Cache | null,
): Promise<Array<ApiArticle>> {
  const response = await topPagesResponseForDate(date, cache)
  const asJson = await response.json()
  const articles = asJson.items[0].articles
  return articles
}

async function topPagesResponseForDate(
  date: Date,
  cache: Cache | null,
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
