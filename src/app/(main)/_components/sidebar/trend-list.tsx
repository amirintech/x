import React from 'react'

type Trend = {
  id: string
  title: string
  category: string
  region: string
  tweetCount: number
}

const trends: Trend[] = [
  {
    id: '1',
    title: 'AI Breakthrough',
    category: 'Technology',
    region: 'United States',
    tweetCount: 125000,
  },
  {
    id: '2',
    title: 'Climate Summit',
    category: 'Politics',
    region: 'Global',
    tweetCount: 89000,
  },
  {
    id: '3',
    title: 'SpaceX Launch',
    category: 'Science',
    region: 'United States',
    tweetCount: 67000,
  },
  {
    id: '4',
    title: 'World Cup Qualifiers',
    category: 'Sports',
    region: 'Europe',
    tweetCount: 234000,
  },
  {
    id: '5',
    title: 'New Movie Release',
    category: 'Entertainment',
    region: 'Global',
    tweetCount: 156000,
  },
  {
    id: '6',
    title: 'Stock Market Rally',
    category: 'Business',
    region: 'United States',
    tweetCount: 45000,
  },
]

type Props = {}

const TrendList = (props: Props) => {
  return (
    <div className='rounded-xl border'>
      <h2 className='p-3 text-xl font-extrabold'>What&apos;s happening</h2>
      <div className='space-y-3'>
        {trends.map((trend) => (
          <div
            key={trend.id}
            className='cursor-pointer p-2 px-3 transition-colors hover:bg-gray-50'
          >
            <div className='text-xs text-gray-500'>
              {trend.category} • {trend.region}
            </div>
            <div className='text-sm font-semibold'>{trend.title}</div>
            <div className='text-xs text-gray-500'>{formatValue(trend.tweetCount)} tweets</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrendList

function formatValue(value: number): string {
  if (value >= 1000000000) return (value / 1000000000).toFixed(1).replace(/\.0$/, '') + 'B'
  if (value >= 1000000) return (value / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (value >= 1000) return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return value.toString()
}
