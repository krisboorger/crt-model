let E_step = 1e-10;
let E_max = 0;
let E_min = -2e-9;

let B_step = 1e-11;
let B_max = 1e-10;
let B_min = -1e-10;

function incrementValue(group) {
  if (group === 'E') {
    E = Math.min(E + E_step, E_max);
    document.getElementById("E_value").innerText = E;
    document.getElementById("Eslider").value = E;
  } else if (group === 'B') {
    B = Math.min(B + B_step, B_max);
    document.getElementById("B_value").innerText = B;
    document.getElementById("Bslider").value = B;
  }
}

function decrementValue(group) {
  if (group === 'E') {
    E = Math.max(E - E_step, E_min);
    document.getElementById("E_value").innerText = E;
    document.getElementById("Eslider").value = E;
  } else if (group === 'B') {
    B = Math.max(B - B_step, B_min);
    document.getElementById("B_value").innerText = B;
    document.getElementById("Bslider").value = B;
  }
}

function resetValue(group) {
  if (group === 'E') {
    E = 0;
    document.getElementById("E_value").innerText = E;
    document.getElementById("Eslider").value = E;
  } else if (group === 'B') {
    B = 0;
    document.getElementById("B_value").innerText = B;
    document.getElementById("Bslider").value = B;
  }
}
