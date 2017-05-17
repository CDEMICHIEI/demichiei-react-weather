const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDay = (dt) => {
  const d = new Date(dt * 1000);
  return daysOfWeek[(d.getDay())];
};

export const getTime = (dt) => {
  const d = new Date(dt * 1000);
  const h = d.getHours().toString();
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const cullWeek = week => week.list.filter(x => x.dt_txt.indexOf('12:00:00') !== -1);

export const firstLettersUpper = str => str.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
