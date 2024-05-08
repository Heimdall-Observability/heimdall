export interface Theme {
  name: string
  value: string
}

export const themes = [
  { name: 'System', value: 'system' }, // Switches between dark and light
  { name: 'Dark', value: 'dark' }, // Classic dark
  { name: 'Light', value: 'light' }, // Classic light
]
