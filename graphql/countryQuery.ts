import { gql } from '@apollo/client';
export interface IInformation {
  code: string;
  name: string;
  emoji: string;
  capital?: string;
  currencies?: string[];
  languages?: [
    { name: string; }
  ],
}

export interface QueryCountry {
  countries: IInformation[];
}

export const countriesQuery = gql`
  query Countries {
    countries {
      code
      name
      emoji
      capital
      currencies
      languages {
        name
      }
    }
  }
`;