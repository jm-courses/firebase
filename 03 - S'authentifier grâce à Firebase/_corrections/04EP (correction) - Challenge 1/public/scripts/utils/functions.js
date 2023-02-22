export function createFormAlert(parentElement, alertType = 'alert-dark') {
  /* if (!(parentElement instanceof HTMLFormElement)) {
    throw new Error(`"First argument "parentElement" should be a <form> element. Given ${parentElement}`);
  } */

  const alertElement = document.createElement('div');
  alertElement.classList.add('alert', alertType);

  return (message) => {
    if (parentElement.contains(alertElement)) {
      parentElement.removeChild(alertElement);
    }

    if (message === null) return;

    alertElement.textContent = message;
    parentElement.insertAdjacentElement('afterbegin', alertElement);
  };
}
