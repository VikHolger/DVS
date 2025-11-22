import type { Template } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { text, line, rectangle } from '@pdfme/schemas';
import { template } from './pdfTemplate';


export function generatePDF(V_Type, name, date, myntCard, bankName, clearing, bankNum, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition) {
    const inputs = [{ 
        V_Type: V_Type,

        name: name,
        date: date,

        myntCard: myntCard,

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
    
    generate({
         template, 
         inputs,
         plugins: {
            text,
            line,
            rectangle,
        }, 
        }).then((pdf) => {
    console.log(pdf);

    //Browser
    const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
    window.open(URL.createObjectURL(blob));

    // Node.js
    // fs.writeFileSync(path.join(__dirname, `test.pdf`), pdf);
    });
}