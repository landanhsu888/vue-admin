function pluralize(time: any, label: any): string {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

function timeAgo (time: string): string {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export default timeAgo
