export const ascendingSort = (prop: string) => {
  return (a: any, b: any) => new Date(a[prop]).getTime() - new Date(b[prop]).getTime()
}

export const descendingSort = (prop: string) => {
  return (a: any, b: any) => new Date(b[prop]).getTime() - new Date(a[prop]).getTime()
}
