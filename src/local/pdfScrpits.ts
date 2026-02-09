import type { Template, Font } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { text, line, rectangle } from '@pdfme/schemas';
import { template } from './pdfTemplate';

const loadFonts = async (): Promise<Font> => {
  return {
    rale: {
      data: await fetch('/fonts/Raleway-Regular.ttf').then(res => res.arrayBuffer()),
      fallback: true,
    },
    rale_title: {
      data: await fetch('/fonts/Raleway-SemiBoldItalic.ttf').then(res => res.arrayBuffer()),
    },
    code: {
      data: await fetch('/fonts/FiraCode-Regular.ttf').then(res => res.arrayBuffer()),
    },
  };
};


export async function generateMyntPDF(V_Type, name, date, myntCard, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition) {
    // Load fonts first
    const font = await loadFonts();
    
    const inputs = [{ 
        V_Type: V_Type,

        name: name,
        date: date,

        myntCard: myntCard,

        bankName: "---",
        clearing: "---",
        bankNum: "---",

        purchaseDate: purchaseDate,
        ammount: ammount,
        numReceipts: numReceipts,
        descrition: descrition,

        budgetManager: budgetManager,
        projectNum: projectNum,
     }];
    
    const pdf = await generate({
         template, 
         inputs,
         plugins: {
            text,
            line,
            rectangle,
        }, 
        options: { font }
    });
    
    console.log(pdf);

    //Browser
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

    // Node.js
    // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
}

export async function generatePrivatePDF(V_Type, name, date, bankName, clearing, bankNum, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition) {
    // Load fonts first
    const font = await loadFonts();
    
    const inputs = [{ 
        V_Type: V_Type,

        name: name,
        date: date,

        myntCard: "---",

        bankName: bankName,
        clearing: clearing,
        bankNum: bankNum,

        purchaseDate: purchaseDate,
        ammount: ammount,
        numReceipts: numReceipts,
        descrition: descrition,

        budgetManager: budgetManager,
        projectNum: projectNum,
     }];
    
    const pdf = await generate({
         template, 
         inputs,
         plugins: {
            text,
            line,
            rectangle,
        }, 
        options: { font }
    });
    
    console.log(pdf);

    //Browser
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

    // Node.js
    // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
}