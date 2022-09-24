const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

(function validator() {
    const inputTags = [...$$("input")];
    const toggleIcons = [...$$(".fa-eye"), ...$$(".fa-eye-slash")];
    const submitBtn = $(".form__submit-btn");
    const toggleIcon = [...$$(".toggle-pass")];
    const inputPassTags = [...$$("input[type=password]")];

    const app = {
        message: {
            "inp-name": {
                isValid: false,
                messageElement: $(".name-mes"),
                validate: function (value) {
                    return value ? null : "This name is not valid!";
                }
            },
            "inp-email": {
                isValid: false,
                messageElement: $(".email-mes"),
                validate: function (value) {
                    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    return regex.test(value) ? null : "This emal is not valid";
                }
            },
            "inp-pass": {
                isValid: false,
                messageElement: $(".pass-mes"),
                validate: function (value) {
                    return value ? null : "Please type password!";
                }
            },
            "inp-conf-pass": {
                isValid: false,
                messageElement: $(".conf-pass-mes"),
                validate: function (value) {
                    const inputPass = $(".inp-pass").value;
                    return !value ? "Please type password!":
                            inputPass == value ? null : "This password is not correct!";
                }
            }
        },
        handleShowmessage: function () {
            inputTags.forEach(inputTag => {
                inputTag.onblur = (e) => { app.showMessage(e.target) };
            })

            submitBtn.onclick = function () {
                const messArr = app.message;
                let result = true;

                for (const selector in messArr) {
                    result = result && messArr[selector].isValid;
                    if (messArr[selector].isValid) continue;
                    else app.showMessage($(`.${selector}`));
                }
                console.log(result);
                if (result) app.submitInfor(app.message);
            }
        },
        showMessage: function (selectedElement) {
            const messageCont =
                this.message[selectedElement.className].validate(selectedElement.value);
            const messageTag =
                this.message[selectedElement.className].messageElement;

            if (!(messageCont)) this.message[selectedElement.className].isValid = true;
            else this.message[selectedElement.className].isValid = false;

            messageTag.innerText = messageCont;
        },
        toggleHidingPass: function () {
            toggleIcons.forEach(icon => {
                icon.onclick = e => {
                    const isHidden = toggleIcon.some(tag => tag.classList.contains("hide"));

                    toggleIcon.forEach(tag => { tag.classList.toggle("hide") });
                    if (isHidden) inputPassTags.forEach(tag => { tag.type = "text" });
                    else inputPassTags.forEach(tag => tag.type = "password");
                }
            });
        },
        submitInfor: function (messageObjs) {
            alert("Information was sent!");
            //  Sending data action!
        },
        handleEvent: function () {
            this.handleShowmessage();
            this.toggleHidingPass();
        },
        start: function () {
            this.handleEvent();
        }
    }

    app.start();
})();