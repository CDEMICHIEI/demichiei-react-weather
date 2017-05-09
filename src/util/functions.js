const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const getDayOfWeek = day => daysOfWeek[day]

export const getDay = (dt) => {
  const d = new Date(dt*1000)
  return getDayOfWeek(d.getDay())
}
export const cullWeek = week => week.list.filter(x=>x.dt_txt.indexOf("12:00:00")!==-1)

export const firstLettersUpper = str => str.split(" ").map(word => word[0].toUpperCase()+word.substring(1)).join(" ");


export const getCondition = (condition) => {
  const conditionID = condition.substring(0,1)

  switch (conditionID) {
    case "2":
      return "thunder";
    case "3":
      return "raining";
    case "5":
      return "raining";
    case "6":
      return "snowing";
    case "7":
      return "foggy"
    case "8":
      return condition === "800" ? "clear" : condition === "804" ? "overcast" : "cloudy"
    default:
      return "cloudy"
  }

}
