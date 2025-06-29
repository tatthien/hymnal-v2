export type Collection = 'hymns' | 'tvchh'
export const COLLECTION_MAP: Record<Collection, { title: string }> = {
  hymns: {
    title: 'Thánh Ca',
  },
  tvchh: {
    title: 'Tôn Vinh Chúa Hằng Hữu',
  }
}
