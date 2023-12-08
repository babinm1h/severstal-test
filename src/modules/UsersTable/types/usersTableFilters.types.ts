export interface IFiltersState {
  isActive: string;
  balance: string;
  name: string;
  email: string;
}

export interface ISortState {
  sort: keyof IFiltersState;
  direction: SortDirections;
}

export enum SortDirections {
  ASC = 'asc',
  DESC = 'desc',
}
