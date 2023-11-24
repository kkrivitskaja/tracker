import dayjs from 'dayjs'

// eslint-disable-next-line import/prefer-default-export
export const formatDate = (date: Date, placeholder = 'No due date set') => {
  // return date && dayjs(date).isValid()
  return date && dayjs(date).isValid()
    ? new Date(date).toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : placeholder
}
