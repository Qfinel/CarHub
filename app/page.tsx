'use client'

import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components"
import { fuels, yearsOfProduction } from "@/constants"
import { CarState } from "@/types"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Home() {

  const [allCars, setAllCars] = useState<CarState>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [manufacturer, setManufacturer] = useState<string>('')
  const [model, setModel] = useState<string>('')

  const [year, setYear] = useState<number>(2023)
  const [fuel, setFuel] = useState<string>('')

  const [limit, setLimit] = useState<number>(10)

  const getCars = async () => {
    setLoading(true)
    try {
      const result = await fetch('/api/cars/', {
          method: 'POST',
          body: JSON.stringify({
            manufacturer: manufacturer.toLowerCase() || '',
            year: year || 2023,
            fuel: fuel.toLowerCase() || '',
            limit: limit || 10,
            model: model.toLowerCase() || ''})
        })

        const data = await result.json()
        setAllCars(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCars()
  }, [fuel, year, limit, manufacturer, model])

  return (
    <main className="overflow-hidden">
      <Hero />
      <div className="mt-12 padding-x padding-y
        max-width" id="discover">
          <div className="home__text-container">
            <h1 className="text-4xl font-extrabold">
              Car Catalogue
            </h1>
            <p>Explore the cars you might like</p>
          </div>
          <div className="home__filters">
            <SearchBar
              setManufacturer={setManufacturer}
              setModel={setModel}/>
            <div className="home__filter-container">
              <CustomFilter
                options={fuels}
                setFilter={setFuel}/>
              <CustomFilter
                options={yearsOfProduction}
                setFilter={setYear}/>
            </div>
          </div>

          {(allCars && allCars.length > 0) ? (
            <section>
              <div className="home__cars-wrapper">
                {allCars?.map((car) => <CarCard car={car} />)}
              </div>

              {loading && (
                <div className="mt-16 w-full flex-center">
                  <Image 
                    src="/loader.svg"
                    alt="loader"
                    width={50}
                    height={50}
                    className="object-contain"/>
                </div>
              )}

              <ShowMore 
                pageNumber={limit / 10}
                isNext={(limit > allCars.length)}
                setLimit={setLimit}
              />
            </section>
          ) : (
            !loading && (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold">Oops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
          ))}
      </div>
    </main>
  )
}
