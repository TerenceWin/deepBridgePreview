import factoryFinder1_1_1 from '../images/heroSection/Factory Finder 1-1-1.webp';
import factoryFinder1_1_2 from '../images/heroSection/Factory Finder 1-1-2.webp';
import factoryFinder1_1_3 from '../images/heroSection/Factory Finder 1-1-3.webp';
import factoryFinder1_2_1 from '../images/heroSection/Factory Finder 1-2-1.webp';
import factoryFinder1_2_2 from '../images/heroSection/Factory Finder 1-2-2.webp';
import factoryFinder1_2_3 from '../images/heroSection/Factory Finder 1-2-3.webp';
import factoryFinder1_3_1 from '../images/heroSection/Factory Finder 1-3-1.webp';

const data = {
  'Factory Finder' : [
    {
      input: "Stainless steel pet bowls, OEM, MOQ under 500, Guangdong", 
      output : ["Found 3 suppliers for 'Stainless steel pet bowls, OEM, MOQ under 500, Guangdong'. 0 with emails. Source: online + database.", 
        [{name: 'Chaozhou Nicety Technology Co., Ltd'}, {url: 'https://cn-cnnicety.en.made-in-china.com/'}, {description: 'Stainlesssteelhousehold items, stainlesssteellunch boxes, stainlesssteelpetsupplies, High QualityPetSuppliesStainlessSte...'}, 
          {productImages : [factoryFinder1_1_1, factoryFinder1_1_2, factoryFinder1_1_3]}
        ], 
        [{name: 'Dongguan ShunTa Melamine Products Co., Ltd.'}, {url: 'https://shunta.en.made-in-china.com/'}, {description: 'Melamine Tableware, Household, Kitchen Ware, PetsAccessories, Chopsticks, 304StainlessSteelSmall Siver Color Double-Laye...'}, 
            {productImages : [factoryFinder1_2_1, factoryFinder1_2_2, factoryFinder1_2_3]}
        ], 
        [{name: 'GUANGZHOU UME TECHNOLOGY CO., LTD'}, {url: 'https://yuliangshun.en.made-in-china.com/?ads_tp=&ads_id=GNZfyqKxZIlA'}, {description: 'Kitchen Appliances, Stainless-Steel-Metal DogBowlWholesalePetFood Water Cheap Affordable and Practical'},
            {productImages : [factoryFinder1_3_1]}
        ]
      ], 
      type: "text", 
    }, 
    {
      input: "Waterproof LED strip lights, CE certified, export experience to Europe", 
      output : ["Found 1 supplier for 'Waterproof LED strip lights, CE certified, export experience to Europe'. 0 with emails. Source: online + database.", 
        [{name: 'Beauty (GD) Manufacturing Co., Limited'}, {url: 'https://beautystclighting.en.made-in-china.com/'}, {description: 'LEDStripLight, TUVCERoHS IP67Waterproof220V SMD2835 360LED/M Rope Double-RowLEDStripLight, TUVCERoHS Outdoor RopeLightsC...'}, 
          {productImages : [factoryFinder1_1_1, factoryFinder1_1_2, factoryFinder1_1_3]}
        ]
      ], 
      type: "text"
    }, 
    // {
    //   input: "Photo of a wooden hair styling tool (uploaded image)", 
    //   output: "", 
    //   type: "image"
    // }
  ], 
  'Generate Quotation' : [
    {
      input: "Product ID: SKU-00341, Markup: 22%, Sender: amen@deep-bridge.com ", 
      output : [{description: 'PDF/PPT quotation with product specs, unit price + markup applied, sender branding, and ready-to-send format'}
      ], 
      type: "text", 
    }, 
  ],
  'Handle Files' : [
    {
        input: "BSCI audit certificate PDF", 
        output: [{description: 'Parsed audit score, expiry date, factory name, compliance status'}],
        type: 'document'
    }, 
  ], 
  'Catalog Generator': [
    {
        input: "Brand logo, product images (x8), product names + descriptions", 
        output: [{description: 'Branded PDF catalog with product pages, consistent layout, and downloadable file'}],
        type: 'logo/ images/ text'
    },
]}

export default data;