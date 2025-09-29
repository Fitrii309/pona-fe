"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChartBarInteractive() {
  const [chartData, setChartData] = React.useState<any[]>([])
  const [kategoriList, setKategoriList] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const token = localStorage.getItem('token')
        const bulan = new Date().getMonth() + 1
        const tahun = new Date().getFullYear()

        const res = await fetch(`http://localhost:3001/poin-statistik/bulanan/${tahun}/${bulan}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const data = await res.json()

        // ambil semua nama kategori dari data[0] (diasumsikan semua hari punya kategori sama)
        const firstDay = data[0]?.kategori || {}
        const kategoriNames = Object.keys(firstDay).filter(k => k !== "TOTAL")
        setKategoriList(kategoriNames)

        // format data untuk chart
        const formattedData = data.map((d: any) => ({
          date: d.tanggal,
          ...d.kategori,
        }))

        setChartData(formattedData)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <Card className="py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3 sm:!py-0">
          <CardTitle>Point Bar Chart</CardTitle>
          <CardDescription>
            Showing points for each category and total for the current month
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="overflow-x-auto">
          <BarChart data={chartData} margin={{ left: 12, right: 12 }} width={Math.max(chartData.length * 40, 500)} height={300}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={12}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
              }
            />
            <Tooltip />
            <Legend />
            {kategoriList.map((k, idx) => (
              <Bar key={k} dataKey={k} stackId="a" fill={`hsl(${(idx / kategoriList.length) * 360}, 70%, 50%)`} />
            ))}
            <Bar dataKey="TOTAL" fill="#000" />
          </BarChart>
        </div>
      </CardContent>
    </Card>
  )
}
