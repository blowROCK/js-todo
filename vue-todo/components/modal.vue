<template>
  <div class="modal" id="modal">
    <div class="modal__content">
      <div class="modal__content__textBox">
        <textarea id="textarea" class="modal__content__textBox__textarea" placeholder="내용을 입력 하세요." maxlength="120"></textarea>
        <div id="tooltip" class="modal__content__textBox_tooltip"></div>
      </div>
      <div class="modal__content__btnBox">
        <div id="delete" class="modal__content__textBox__delete">Delete</div>
        <div id="submit" class="modal__content__textBox__submit" onclick="test()">Submit</div>
      </div>
    </div>
    <div class="modal__back"></div>
  </div>
</template>

<style>

</style>
