export type RemoteData<Data> =
  | { status: 'loading' }
  | { status: 'okay'; data: Data }
  | { status: 'error' }
