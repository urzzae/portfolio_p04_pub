// contactForm.js
const EMAIL_RE =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function isFilled(value) {
  return value.trim() !== "";
}

function isEmail(value) {
  return EMAIL_RE.test(value.trim());
}

function isPhone(value) {
  const digits = value.replace(/[^0-9]/g, "");
  return /^0\d{8,10}$/.test(digits);
}

const errorMsg = {
  id: "성함 또는 회사명을 입력해주세요.",
  email: {
    invalid: "이메일 주소를 입력해주세요.",
    fail: "정확한 이메일 주소를 입력해주세요.",
  },
  phoneNumber: {
    invalid: "연락처를 입력해주세요.",
    fail: "올바른 연락처를 입력해주세요.",
  },
  service: "필요 서비스를 1개 이상 선택해주세요.",
  agree: "개인정보 수집 및 이용에 동의해주세요.",
};

function showFieldError(input, message) {
  input.parentElement.classList.add("visible");
  input.nextElementSibling.textContent = message;
}
function clearFieldError(input) {
  input.parentElement.classList.remove("visible");
}

function toggleTip(tip, show) {
  tip.classList.toggle("visible", show);
}

function checkId(input) {
  if (!isFilled(input.value)) {
    showFieldError(input, errorMsg.id);
    return false;
  }
  clearFieldError(input);
  return true;
}

function checkEmail(input) {
  const value = input.value;
  if (!isFilled(value)) {
    showFieldError(input, errorMsg.email.invalid);
    return false;
  }
  if (!isEmail(value)) {
    showFieldError(input, errorMsg.email.fail);
    return false;
  }
  clearFieldError(input);
  return true;
}

function checkPhoneNumber(input) {
  const value = input.value;
  if (!isFilled(value)) {
    showFieldError(input, errorMsg.phoneNumber.invalid);
    return false;
  }
  if (!isPhone(value)) {
    showFieldError(input, errorMsg.phoneNumber.fail);
    return false;
  }
  clearFieldError(input);
  return true;
}

function checkService() {
  const checked =
    document.querySelectorAll("input[name=service]:checked").length > 0;
  toggleTip(
    document.querySelector(".contact_form_content > .not_valid_tip"),
    !checked,
  );
  return checked;
}

function checkAgree() {
  const agreed = document.getElementById("agree_info").checked;
  toggleTip(document.querySelector(".agree_wrap > .not_valid_tip"), !agreed);
  return agreed;
}

function checkComment(textarea) {
  if (!isFilled(textarea.value)) {
    document.querySelector(".cm_alert_typo").innerHTML =
      "디자인210과 진행하고 싶은<br>프로젝트의 내용을 남겨주세요";
    popOpen("alert");
    return false;
  }
  return true;
}

function handleSubmit(e) {
  e.preventDefault();

  const id = document.getElementById("id");
  const email = document.getElementById("email");
  const phoneNumber = document.getElementById("phoneNumber");
  const contents = document.getElementById("contents");

  const results = [
    { valid: checkId(id), field: id },
    { valid: checkEmail(email), field: email },
    { valid: checkPhoneNumber(phoneNumber), field: phoneNumber },
    { valid: checkService(), field: null },
    { valid: checkAgree(), field: null },
  ];

  const firstInvalid = results.find((result) => !result.valid);
  if (firstInvalid) {
    if (firstInvalid.field) firstInvalid.field.focus();
    return;
  }

  if (!checkComment(contents)) return;

  document.querySelector(".cm_alert_typo").innerHTML =
    "문의가 정상적으로 접수되었습니다.<br>빠른 시일 내로 연락드리겠습니다.";
  popOpen("alert");
  e.target.closest("form").reset();
}

document.addEventListener("click", (e) => {
  if (e.target.closest("button[type=submit]")) {
    handleSubmit(e);
  }
});
