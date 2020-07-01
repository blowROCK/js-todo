const showModal = function (type, contents = '') {
    const modal = document.getElementById('modal');
    const ta = document.getElementById('textarea');
    modal.classList.add('active', type);
    ta.value = contents;
    return new Promise((resolve)=>{
        document.querySelector('#submit').onclick=function(){
            if(!isInvalidChar(ta.value) && ta.value.length < 120){
                resolve({type:'success', body:ta.value});
                hideModal();
            }
        }
        document.querySelector('#delete').onclick=function () {
            resolve({type:'delete'});
            hideModal();
        }
        document.querySelector('.modal__back').onclick=function(){
            resolve({type:'close', once:true});
            hideModal();
        }
    })
}
const hideModal = function () {
    const modal = document.getElementById('modal');
    const ta = document.getElementById('textarea');
    const tip = document.getElementById('tooltip');
    modal.classList.remove('active', 'modify', 'create');

    ta.value = '';
    tip.innerHTML = '';
}

const setTooltip = function (message) {
    const tip = document.getElementById('tooltip');
    tip.innerHTML = message;
}
const setModal = function (id) {
    document.getElementById(id).addEventListener('input', (event)=>{
        const val = event.currentTarget.value;
        if(isInvalidChar(val)){
            setTooltip('!@#$%^&*()_+=,.? 를 제외한 특수 문자는 금지입니다.');
        }else if(val.length >= 120){
            setTooltip("최대 글자수 120자를 넘길 수 없습니다.")
        }else{
            setTooltip('');
        }
    },false);
}
const isInvalidChar = function (str) {
    const rex1 = /[^a-z|A-Z|가-힣|ㄱ-ㅎㅏ-ㅣ0-9|!@#$%^&*()_+=,.?|\n\s\r]/g;
    return rex1.test(str);
}

export {showModal, setModal};