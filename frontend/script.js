const form = document.getElementById('generator-form');
const output = document.getElementById('output');
const outlineContainer = document.getElementById('outline');
const status = document.getElementById('status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const topic = document.getElementById('topic').value.trim();
  const slides = Number(document.getElementById('slides').value) || 5;

  if (!topic) {
    status.textContent = 'Please enter a presentation topic.';
    return;
  }

  status.textContent = 'Generating outline...';
  output.classList.add('hidden');
  outlineContainer.innerHTML = '';

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ topic, slides })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to generate outline');
    }

    const result = await response.json();
    outlineContainer.innerHTML = result.outline.map((slide, index) => `
      <div class="slide-card">
        <h3>${index + 1}. ${slide.title}</h3>
        <p>${slide.content}</p>
        <p><strong>Type:</strong> ${slide.slide_type}</p>
      </div>
    `).join('');

    status.textContent = `Generated ${result.slides} slides for "${result.topic}".`;
    output.classList.remove('hidden');
  } catch (error) {
    status.textContent = error.message;
  }
});
