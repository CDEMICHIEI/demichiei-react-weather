const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const getDayOfWeek = day => daysOfWeek[day]

export const getDay = (dt) => {
  const d = new Date(dt*1000)
  return getDayOfWeek(d.getDay())
}
export const cullWeek = week => week.list.filter(x=>x.dt_txt.indexOf("12:00")!==-1)
export const firstLettersUpper = str => str.split(" ").map(word => word[0].toUpperCase()+word.substring(1)).join(" ");
