"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An interactive bar chart"

const chartData = [
  { date: "2024-04-01", poin: 222 },
  { date: "2024-04-02", poin: 97,},
  { date: "2024-04-03", poin: 167 },
  { date: "2024-04-04", poin: 242 },
  { date: "2024-04-05", poin: 373 },
  { date: "2024-04-06", poin: 301 },
  { date: "2024-04-07", poin: 245 },
  { date: "2024-04-08", poin: 409 },
  { date: "2024-04-09", poin: 59,},
  { date: "2024-04-10", poin: 261 },
  { date: "2024-04-11", poin: 327 },
  { date: "2024-04-12", poin: 292 },
  { date: "2024-04-13", poin: 342 },
  { date: "2024-04-14", poin: 137 },
  { date: "2024-04-15", poin: 120 },
  { date: "2024-04-16", poin: 138 },
  { date: "2024-04-17", poin: 446 },
  { date: "2024-04-18", poin: 364 },
  { date: "2024-04-19", poin: 243 },
  { date: "2024-04-20", poin: 89,},
  { date: "2024-04-21", poin: 137 },
  { date: "2024-04-22", poin: 224 },
  { date: "2024-04-23", poin: 138 },
  { date: "2024-04-24", poin: 387 },
  { date: "2024-04-25", poin: 215 },
  { date: "2024-04-26", poin: 75,},
  { date: "2024-04-27", poin: 383 },
  { date: "2024-04-28", poin: 122 },
  { date: "2024-04-29", poin: 315 },
  { date: "2024-04-30", poin: 454 },
  { date: "2024-05-01", poin: 165 },
  { date: "2024-05-02", poin: 293 },
  { date: "2024-05-03", poin: 247 },
  { date: "2024-05-04", poin: 385 },
  { date: "2024-05-05", poin: 481 },
  { date: "2024-05-06", poin: 498 },
  { date: "2024-05-07", poin: 388 },
  { date: "2024-05-08", poin: 149 },
  { date: "2024-05-09", poin: 227 },
  { date: "2024-05-10", poin: 293 },
  { date: "2024-05-11", poin: 335 },
  { date: "2024-05-12", poin: 197 },
  { date: "2024-05-13", poin: 197 },
  { date: "2024-05-14", poin: 448 },
  { date: "2024-05-15", poin: 473 },
  { date: "2024-05-16", poin: 338 },
  { date: "2024-05-17", poin: 499 },
  { date: "2024-05-18", poin: 315 },
  { date: "2024-05-19", poin: 235 },
  { date: "2024-05-20", poin: 177 },
  { date: "2024-05-21", poin: 82,},
  { date: "2024-05-22", poin: 81,},
  { date: "2024-05-23", poin: 252 },
  { date: "2024-05-24", poin: 294 },
  { date: "2024-05-25", poin: 201 },
  { date: "2024-05-26", poin: 213 },
  { date: "2024-05-27", poin: 420 },
  { date: "2024-05-28", poin: 233 },
  { date: "2024-05-29", poin: 78,},
  { date: "2024-05-30", poin: 340 },
  { date: "2024-05-31", poin: 178 },
  { date: "2024-06-01", poin: 178 },
  { date: "2024-06-02", poin: 470 },
  { date: "2024-06-03", poin: 103 },
  { date: "2024-06-04", poin: 439 },
  { date: "2024-06-05", poin: 88,},
  { date: "2024-06-06", poin: 294 },
  { date: "2024-06-07", poin: 323 },
  { date: "2024-06-08", poin: 385 },
  { date: "2024-06-09", poin: 438 },
  { date: "2024-06-10", poin: 155 },
  { date: "2024-06-11", poin: 92,},
  { date: "2024-06-12", poin: 492 },
  { date: "2024-06-13", poin: 81,},
  { date: "2024-06-14", poin: 426 },
  { date: "2024-06-15", poin: 307 },
  { date: "2024-06-16", poin: 371 },
  { date: "2024-06-17", poin: 475 },
  { date: "2024-06-18", poin: 107 },
  { date: "2024-06-19", poin: 341 },
  { date: "2024-06-20", poin: 408 },
  { date: "2024-06-21", poin: 169 },
  { date: "2024-06-22", poin: 317 },
  { date: "2024-06-23", poin: 480 },
  { date: "2024-06-24", poin: 132 },
  { date: "2024-06-25", poin: 141 },
  { date: "2024-06-26", poin: 434 },
  { date: "2024-06-27", poin: 448 },
  { date: "2024-06-28", poin: 149 },
  { date: "2024-06-29", poin: 103 },
  { date: "2024-06-30", poin: 446 },
]

const chartConfig = {
  views: {
    label: "Siswa",
  },
  poin: {
    label: "Poin",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export default function ChartBarInteractive() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("poin")

  const total = React.useMemo(
    () => ({
      poin: chartData.reduce((acc, curr) => acc + curr.poin, 0)
    }),
    []
  )

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Point Bar Chart</CardTitle>
          <CardDescription>
            Showing total point kebaikan for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["poin"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="data-[active=true]:bg-muted/50 relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-muted-foreground text-xs">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg leading-none font-bold sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
