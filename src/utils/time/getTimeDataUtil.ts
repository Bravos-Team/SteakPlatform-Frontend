import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Ho_Chi_Minh')

export const now = dayjs().tz()
export const currentDay = now.day()
export const currentHour = now.hour()
export const currentMinute = now.minute()
export const currentSecond = now.second()
export const currentMilliseconds = now.millisecond()

export const getMillisecondsUntilNextDay = (): number =>
  dayjs().add(1, 'day').startOf('day').valueOf() - dayjs().valueOf()
export const getMillisecondsUntilNextMonday = (): number => {
  let daysUntilMonday = (8 - currentDay) % 7

  if (
    daysUntilMonday === 0 &&
    (currentHour > 0 || currentMinute > 0 || currentSecond > 0 || currentMilliseconds > 0)
  )
    daysUntilMonday = 7
  const nextMonday = now.add(daysUntilMonday, 'day').startOf('day')
  return nextMonday.valueOf() - now.valueOf()
}

export const getMillisecondsUntilNextMonth = (): number =>
  dayjs().add(1, 'month').startOf('month').valueOf() - dayjs().valueOf()
