import axios from 'axios'

// export type COUNTRIES_QUERY_PARAMS_TYPE_OLD = {
//   alpha2Code?: string
//   cca2?: string
//   alpha3Code?: string
//   cca3?: string
//   altSpellings?: string
//   area?: string
//   borders?: string
//   callingCodes?: string
//   idd?: string
//   capital?: string
//   cioc?: string
//   coatOfArms?: string
//   continents?: string
//   currencies?: string
//   demonym?: string
//   fifa?: string
//   flag?: string
//   flags?: string
//   gini?: string
//   landlocked?: string
//   languages?: string
//   latlng?: string
//   maps?: string
//   name?: string
//   numericCode?: string
//   ccn3?: string
//   nativeName?: string
//   population?: string
//   region?: string
//   regionalBlocs?: string
//   startOfWeek?: string
//   status?: string
//   subregion?: string
//   timezones?: string
//   topLevelDomain?: string
//   tld?: string
//   translations?: string
//   unMember?: string
// }

// export type COUNTRIES_QUERY_PARAMS_TYPE = string[]

export type Country = {
  flags: {
    png: string
    svg: string
    alt?: string
  }
  name: {
    common: string
    official: string
    nativeName?: {
      [languageCode: string]: {
        official: string
        common: string
      }
    }
  }
}

export type Language = {
  languages: {
    fra: string
  }
}

export type Countries = Country[]

export const getCountries = async (filters?: string[], signal?: AbortSignal) => {
  return await axios.get('https://restcountries.com/v3.1/all', { params: filters, signal: signal })
}

export const getCountriesIndependent = async (filters?: string[], signal?: AbortSignal) => {
  return await axios.get(
    `https://restcountries.com/v3.1/independent?fields=${filters?.join(',')}`,
    { signal: signal },
  )
}
