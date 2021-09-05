const POTENTIAL_KEYS = [
  'text',
  'choice',
  'choices',
  'email',
  'url',
  'file_url',
  'boolean',
  'number',
  'date',
  'payment',
]

export function handleTypeFormField(item) {
  const attributeKey = Object.keys(item).find((key) => POTENTIAL_KEYS.includes(key))

  return item[attributeKey] || 'N/A';
}
