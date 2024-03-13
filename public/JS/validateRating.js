const radio = document.querySelectorAll('.radio');
const submitReview = document.querySelector('#submitReview');
const alertWrapper = document.querySelector('#alertWrapper')
const submitWrapper = document.querySelector('.submitWrapper')

submitReview.disabled = true;

radio.forEach(radio => radio.addEventListener('click', event => {
    if (event) {
    submitReview.disabled = false;
  }
}));

submitReview.addEventListener('click', event => {
  event.stopPropagation();
});

submitWrapper.addEventListener('click', event => {
alertWrapper.innerHTML =
`<div class="alert alert-danger" role="alert">
You must rate the campsite before submitting a review
</div>`;
});