import { WorldMap } from 'react-svg-worldmap'

const LocationMap = ({
  data,
}: {
  data: { location: string; visits: number }[]
}) => {
  const transformedData = data.map((d) => ({
    country: d.location,
    value: d.visits,
  }))
  return (
    <div className="flex min-h-[400px] items-center justify-center animate-in">
      {!data.length ? (
        <div className="relative flex h-full items-center justify-center">
          <p className="from-emphasis absolute animate-pulse bg-gradient-to-tr to-white/80 bg-clip-text text-center text-transparent">
            Loading Map
          </p>
          <WorldMap
            color="#0074a6"
            value-suffix="visits"
            size="lg"
            tooltipBgColor="#000"
            richInteraction
            borderColor={'#86868a'}
            backgroundColor="rgba(0, 0, 0, .0)"
            data={[]}
          />
        </div>
      ) : (
        <WorldMap
          color="#0074a6"
          value-suffix="visits"
          size="lg"
          tooltipBgColor="#000"
          richInteraction
          borderColor={'#86868a'}
          backgroundColor="rgba(0, 0, 0, .0)"
          data={transformedData}
        />
      )}
    </div>
  )
}

export default LocationMap
