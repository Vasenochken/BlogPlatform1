import { v4 as uuidv4 } from 'uuid'
import { format, parseISO } from 'date-fns'

export const formatDate = (createdAt) => {
  if (createdAt === null) return null
  else {
    const date = parseISO(createdAt)
    return format(date, 'MMMM d, yyyy')
  }
}

export const generateId = () => uuidv4()
