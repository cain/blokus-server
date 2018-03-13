/*eslint-disable*/


export default (teams) => {
  const arr = []

  teams.forEach((t, i) => {
    arr.push(blocks(t))
  })
  
  return arr;
}


const blocks = (team) => [
  {
    id: 'i1',
    grid: {x: 1, y: 1},
    pieces: [{x: 1, y: 1}],
    x: 0,
    y: 0,
    team
  },
  {
    id: 'i2',
    grid: {x: 1, y: 2},
    pieces: [{x: 1, y: 1}, {x: 1, y: 2}],
    x: 0,
    y: 0,
    team
  },
  {
    id: 'i3',
    grid: {x: 1, y: 3},
    pieces: [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}],
    x: 0,
    y: 0,
    team
  },
  {
    id: 'i5',
    grid: {x: 1, y: 5},
    pieces: [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 1, y: 4}, {x: 1, y: 5}],
    x: 0,
    y: 0,
    team
  },
  {
    id: 'v3',
    grid: {x: 2, y: 2},
    pieces: [{x: 1, y: 1}, {x: 1, y: 2}, {x: 2, y: 2}],
    x: 0,
    y: 0,
    team
  },
  {
    id: 'z4',
    grid: {x: 3, y: 2},
    pieces: [{x: 1, y: 1}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 3, y: 2}],
    x: 0,
    y: 0,
    team
  }
]
