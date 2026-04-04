// form.js — Dynamic ingredient/step lists + image preview

function addIngredient() { addItem('ingredientsList', 'e.g. 2 cups flour'); }
function addStep()       { addItem('stepsList', 'Describe this step…'); }

function addItem(listId, placeholder) {
  const list = document.getElementById(listId);
  const div  = document.createElement('div');
  div.className = 'dynamic-item';
  div.innerHTML = `
    <input type="text" placeholder="${placeholder}">
    <button type="button" class="remove-btn" onclick="removeItem(this)">✕</button>
  `;
  list.appendChild(div);
  div.querySelector('input').focus();
}

function removeItem(btn) {
  const list = btn.closest('.dynamic-list');
  if (list.children.length > 1) btn.closest('.dynamic-item').remove();
}

// Collect list values into hidden textareas before submit
document.getElementById('recipeForm').addEventListener('submit', function () {
  const collect = (listId, hiddenId) => {
    const values = [...document.querySelectorAll(`#${listId} input`)]
      .map(i => i.value.trim()).filter(Boolean).join('\n');
    document.getElementById(hiddenId).value = values;
  };
  collect('ingredientsList', 'ingredientsHidden');
  collect('stepsList',       'instructionsHidden');
});

// Image preview
function previewImage(url) {
  const img = document.getElementById('imagePreview');
  if (url) {
    img.src = url;
    img.style.display = 'block';
    img.onerror = () => img.style.display = 'none';
  } else {
    img.style.display = 'none';
  }
}

// Show preview on edit page load
window.addEventListener('DOMContentLoaded', () => {
  const url = document.getElementById('image_url').value;
  if (url) previewImage(url);
});