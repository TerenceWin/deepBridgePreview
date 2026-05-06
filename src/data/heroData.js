import bugZapper1 from '../images/catalogGenerator/bugZapper1.jpeg';
import bugZapper2 from '../images/catalogGenerator/bugZapper2.jpeg';
import bugZapper3 from '../images/catalogGenerator/bugZapper3.png';
import bugZapper4 from '../images/catalogGenerator/bugZapper4.jpeg';
import bugZapper5 from '../images/catalogGenerator/bugZapper5.jpeg';
import bugZapper6 from '../images/catalogGenerator/bugZapper6.jpeg';
import bugZapper7 from '../images/catalogGenerator/bugZapper7.jpeg';
import bugZapper8  from '../images/catalogGenerator/bugZapper8.png';
import bugZapper15 from '../images/catalogGenerator/bugZapper15.jpeg';
import factoryFinder1_1_1 from '../images/heroSection/factoryFinder/Factory Finder 1-1-1.webp';
import factoryFinder1_1_2 from '../images/heroSection/factoryFinder/Factory Finder 1-1-2.webp';
import factoryFinder1_1_3 from '../images/heroSection/factoryFinder/Factory Finder 1-1-3.webp';
import factoryFinder1_2_1 from '../images/heroSection/factoryFinder/Factory Finder 1-2-1.webp';
import factoryFinder1_2_2 from '../images/heroSection/factoryFinder/Factory Finder 1-2-2.webp';
import factoryFinder1_3_1 from '../images/heroSection/factoryFinder/Factory Finder 1-3-1.webp';
import factoryFinder2_1_1 from '../images/heroSection/factoryFinder/Factory Finder 2-1-1.webp';
import factoryFinder2_1_2 from '../images/heroSection/factoryFinder/Factory Finder 2-1-2.webp';
import vacuumCleaner1 from '../images/heroSection/quotationGenerator/vaccumCleaner1.png';

const data = {
  'Factory Finder': {
    'Marcus Lin': [
      {
        input: "Stainless steel pet bowls, OEM, MOQ under 500, Guangdong",
        output: [
          "Found 3 suppliers for 'Stainless steel pet bowls'. Source: online + database.",
          [{ name: 'Chaozhou Nicety Technology Co., Ltd' }, { url: 'https://cn-cnnicety.en.made-in-china.com/' }, { description: 'Stainless steel household items, lunch boxes, pet supplies. High quality OEM pet accessories.' }, { productImages: [factoryFinder1_1_1, factoryFinder1_1_2, factoryFinder1_1_3] }],
          [{ name: 'Dongguan ShunTa Melamine Products Co., Ltd.' }, { url: 'https://shunta.en.made-in-china.com/' }, { description: 'Melamine tableware, household kitchenware, pet accessories, 304 stainless steel double-layer bowls.' }, { productImages: [factoryFinder1_2_1, factoryFinder1_2_2] }],
          [{ name: 'GUANGZHOU UME TECHNOLOGY CO., LTD' }, { url: 'https://yuliangshun.en.made-in-china.com/' }, { description: 'Kitchen appliances, stainless steel dog bowl wholesale, pet food water bowls.' }, { productImages: [factoryFinder1_3_1] }],
        ],
        type: 'text',
      },
      {
        input: "Waterproof LED strip lights, CE certified, export experience to Europe",
        output: [
          "Found 1 supplier for 'Waterproof LED strip lights'. Source: online + database.",
          [{ name: 'Beauty (GD) Manufacturing Co., Limited' }, { url: 'https://beautystclighting.en.made-in-china.com/' }, { description: 'LED strip light, TUV CE RoHS IP67 waterproof 220V SMD2835 360LED/M rope double-row LED strip light.' }, { productImages: [factoryFinder2_1_1, factoryFinder2_1_2] }],
        ],
        type: 'text',
      },
      {
        input: "Bamboo cutting boards, food-safe finish, MOQ 200, Zhejiang",
        output: [
          "Found 2 suppliers for 'Bamboo cutting boards'. Source: online + database.",
          [{ name: 'Anji Tianzhu Bamboo Industry Co., Ltd' }, { url: 'https://anjitzbamboo.en.made-in-china.com/' }, { description: 'Bamboo kitchenware manufacturer, food-safe lacquer finish, custom engraving available, MOQ 200 units.' }, { productImages: [factoryFinder1_1_1, factoryFinder1_2_1] }],
          [{ name: 'Zhejiang Greenlife Bamboo Products Co.' }, { url: 'https://zjgreenlife.en.made-in-china.com/' }, { description: 'Eco-friendly bamboo cutting boards, FDA-approved food-safe coating, various sizes available.' }, { productImages: [factoryFinder1_3_1, factoryFinder2_1_1] }],
        ],
        type: 'text',
      },
    ],
  },

  'Generate Quotation': {
    'Marcus Lin': [
      {
        input: "Do we have new vacuum cleaners",
        output: [{
          type: 'productFound',
          description: "Yes, Chloe found this vacuum cleaner 2 days ago.",
          product: {
            name: "Cordless Stick Vacuum Cleaner VC-2200",
            price: "USD 28.50 / unit",
            moq: "500 units",
            specifications: ["12,000 Pa suction power", "2,200 mAh lithium battery", "45 min runtime (low mode)", "0.6L dust capacity", "Weight: 1.2 kg"],
            certificates: ["CE", "RoHS", "FCC"],
            image: vacuumCleaner1,
          },
        }],
      },
      {
        input: "Offer this to our vacuum cleaner customers in Europe",
        output: [{
          type: 'customerList',
          description: "We have 12 customers that have bought vacuum cleaners from us previously.",
          customers: [
            { company: 'CleanHome GmbH',         contact: 'Julia Bauer',         markup: '15%' },
            { company: 'Nordic Clean AB',         contact: 'Erik Lindqvist',      markup: '18%' },
            { company: 'Maison Propre SAS',       contact: 'Pierre Lefèvre',      markup: '20%' },
            { company: 'HygieneFirst B.V.',       contact: 'Sanne de Vries',      markup: '17%' },
            { company: 'VacuPro S.R.L.',          contact: 'Marco Ferretti',      markup: '14%' },
            { company: 'ClearSpace Ltd.',         contact: 'Oliver Bennett',      markup: '22%' },
            { company: 'Sauber & Sauber AG',      contact: 'Heike Müller',        markup: '16%' },
            { company: 'PureAir Iberia S.L.',     contact: 'Carlos Navarro',      markup: '19%' },
            { company: 'BrightFloor OÜ',          contact: 'Andres Tamm',         markup: '21%' },
            { company: 'PolishPro Sp. z o.o.',    contact: 'Agnieszka Kowalska',  markup: '13%' },
            { company: 'Vacuform A/S',            contact: 'Mikkel Hansen',       markup: '17%' },
            { company: 'CleanTech d.o.o.',        contact: 'Maja Novak',          markup: '15%' },
          ],
        }],
      },
      {
        input: "Can you update mark up for Nordic Clean AB to 8% instead",
        output: [{ type: 'markupSaved', description: "Done — Nordic Clean AB's markup updated to 8%." }],
      },
      {
        input: "Ok send it to them",
        output: [{
          type: 'emailDraft',
          subject: "New Product Offer: Cordless Stick Vacuum Cleaner VC-2200",
          preview: "Dear [Customer Name],\n\nWe are pleased to present a new sourcing opportunity — the Cordless Stick Vacuum Cleaner VC-2200, recently added to our catalogue. Please find your customised quotation attached.\n\nBest regards,\nMarcus Lin · DeepBridge Sourcing",
          sentTo: 12,
          summary: [
            { company: 'CleanHome GmbH',         contact: 'Julia Bauer',         markup: '15%', status: 'Sent' },
            { company: 'Nordic Clean AB',         contact: 'Erik Lindqvist',      markup: '8%',  status: 'Sent' },
            { company: 'Maison Propre SAS',       contact: 'Pierre Lefèvre',      markup: '20%', status: 'Sent' },
            { company: 'HygieneFirst B.V.',       contact: 'Sanne de Vries',      markup: '17%', status: 'Sent' },
            { company: 'VacuPro S.R.L.',          contact: 'Marco Ferretti',      markup: '14%', status: 'Sent' },
            { company: 'ClearSpace Ltd.',         contact: 'Oliver Bennett',      markup: '22%', status: 'Sent' },
            { company: 'Sauber & Sauber AG',      contact: 'Heike Müller',        markup: '16%', status: 'Sent' },
            { company: 'PureAir Iberia S.L.',     contact: 'Carlos Navarro',      markup: '19%', status: 'Sent' },
            { company: 'BrightFloor OÜ',          contact: 'Andres Tamm',         markup: '21%', status: 'Sent' },
            { company: 'PolishPro Sp. z o.o.',    contact: 'Agnieszka Kowalska',  markup: '13%', status: 'Sent' },
            { company: 'Vacuform A/S',            contact: 'Mikkel Hansen',       markup: '17%', status: 'Sent' },
            { company: 'CleanTech d.o.o.',        contact: 'Maja Novak',          markup: '15%', status: 'Sent' },
          ],
        }],
      },
    ],
  },

  'Handle Files': {
    'Marcus Lin': [{ input: "Please select a file", output: null, type: 'fileUpload' }],
  },

  'Catalog Generator': {
    'Marcus Lin': [
      {
        input: "Please Select all images",
        output: [],
      },
      {
        input: "Generates commercial images that shows the outdoor usage of this product",
        output: [{
          description: 'Generated 5 outdoor commercial images showcasing the product in real-world environments — garden, patio, and open-air settings.',
          products: [
            { image: bugZapper1, layout: 'full' },
            { image: bugZapper4 },
            { image: bugZapper5 },
            { image: bugZapper6 },
            { image: bugZapper7 },
          ],
        }],
      },
      {
        input: "I like it, generate a poster layout with all the images you provided.",
        output: [{
          description: 'Poster generated — hero outdoor shot combined with the 4 lifestyle images in a structured grid layout, ready for print and digital export.',
          products: [
            { image: bugZapper8, layout: 'full' },
          ],
        }],
      },
      {
        input: "Add the product description of TS_50311 to this poster layout",
        output: [{
          description: 'Updated poster — product description for TS_50311 added below the hero image. Key specs, features, and usage highlights pulled from the database and formatted into the layout.',
          products: [
            { image: bugZapper3, layout: 'full' },
          ],
        }],
      },
      {
        input: "Show me how it will look on a package box. Attach this poster to a package box design with the width: 113mm, length: 158mm, and height: 318mm",
        output: [{
          description: 'Package box mockup generated — 113 × 158 × 318mm dieline with the poster artwork applied to the front panel. Side panels left clean for barcode and product info.',
          products: [
            { image: bugZapper15, layout: 'full' },
            { image: bugZapper2, layout: 'full' },
          ],
        }],
      },
    ],
  },
};

export default data;

export const handleFilesFollowUps = {
  'handleFiles1.pptx': {
    'Marcus Lin': [
      { input: "What is the HS code and applicable tariff for this product?", output: [{ description: 'HS code 85081100. Under US-China tariffs (Section 301), additional duties may apply — recommend checking current HTS rates before importing.' }] },
      { input: "Can the supplier reduce the MOQ for a trial order?", output: [{ description: 'MOQ is 3,000 units at $9.80/unit. Supplier may negotiate 1,500 units at ~$11.20/unit for a trial — recommend requesting via sourcing agent.' }] },
      { input: "Is CE certification sufficient for EU market entry?", output: [{ description: 'CE and RoHS certifications cover EU market entry for this category. No additional product approvals required.' }] },
    ],
  },

  'handleFiles2.pptx': {
    'Marcus Lin': [
      { input: "What LED colors are available and what does each treat?", output: [{ description: '7 LED colors included. Typically: red (collagen), blue (acne), green (pigmentation), yellow (skin tone), cyan, purple, white. Request wavelength lab report before making treatment claims.' }] },
      { input: "Is the IPX6 waterproof rating sufficient for bathroom use?", output: [{ description: 'IPX6 is splash-proof and withstands water jets — suitable for bathroom use. Not submersible. Adequate for the intended personal care use case.' }] },
      { input: "What is the MOQ and can we get samples before ordering?", output: [{ description: 'MOQ is 5,000 units at $18/unit. Standard practice: request 2–5 pre-production samples at ~$50–$80/unit before committing. Confirm with supplier.' }] },
    ],
  },

  'handleFiles3.pptx': {
    'Marcus Lin': [
      { input: "What is EMS technology and how does it differ from standard vibration massagers?", output: [{ description: 'EMS (Electrical Muscle Stimulation) sends low-level electrical pulses to activate muscle tissue — targets deeper than surface vibration. Combined here with vibrating massage rollers for dual stimulation.' }] },
      { input: "Calculate total FOB value for a full 40HQ container.", output: [{ description: 'FOB price: $12.95/unit. 40HQ capacity: 53,000 units — total FOB value ~$686,350. Recommend negotiating pricing at full container volume.' }] },
      { input: "Are CE, RoHS, and FCC sufficient for selling in both EU and US?", output: [{ description: 'CE and RoHS cover EU. FCC covers US Part 15. Note: EMS devices may require additional FDA Class II clearance in the US — verify product classification before launch.' }] },
    ],
  },
};
