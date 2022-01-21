console.log('This is client/front js');

const $form = document.forms.postform;
const $new = document.querySelector('.answer-container');

$form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = Object.fromEntries(new FormData(event.target));

  const dataApi = await fetch('https://yesno.wtf/api');
  const data = await dataApi.json();
  const { answer, image } = data;
  let rusAnswer;
  if (answer === 'no') {
    rusAnswer = 'нет';
  } else if (answer === 'yes') {
    rusAnswer = 'да';
  } else {
    rusAnswer = 'может быть';
  }
  const obj = {
    question: formData.question,
    answer: rusAnswer,
    img: image,
  };
  console.log(rusAnswer);
  console.log(data);
  const res = await fetch('/api', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  if (res.status === 200) {
    function createAnswer(data) {
      return `<div class="card" style="width: 58rem;">
      <div class="card-body">
        <h5 class="card-title">${data.question}</h5>
        <p class="card-text">${data.answer}</p>
        <img src="${data.img}" class="card-img-top" alt="...">
        <div style="margin-top: 20px; display: flex; justify-content: center;">
        <a href="/" class="btn btn-outline-success me-2">Спасибо</a>
        </div>
      </div>
    </div>`;
    }
    // $form.remove();
    $new.innerHTML = createAnswer(obj);
    document.getElementById('textInput1').value = '';
  }
});
