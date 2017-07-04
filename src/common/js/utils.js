/**
 * Created by Jiecong Ji on 2017/7/3.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomList(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let temp = _arr[j]
    _arr[j] = _arr[i]
    _arr[i] = temp
  }
  return _arr
}

export function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
