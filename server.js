const express = require('express');
const path = require('path');
const app = express();

const story = require('./data/story.json');
const suspects = require('./data/suspects.json');

app.use(express.json()); // ✅ POST 요청 바디 파싱 필수!
app.use(express.static(path.join(__dirname, 'public')));

// 시나리오 API
app.get('/api/story', (req, res) => {
  res.json(story);
});

// 용의자 목록 API
app.get('/api/suspects', (req, res) => {
  res.json(suspects);
});

// 대화 API
app.post('/api/dialogue', (req, res) => {
  const { suspectId, question } = req.body;

  const suspect = suspects.find(s => s.id === suspectId);
  if (!suspect) {
    return res.status(404).json({ error: '용의자를 찾을 수 없습니다.' });
  }

  const answer = suspect.dialogue[question] || "모르겠어요...";
  res.json({ answer });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});
