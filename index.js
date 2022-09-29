import { arrayToDiv, splitToChunks, convertToArray, shuffledArray } from './utils.js';

const teachers = document.getElementById('teachers');
const start = document.getElementById('start');

document.getElementById('teachers').defaultValue = `Олег\nДенис\nРоман\nТарас\nАлексей\nСергей`

start.addEventListener('click', async () => {
  const res = await fetch('https://pairs-generator.onrender.com/api/groups')
  const data = await res.json()
  render(data);
})

function render(groups) {
  document.querySelector('.wrapper').innerHTML = null;

  const arrayTeachers = convertToArray(teachers.value);

  const chunk = arrayTeachers.length;

  const arrayChunkGroup1 = splitToChunks(groups[3].students, chunk);
  const arrayChunkGroup2 = splitToChunks(groups[2].students, chunk);
  const arrayChunkGroup3 = splitToChunks(groups[1].students, chunk);
  const arrayChunkGroup4 = splitToChunks(groups[0].students, chunk);

  const result = arrayTeachers.reduce((r, k, i) => {
    return {
      ...r, [k]: {
        group1: shuffledArray(arrayChunkGroup1[i]),
        group2: shuffledArray(arrayChunkGroup2[i]),
        group3: shuffledArray(arrayChunkGroup3[i]),
        group4: shuffledArray(arrayChunkGroup4[i]),
      }
    }
  }, {})

  let room = 1;

  for (const teacherKey in result) {
    let row;
    let teacher;
    let group = [];

    teacher = `<div>${teacherKey}</div>`;

    for (const teacherKeyKey in result[teacherKey]) {
      group = [...group, result[teacherKey][teacherKeyKey]];
    }

    row = `<div>
    <div class="teacher">
    <h1>${teacher}</h1>
    <div>Комната ${room++}</div>
    </div>
    <div class="group1">${arrayToDiv(group[0])}</div>
    <div class="group2">${arrayToDiv(group[1])}</div>
    <div class="group3">${arrayToDiv(group[2])}</div>
    <div class="group4">${arrayToDiv(group[3])}</div>
    </div>`;
    document.querySelector('.wrapper').insertAdjacentHTML('beforeend', row);
  }
}
