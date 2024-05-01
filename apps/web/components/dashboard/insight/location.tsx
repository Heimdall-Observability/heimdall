import { Card, CardContent } from '@/components/ui/card'
import { TableCell, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import COUNTRIES from '@/lib/constants'
import { Link2Icon } from 'lucide-react'
import ReactCountryFlag from 'react-country-flag'

import { ClearFilter } from './clear-filter'
import LocationMap from './location-map'
import { InsightTable } from './table'
import { InsightTablesProps } from './tables'

export const Location = ({
  filter: { isFilterActive, clearFilter, addFilter },
  data,
  isLoading,
}: Omit<InsightTablesProps, 'setCurrentTableTab'>) => {
  function searchFn(key: string, term: string, data: 'session' | 'pageview') {
    addFilter({
      operator: 'contains',
      data,
      key,
      value: term,
    })
  }

  return (
    <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className=" bg-gradient-to-tr from-stone-950 to-stone-900/80 md:col-span-3">
        <CardContent className=" bg-stone-950 py-4">
          <Tabs className=" w-full" defaultValue="country">
            {isFilterActive('country') || isFilterActive('city') ? (
              <ClearFilter
                onClick={() => {
                  clearFilter('country')
                  clearFilter('city')
                }}
              />
            ) : null}
            <TabsList className=" ml-auto border-gray-400">
              <TabsTrigger value="country">Country</TabsTrigger>
              <TabsTrigger value="city">City</TabsTrigger>
            </TabsList>

            <TabsContent value="country">
              <InsightTable
                data={data?.data.locations.country.map((ctr) => ({
                  location: COUNTRIES[ctr.location] ?? ctr.location,
                  ogLocation: ctr.location,
                  visits: ctr.visits,
                }))}
                searchPlaceholder="Search Country..."
                meta={{
                  key: 'location',
                  nameLabel: 'Country',
                  valueLabel: 'Visits',
                }}
                searchFn={(t) => {
                  const term = Object.keys(COUNTRIES).find(
                    (cty) => COUNTRIES[cty] === t,
                  )
                  if (term) {
                    searchFn('country', term, 'session')
                  }
                }}
                hideSearchBar={data && data?.data.locations.country.length < 10}
                isLoading={isLoading}
                tip="Your visitors country and how many times they are visited :)"
                Row={(location: any) => (
                  <TableRow>
                    <TableCell
                      className=" flex cursor-pointer items-center gap-1"
                      onClick={() =>
                        addFilter({
                          key: 'country',
                          value: location.ogLocation,
                          operator: 'is',
                          data: 'session',
                        })
                      }
                    >
                      {location.location === 'Unknown' ? (
                        <>
                          <Link2Icon />
                          Unknown
                        </>
                      ) : (
                        <>
                          <ReactCountryFlag
                            countryCode={location.ogLocation}
                            svg
                            style={{
                              width: '1em',
                              height: '1em',
                            }}
                          />
                          {location.location}
                        </>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {location.visits}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TabsContent>
            <TabsContent value="city">
              <InsightTable
                data={data?.data.locations.city}
                meta={{
                  key: 'location',
                  nameLabel: 'City',
                  valueLabel: 'Visits',
                }}
                searchPlaceholder="Search City..."
                searchFn={(t) => searchFn('city', t, 'session')}
                hideSearchBar={data && data?.data.locations.city.length < 10}
                isLoading={isLoading}
                tip="Your visitors city and how many times they are visited :)"
                Row={(location: any) => (
                  <TableRow>
                    <TableCell
                      className=" flex cursor-pointer items-center gap-1"
                      onClick={() =>
                        addFilter({
                          key: 'country',
                          value: location.location,
                          operator: 'is',
                          data: 'session',
                        })
                      }
                    >
                      {location.location === 'Unknown' || !location.location ? (
                        <>
                          <Link2Icon />
                          Unknown
                        </>
                      ) : (
                        <>
                          <ReactCountryFlag
                            countryCode={location.country}
                            svg
                            style={{
                              width: '1em',
                              height: '1em',
                            }}
                          />
                          {location.location}
                        </>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {location.visits}
                    </TableCell>
                  </TableRow>
                )}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <Card className="bg-stone-950 md:col-span-4">
        <CardContent>
          <LocationMap data={data ? data.data.locations.country : []} />
        </CardContent>
      </Card>
    </div>
  )
}
