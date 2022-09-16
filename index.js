import { arrayToDiv, splitToChunks, convertToArray, shuffledArray } from './utils.js'

const teachers = document.getElementById('teachers')
const group1 = document.getElementById('group1')
const group2 = document.getElementById('group2')
const group3 = document.getElementById('group3')

const start = document.getElementById('start')

start.addEventListener('click', () => {
  genenator();
})

function genenator() {
  document.querySelector('.wrapper').innerHTML = null;

  const arrayTeachers = convertToArray(teachers.value);
  const arrayGroup1 = convertToArray(group1.value);
  const arrayGroup2 = convertToArray(group2.value);
  const arrayGroup3 = convertToArray(group3.value);

  const chunk = arrayTeachers.length;

  const arrayChunkGroup1 = splitToChunks(arrayGroup1, chunk)
  const arrayChunkGroup2 = splitToChunks(arrayGroup2, chunk)
  const arrayChunkGroup3 = splitToChunks(arrayGroup3, chunk)

  const result = arrayTeachers.reduce((r, k, i) => {
    return {
      ...r, [k]: {
        group1: shuffledArray(arrayChunkGroup1[i]),
        group2: shuffledArray(arrayChunkGroup2[i]),
        group3: shuffledArray(arrayChunkGroup3[i]),
      }
    }
  }, {})

  let room = 1;

  for (const teacherKey in result) {
    let row;
    let teacher;
    let group = [];

    teacher = `<div>${teacherKey}</div>`

    for (const teacherKeyKey in result[teacherKey]) {
      group = [...group, result[teacherKey][teacherKeyKey]]
    }

    row = `<div>
    <div class="teacher">
    <h1>${teacher}</h1>
    <div>Комната ${room++}</div>
    </div>
    <div class="group1">${arrayToDiv(group[0])}</div>
    <div class="group2">${arrayToDiv(group[1])}</div>
    <div class="group3">${arrayToDiv(group[2])}</div>
    </div>`
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', row);
  }
}
