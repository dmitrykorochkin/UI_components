//form

const formElements = document.querySelector(".form-elements");
const telSelector = formElements.querySelector("input[type='tel']");
const inputMask = new Inputmask("+7 (999) 999-99-99");
const modal = document.querySelector(".modal-inner");
const button = document.querySelector(".button");
inputMask.mask(telSelector);

  const validation = new JustValidate(".form-elements");

validation
.addField('#check',[
  {
      rule:'required',
      value:true,
      errorMessage: 'Примите условия соглашения!'
  }
])
.addField('#name', [
  {
    rule: "minLength",
    value: 2,
    errorMessage: "Количество символов меньше 2"
  },
  {
    rule: "maxLength",
    value: 20,
    errorMessage: "Количество символов больше 20!"
  },
  {
    rule: "required",
    value: true,
    errorMessage: "Введите имя"
  }
])
.addField("#telephone", [
  {
    rule: "required",
    value: true,
    errorMessage: "Введите номер телефона!"
  },
  {
    rule: "function",
    validator: function() {
      const phone = telSelector.inputmask.unmaskedvalue();
      return phone.length === 10;
    },
    errorMessage: "Введите корректный номер телефона!"
  }
])

.addField("#email", [
  {
    rule: "required",
    email: true,
    errorMessage: "Введите email"
  }
]).onSuccess(e => {
  if (document.querySelector("#check").checked) {
    const sendForm = data => {
      return fetch("mail.php", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json, charset=UTF-8"
        }
      }).then(res => res.json());
    };

    const dataForm = new FormData(e.target);
    const user = {};

    dataForm.forEach((val, key) => {
      user[key] = val;
    });

    sendForm(user).then(data => {
      
      console.log("Ушло");
      modal.classList.add("active");
    });

    e.target.reset();
  }
});



//modal
modal.addEventListener("click", e => {
  const isModal = e.target.closest(".modal__inner");
  if (!isModal) {
    modal.classList.remove("active");
  }
});
