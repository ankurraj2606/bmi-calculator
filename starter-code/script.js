const height = document.getElementById("height");
const weight = document.getElementById("weight");
const bmiDiv = document.getElementById("bmi");

const bmiResultDiv = document.getElementById("got-res");
const checkBmi = document.getElementById("no-res");

// Imperial inputs
const ft = document.getElementById("ft");
const inch = document.getElementById("in");
const st = document.getElementById("st");
const lbs = document.getElementById("lbs");

let bmi = null;
let currentUnit = "metric";

function debounce(func, delay = 1700) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function toggleUnitSection() {
  const isImperial = document.getElementById("imperial").checked;

  document.getElementById("imperial-section").style.display = isImperial
    ? "flex"
    : "none";

  document.getElementById("metric-section").style.display = isImperial
    ? "none"
    : "flex";

  currentUnit = isImperial ? "imperial" : "metric";
  bmi = null;
  toggleResult(false);
}

document.querySelectorAll('input[name="unit"]').forEach((radio) => {
  radio.addEventListener("change", toggleUnitSection);
});

function toggleResult(hasBmi) {
  checkBmi.classList.toggle("no-display", hasBmi);
  bmiResultDiv.classList.toggle("no-display", !hasBmi);
}

let lastHeight = null;
let lastWeight = null;

// Get BMI classification and description
function getBMIClassification(bmi, heightInCm) {
  const description = document.getElementById("bmi-description");
  const idealWeightRange = document.getElementById("ideal-weight-range");

  // Calculate ideal weight range (BMI 18.5-24.9)
  const heightInM = heightInCm / 100;
  const minWeight = (18.5 * heightInM * heightInM).toFixed(1);
  const maxWeight = (24.9 * heightInM * heightInM).toFixed(1);

  const unit = currentUnit === "metric" ? "kgs" : "lbs";
  let minDisplay = minWeight;
  let maxDisplay = maxWeight;

  if (currentUnit === "imperial") {
    minDisplay = (minWeight * 2.20462).toFixed(1);
    maxDisplay = (maxWeight * 2.20462).toFixed(1);
  }

  idealWeightRange.textContent = `${minDisplay}${unit} - ${maxDisplay}${unit}`;

  if (bmi < 18.5) {
    description.innerHTML = `Your BMI suggests you're <strong>underweight</strong>. Your ideal weight is between <span id="ideal-weight-range">${minDisplay}${unit} - ${maxDisplay}${unit}</span>.`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    description.innerHTML = `Your BMI suggests you're a <strong>healthy weight</strong>. Your ideal weight is between <span id="ideal-weight-range">${minDisplay}${unit} - ${maxDisplay}${unit}</span>.`;
  } else if (bmi >= 25 && bmi <= 29.9) {
    description.innerHTML = `Your BMI suggests you're <strong>overweight</strong>. Your ideal weight is between <span id="ideal-weight-range">${minDisplay}${unit} - ${maxDisplay}${unit}</span>.`;
  } else {
    description.innerHTML = `Your BMI suggests you're <strong>obese</strong>. Your ideal weight is between <span id="ideal-weight-range">${minDisplay}${unit} - ${maxDisplay}${unit}</span>.`;
  }
}

const calculateBMI = (height, weight) => {
  if (height === lastHeight && weight === lastWeight) return;

  lastHeight = height;
  lastWeight = weight;

  if (!height || height <= 0 || !weight || weight <= 0) {
    bmi = null;
    toggleResult(false);
    return;
  }

  const heightInMeters = height / 100;
  bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);

  bmiDiv.innerText = bmi;
  getBMIClassification(parseFloat(bmi), height);
  toggleResult(true);
};

const bmiImperial = (ftVal, inchVal, stVal, lbsVal) => {
  // Convert to numbers and handle empty values
  ftVal = Number(ftVal) || 0;
  inchVal = Number(inchVal) || 0;
  stVal = Number(stVal) || 0;
  lbsVal = Number(lbsVal) || 0;

  // Check if all values are valid
  if (ftVal <= 0 && inchVal <= 0) {
    bmi = null;
    toggleResult(false);
    return;
  }

  if (stVal <= 0 && lbsVal <= 0) {
    bmi = null;
    toggleResult(false);
    return;
  }

  const heightInCm = (ftVal * 12 + inchVal) * 2.54;
  const weightInKg = (stVal * 14 + lbsVal) * 0.453592;
  const heightInM = heightInCm / 100;
  bmi = (weightInKg / (heightInM * heightInM)).toFixed(1);
  bmiDiv.innerText = bmi;
  getBMIClassification(parseFloat(bmi), heightInCm);
  toggleResult(true);
};

const debouncedBMI = debounce(calculateBMI);
const debouncedImperialBMI = debounce(bmiImperial);

const handleInput = () =>
  debouncedBMI(Number(height.value), Number(weight.value));

const handleImperialInput = () =>
  debouncedImperialBMI(
    Number(ft.value),
    Number(inch.value),
    Number(st.value),
    Number(lbs.value)
  );

height.addEventListener("input", handleInput);
weight.addEventListener("input", handleInput);

ft.addEventListener("input", handleImperialInput);
inch.addEventListener("input", handleImperialInput);
st.addEventListener("input", handleImperialInput);
lbs.addEventListener("input", handleImperialInput);
