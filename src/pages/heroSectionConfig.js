import handleFiles1 from '../images/heroSection/handleFiles/handleFiles1.pptx';
import bugZapper9  from '../images/catalogGenerator/bugZapper9.jpeg';
import bugZapper10 from '../images/catalogGenerator/bugZapper10.jpeg';
import bugZapper11 from '../images/catalogGenerator/bugZapper11.jpeg';
import bugZapper12 from '../images/catalogGenerator/bugZapper12.jpeg';
import bugZapper13 from '../images/catalogGenerator/bugZapper13.jpeg';
import bugZapper14 from '../images/catalogGenerator/bugZapper14.jpeg';
import bugZapper16 from '../images/catalogGenerator/bugZapper16.png';
import { handleFile1 } from '../data/handleFilesData.js';

export const catalogUploadImages = [bugZapper9, bugZapper10, bugZapper11, bugZapper12, bugZapper13, bugZapper14];
export const packageImage = bugZapper16;
export const handleFilesItems = [{ file: handleFiles1, name: 'Product #12345.pptx' }];
export const fileDataMap = { 'Product #12345.pptx': handleFile1 };

export const users = [
  { name: 'Marcus Lin', color: '#1fc9ed' },
  { name: 'Priya Nair',  color: '#fcc10a' },
  { name: 'Ethan Wolfe', color: '#e02f3e' },
  { name: 'Chloe Park',  color: '#049669' },
];

export const guideSteps = [
  {
    label: 'UI Guide', title: 'Chat Section',
    text: "This is your main workspace. Messages from you and Deep Bridge's AI appear here as you interact with the demo in real time.",
    style: { top: '43%', left: '50%', transform: 'translate(-50%, -50%)' },
    width: 520, textSizeBoost: 2, arrow: null,
  },
  {
    label: 'UI Guide', title: 'Tool Switcher',
    text: 'Switch between workflows — Factory Finder, Generate Quotation, Handle Files, and Catalog Generator — to explore each capability.',
    style: { bottom: 90, left: 40 }, width: 260, arrow: 'down-left',
  },
  {
    label: 'UI Guide', title: 'Upload',
    text: 'Attach files or images here. Handle Files expects a PowerPoint; Catalog Generator uses product photos.',
    style: { bottom: 90, left: 220 }, width: 260, arrow: 'down-left',
  },
  {
    label: 'UI Guide', title: 'Textarea & Send',
    text: 'A prompt is pre-filled for each tool. Hit Send to submit it, or edit the text first to try your own inputs.',
    style: { bottom: 90, right: 40 }, width: 260, arrow: 'down-right',
  },
  {
    label: 'Tab Walkthrough', title: 'Factory Finder',
    prompt: 'The user provided a product type, OEM requirement, minimum order quantity constraint, and a sourcing region — giving the AI enough context to filter suppliers with precision.',
    output: 'The AI identified matching suppliers and returned each with their company name, product images, a capability summary, and a direct link to their website for immediate follow-up.',
    background: 'Queried an online supplier index and internal database simultaneously, applied filters for product category, region, and MOQ threshold, then ranked results by relevance.',
    style: { bottom: 120, right: 40 }, width: 320, arrow: null,
  },
  {
    label: 'Tab Walkthrough', title: 'Generate Quotation',
    prompt: 'The user asked a conversational product availability question — no product code or structured query needed. This shows the AI can interpret intent and search the catalogue naturally.',
    output: 'The AI located a recently added matching product and returned a full commercial card — unit price, MOQ, technical specifications, and compliance certifications — ready to quote directly to a customer.',
    background: 'Scanned the product catalogue for recently added items, matched against the product category from the natural language query, and surfaced structured commercial data for immediate use.',
    style: { bottom: 120, right: 40 }, width: 320, arrow: null,
  },
  {
    label: 'Tab Walkthrough', title: 'Handle Files',
    prompt: 'The user uploaded a supplier PowerPoint — the kind of unstructured file that would typically require manual reading. The AI is instructed to extract and organise its contents.',
    output: 'The AI parsed the file and returned a structured document summary, pulling product name, specifications, certifications, pricing, and MOQ into a searchable record with a document ID for follow-up queries.',
    background: 'Read and structured slide content from the uploaded PPTX, identified key commercial fields across slides, and stored the result so follow-up questions can reference any extracted detail.',
    style: { bottom: 120, right: 40 }, width: 320, arrow: null,
  },
  {
    label: 'Tab Walkthrough', title: 'Catalog Generator',
    prompt: 'The user described the desired visual context in plain language — outdoor usage — rather than specifying image parameters. The AI interprets the creative intent and generates accordingly.',
    output: 'The AI produced commercial-grade lifestyle images placing the product in realistic outdoor environments, ready for use in marketing materials or customer-facing catalogues.',
    background: 'Analysed the uploaded product photos to understand the subject, then applied AI image generation to match the described environment, lighting, and usage context.',
    style: { bottom: 120, right: 40 }, width: 320, arrow: null,
  },
];
