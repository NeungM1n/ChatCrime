let currentSuspectId = null;
let suspectsCache = []; // 모든 용의자 캐싱

function loadSuspects() {
  fetch('/api/suspects')
    .then(res => res.json())
    .then(data => {
      suspectsCache = data;
      const list = document.getElementById('suspect-list');
      list.innerHTML = '';
      data.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.name} - ${s.alibi}`;
        li.onclick = () => {
          currentSuspectId = s.id;
          showQuestions(s);
        };
        list.appendChild(li);
      });
    });
}

function showQuestions(suspect) {
  document.getElementById('dialogue-box').style.display = 'block';
  const questionDiv = document.getElementById('question-buttons');
  questionDiv.innerHTML = '';

  Object.keys(suspect.dialogue).forEach(q => {
    const btn = document.createElement('button');
    btn.textContent = q;
    btn.onclick = () => askQuestion(q);
    questionDiv.appendChild(btn);
  });

  document.getElementById('answer').innerText = '';
}

function askQuestion(question) {
  fetch('/api/dialogue', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ suspectId: currentSuspectId, question })
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById('answer').innerText = data.answer;
    });
}
