// ENVIRONMENT VARIABLES
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const cheerio = require("cheerio");

// Load HTML
const htmlContent = fs.readFileSync(process.env.WEBPAGE, "utf8");
const $ = cheerio.load(htmlContent);

// JSON structure for steps
let formSchema = {
  step1: {
    title: "Aadhaar Verification",
    fields: []
  },
  step2: {
    title: "PAN Verification",
    fields: []
  }
};

// Decide which step a field belongs to
function getStep(fieldNameOrId) {
  if (!fieldNameOrId) return null;
  const name = fieldNameOrId.toLowerCase();
  if (name.includes("adhar") || name.includes("otp")) return "step1";
  if (name.includes("pan")) return "step2";
  return null; // Ignore unrelated fields
}

// Loop through form fields
$("input, select, textarea").each((_, el) => {
  const id = $(el).attr("id") || null;
  const name = $(el).attr("name") || null;

  const step = getStep(id || name);
  if (!step) return; // Skip unrelated fields

  formSchema[step].fields.push({
    id,
    name,
    type: $(el).attr("type") || null,
    maxlength: $(el).attr("maxlength") || null,
    pattern: $(el).attr("pattern") || null
  });
});

// Save schema to JSON file
fs.writeFileSync("udyam_form_schema.json", JSON.stringify(formSchema, null, 2), "utf8");

console.log("✅ Form schema saved to udyam_form_schema.json");
