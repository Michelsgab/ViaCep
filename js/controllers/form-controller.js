import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

function State() {
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;

  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;

  this.errorCep = null;
  this.errorNumber = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep;
  state.inputStreet = document.forms.newAddress.street;
  state.inputNumber = document.forms.newAddress.number;
  state.inputCity = document.forms.newAddress.city;

  state.btnSave = document.forms.newAddress.btnSave;
  state.btnClear = document.forms.newAddress.btnClear;

  state.errorCep = document.querySelector('[data-error="cep"]');
  state.errorNumber = document.querySelector('[data-error="number"]');

  state.inputNumber.addEventListener("change", handleInputNumberChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);
  state.inputCep.addEventListener("change", handleInputCepChange);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.btnSave.addEventListener("click", handleBtnSaveClick);
}

function handleInputNumberChange(e) {
  e.target.value == ""
    ? setFormError("number", "Número é um campo obrigatório")
    : setFormError("number", "");
}

function handleBtnClearClick(e) {
  e.preventDefault();
  clearForm();
}

function handleBtnSaveClick(e) {
  e.preventDefault();
  const errors = addressService.getErrors(state.address);
  const keys = Object.keys(errors);
  if (keys.length > 0) {
    keys.forEach((key) => {
      setFormError(key, errors[key]);
    });
  } else {
    listController.addCard(state.address);
    clearForm();
  }
}

async function handleInputCepChange(e) {
  const cep = e.target.value;
  try {
    const address = await addressService.findByCep(cep);
    state.inputStreet.value = address.street;
    state.inputCity.value = address.city;
    state.address = address;

    setFormError("cep", "");
    state.inputNumber.focus();
  } catch (e) {
    state.inputStreet.value = "";
    state.inputCity.value = "";
    setFormError("cep", "Informe um CEP válido");
  }
}

function handleInputNumberKeyup(e) {
  state.address.number = e.target.value;
}

function clearForm() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";

  state.inputCep.focus();

  setFormError("cep", "");
  setFormError("number", "");

  state.addres = new Address();
}

function setFormError(key, value) {
  const element = document.querySelector(`[data-error="${key}"]`);
  element.innerHTML = value;
}
