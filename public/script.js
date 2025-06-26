let currentSuspectId = null;
let suspectsCache = [];

window.onload = () => {
  fetch('/api/story')
    .then(res => res.json())
    .then(data => {
      document.getElementById('story').innerText = data.description;
    });
};

function loadSuspects() {
  fetch('/api/suspects')
    .then(res => res.json())
    .then(data => {
      suspectsCache = data;
      const list = document.getElementById('suspect-list');
      list.innerHTML = '';
      data.forEach(suspect => {
        const li = document.createElement('li');
        li.textContent = `${suspect.name} - 알리바이: ${suspect.alibi}`;
        li.onclick = () => {
          currentSuspectId = suspect.id;
          showQuestions(suspect);
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
      document.getElementById('answer').innerText = data.answer || "답변을 알 수 없습니다.";
    });
}
