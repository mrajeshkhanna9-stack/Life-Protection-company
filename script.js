const insuranceProducts = [
  {id:"life", icon:"❤", name:"Life Insurance", desc:"Protection for dependants and long-term financial planning."},
  {id:"health", icon:"✚", name:"Health Insurance", desc:"Medical expense protection for individuals and families."},
  {id:"motor", icon:"🚗", name:"Motor Insurance", desc:"Cover options for cars, two-wheelers and vehicles."},
  {id:"travel", icon:"✈", name:"Travel Insurance", desc:"Protection for eligible domestic and international journeys."},
  {id:"home", icon:"⌂", name:"Home Insurance", desc:"Protection for home structure and eligible contents."},
  {id:"business", icon:"▣", name:"Business Insurance", desc:"Protection solutions for businesses and commercial risks."},
  {id:"accident", icon:"🛡", name:"Personal Accident", desc:"Financial protection for eligible accidental events."},
  {id:"cyber", icon:"⌨", name:"Cyber Insurance", desc:"Protection against eligible cyber-related risks."},
  {id:"pet", icon:"🐾", name:"Pet Insurance", desc:"Insurance options for eligible veterinary and pet risks."},
  {id:"crop", icon:"🌾", name:"Crop Insurance", desc:"Agriculture-related protection subject to applicable schemes."}
];

/*
  DEMO RATE TABLE ONLY.
  These are NOT real insurance rates and must not be represented as quotes.
  Replace with approved product/insurer actuarial or tariff data before launch.
*/
const demoBaseRates = {
  life: {18:.006,25:.007,30:.008,35:.010,40:.013,45:.018,50:.026,55:.038,60:.055,65:.080,70:.110,75:.145,80:.180},
  health:{18:.012,25:.013,30:.015,35:.017,40:.021,45:.026,50:.034,55:.045,60:.060,65:.078,70:.100,75:.130,80:.160},
  accident:{18:.003,25:.0035,30:.004,35:.0045,40:.0055,45:.007,50:.009,55:.012,60:.016,65:.022,70:.030,75:.040,80:.055},
  motor:{18:.025,25:.023,30:.022,35:.021,40:.022,45:.024,50:.026,55:.028,60:.030,65:.033,70:.036,75:.040,80:.045},
  travel:{18:.004,25:.004,30:.004,35:.005,40:.006,45:.007,50:.009,55:.011,60:.014,65:.018,70:.023,75:.030,80:.040},
  home:{18:.0025,25:.0025,30:.0026,35:.0027,40:.0029,45:.0031,50:.0034,55:.0037,60:.004,65:.0043,70:.0047,75:.0052,80:.0058},
  business:{18:.004,25:.004,30:.0042,35:.0045,40:.005,45:.0055,50:.006,55:.0067,60:.0075,65:.0085,70:.010,75:.012,80:.015},
  cyber:{18:.003,25:.003,30:.0032,35:.0035,40:.004,45:.0046,50:.0053,55:.006,60:.007,65:.008,70:.0095,75:.011,80:.013},
  pet:{18:.004,25:.0042,30:.0045,35:.0048,40:.0052,45:.0058,50:.0065,55:.0073,60:.0082,65:.0092,70:.0105,75:.012,80:.014},
  crop:{18:.002,25:.002,30:.002,35:.0021,40:.0022,45:.0024,50:.0026,55:.0029,60:.0032,65:.0036,70:.004,75:.0045,80:.005}
};

const conditionLoading = {standard:1, controlled:1.20, major:1.60};

function nearestRate(table, age){
  const ages = Object.keys(table).map(Number).sort((a,b)=>a-b);
  if(age <= ages[0]) return table[ages[0]];
  if(age >= ages[ages.length-1]) return table[ages[ages.length-1]];
  let nearest = ages.reduce((prev,curr)=>Math.abs(curr-age)<Math.abs(prev-age)?curr:prev);
  return table[nearest];
}

function money(value){
  return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(value);
}

function populateSelects(){
  const options = insuranceProducts.map(p=>`<option value="${p.id}">${p.name}</option>`).join("");
  document.getElementById("insuranceType").innerHTML = options;
  document.getElementById("quoteType").innerHTML = `<option value="">Select insurance type</option>` + options;
}

function renderCards(){
  document.getElementById("insuranceCards").innerHTML = insuranceProducts.map(p=>`
    <article class="card">
      <div class="card-icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <button type="button" onclick="selectInsurance('${p.id}')">Estimate / Enquire →</button>
    </article>
  `).join("");
}

function selectInsurance(id){
  document.getElementById("insuranceType").value = id;
  document.getElementById("quoteType").value = id;
  document.getElementById("calculator").scrollIntoView({behavior:"smooth"});
}

function calculatePremium(){
  const type = document.getElementById("insuranceType").value;
  const age = Math.max(18, Math.min(80, Number(document.getElementById("age").value)));
  const coverage = Number(document.getElementById("coverage").value);
  const term = Number(document.getElementById("term").value);
  const condition = document.getElementById("condition").value;
  const smoker = document.getElementById("smoker").checked;

  let rate = nearestRate(demoBaseRates[type], age);
  let termFactor = 1 + ((term - 10) * 0.012);
  let genderFactor = document.getElementById("gender").value === "female" ? 0.94 : 1;
  let smokerFactor = smoker ? 1.35 : 1;

  let annual = coverage * rate * termFactor * genderFactor * conditionLoading[condition] * smokerFactor;

  // Demo minimum to make small products visible in the UI.
  annual = Math.max(annual, 500);

  document.getElementById("premiumResult").innerHTML =
    `<div>Illustrative annual premium</div><strong>${money(annual)}</strong>
     <div class="microcopy">Demo estimate for website testing only. Not a quote or guaranteed premium.</div>`;
}

document.getElementById("premiumForm").addEventListener("submit", e=>{
  e.preventDefault();
  calculatePremium();
});

document.getElementById("quoteForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("fullName").value.trim();
  const type = document.getElementById("quoteType").value;
  const selected = insuranceProducts.find(p=>p.id===type);
  document.getElementById("quoteMessage").textContent =
    `Thank you, ${name}. Your enquiry for ${selected ? selected.name : "insurance"} has been prepared. Connect this form to your secure email/CRM service to actually receive submissions.`;
  e.target.reset();
});

document.getElementById("menuBtn").addEventListener("click", ()=>{
  document.getElementById("mainNav").classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>{
  document.getElementById("mainNav").classList.remove("open");
}));

document.getElementById("year").textContent = new Date().getFullYear();
populateSelects();
renderCards();
