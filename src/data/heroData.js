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
import factoryFinder3_1_1 from '../images/heroSection/factoryFinder/Factory Finder 3-1-1.jpg';
import factoryFinder3_1_2 from '../images/heroSection/factoryFinder/Factory Finder 3-1-2.jpg';
import factoryFinder3_2_1 from '../images/heroSection/factoryFinder/Factory Finder 3-2-1.jpg';
import factoryFinder3_2_2 from '../images/heroSection/factoryFinder/Factory Finder 3-2-2.jpg';
import vacuumCleaner1 from '../images/heroSection/quotationGenerator/vaccumCleaner1.png';

const data = {
  'Factory Finder': {
    'Marcus Lin': [
      {
        input: "Stainless steel pet bowls, OEM, MOQ under 500, Guangdong",
        output: [
          "Found 3 suppliers for 'Stainless steel pet bowls'. Source: online + database.",
          [{ name: 'Guangdong Haoyu Metal Products Co., Ltd' }, { description: 'Stainless steel household items, lunch boxes, pet supplies. High quality OEM pet accessories.' }, { productImages: [factoryFinder1_1_1, factoryFinder1_1_2, factoryFinder1_1_3] }],
          [{ name: 'Dongguan Mingfa Household Products Co., Ltd.' }, { description: 'Melamine tableware, household kitchenware, pet accessories, 304 stainless steel double-layer bowls.' }, { productImages: [factoryFinder1_2_1, factoryFinder1_2_2] }],
          [{ name: 'Guangzhou Runda Technology Co., Ltd' }, { description: 'Kitchen appliances, stainless steel dog bowl wholesale, pet food water bowls.' }, { productImages: [factoryFinder1_3_1] }],
        ],
        type: 'text',
      },
      {
        input: "Waterproof LED strip lights, CE certified, export experience to Europe",
        output: [
          "Found 1 supplier for 'Waterproof LED strip lights'. Source: online + database.",
          [{ name: 'Shenzhen Brightex Lighting Co., Limited' }, { description: 'LED strip light, TUV CE RoHS IP67 waterproof 220V SMD2835 360LED/M rope double-row LED strip light.' }, { productImages: [factoryFinder2_1_1, factoryFinder2_1_2] }],
        ],
        type: 'text',
      },
      {
        input: "Bamboo cutting boards, food-safe finish, MOQ 200, Zhejiang",
        output: [
          "Found 2 suppliers for 'Bamboo cutting boards'. Source: online + database.",
          [{ name: 'Anji Qingshan Bamboo Industry Co., Ltd' }, { description: 'Bamboo kitchenware manufacturer, food-safe lacquer finish, custom engraving available, MOQ 200 units.' }, { productImages: [factoryFinder3_1_1, factoryFinder3_1_2] }],
          [{ name: 'Zhejiang Lvmei Bamboo Products Co.' }, { description: 'Eco-friendly bamboo cutting boards, FDA-approved food-safe coating, various sizes available.' }, { productImages: [factoryFinder3_2_1, factoryFinder3_2_2] }],
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
        input: "Add the product description of #12345 to this poster layout",
        output: [{
          description: 'Updated poster — product description for #12345 added below the hero image. Key specs, features, and usage highlights pulled from the database and formatted into the layout.',
          products: [
            { image: bugZapper3, layout: 'full' },
          ],
        }],
      },
      {
        input: "Show me how it will look on a package box. ",
        output: [{
          description: 'Package box mockup generated — 113 × 158 × 318mm dieline with the poster artwork applied to the front panel. Side panels left clean for barcode and product info.',
          products: [
            { image: bugZapper2, layout: 'full' },
            { image: bugZapper15, layout: 'full' },
          ],
        }],
      },
    ],
  },
};

export default data;

const riskFlagsFollowUp = {
  input: "Supplier: Guangdong Metalworks Co. — review their quotation package for #12345",
  output: [{
    type: 'riskFlags',
    summary: { critical: 2, warning: 1, clear: 2 },
    flags: [
      {
        severity: 'critical',
        category: 'CERTIFICATE',
        title: 'CE certificate expired',
        description: 'Provided CE cert expired Mar 2024. EU buyer orders will be blocked at customs without a valid certificate.',
        action: 'Ask supplier to resubmit',
      },
      {
        severity: 'critical',
        category: 'DOCUMENTATION',
        title: 'No test report attached',
        description: 'Quotation references ASTM F963 compliance but no third-party test report was included in the package.',
        action: 'Request test report',
      },
      {
        severity: 'warning',
        category: 'COMPLIANCE',
        title: 'MOQ inconsistency',
        description: 'Email states MOQ 300 units but quotation PDF shows 500 units. Confirm before sharing with buyer.',
        action: 'Clarify with supplier',
      },
    ],
  }],
};

export const handleFilesFollowUps = {
  'Product #12345.pptx': {
    'Marcus Lin': [
      { input: "What is the HS code and applicable tariff for this product?", output: [{ description: 'HS code 85081100. Under US-China tariffs (Section 301), additional duties may apply — recommend checking current HTS rates before importing.' }] },
      {
        input: "Can the supplier reduce the MOQ for a trial order?",
        output: [{
          type: 'emailDraft',
          to: ['sales@guangdongmeidea.com'],
          subject: 'Trial Order Request – MOQ Reduction for #12345',
          preview: `Dear Sales Team,\n\nThank you for the quotation for #12345. We are interested in moving forward, but would like to start with a trial order before committing to the full MOQ.\n\nThe current MOQ of 3,000 units is above our initial requirement. We would like to request a reduced trial quantity of 1,500 units to evaluate product reception with our buyers.\n\nCould you please advise the adjusted unit price at 1,500 units? We understand this may carry a higher per-unit cost and are happy to discuss terms.\n\nLooking forward to your response.\n\nBest regards,\nMarcus Lin · DeepBridge Sourcing`,
          sentTo: 1,
          summary: [{ company: 'Guangdong Meidea Industrial Co., Ltd.', contact: 'Sales Team', markup: '—', status: 'Sent' }],
        }],
      },
      {
        input: "Is CE certification sufficient for EU market entry?",
        output: [{
          type: 'emailDraft',
          to: ['compliance@clearhome.de'],
          subject: 'Certification Confirmation – #12345 EU Market Entry',
          preview: `Dear Compliance Team,\n\nWe are preparing to introduce product #12345 to your market and would like to confirm that the current certifications meet your requirements.\n\nThe product holds CE and RoHS certifications, which we believe cover EU market entry for this category. Could you please confirm whether these are sufficient for your import process, or advise if any additional documentation is required on your end?\n\nWe want to ensure a smooth onboarding before we proceed with a formal quotation.\n\nBest regards,\nMarcus Lin · DeepBridge Sourcing`,
          sentTo: 1,
          summary: [{ company: 'CleanHome GmbH', contact: 'Julia Bauer', markup: '—', status: 'Sent' }],
        }],
      },
    ],
  },
};
