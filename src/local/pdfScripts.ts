import type { Template, Font } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { text, line, rectangle, image } from '@pdfme/schemas';
import { template } from './pdfTemplate';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const loadFonts = async (): Promise<Font> => {
  try {
    console.log('Loading fonts from basePath:', basePath);

    // Use absolute URLs for Next.js public folder
    const fontUrl1 = `${basePath}/fonts/Raleway-SemiBoldItalic.ttf`;
    const fontUrl2 = `${basePath}/fonts/FiraCode-Regular.ttf`;
    
    console.log('Loading fonts from:', fontUrl1, fontUrl2);
    
    const font1Response = await fetch(fontUrl1);
    const font2Response = await fetch(fontUrl2);
    
    if (!font1Response.ok || !font2Response.ok) {
      throw new Error('Failed to load fonts');
    }
    
    const font1Data = await font1Response.arrayBuffer();
    const font2Data = await font2Response.arrayBuffer();
    
    console.log('Fonts loaded successfully');
    
    return {
      rale: {
        data: font1Data,
        fallback: true,  // Only this one has fallback
      },
      rale_title: {
        data: font1Data,
        // No fallback flag here
      },
      code: {
        data: font2Data,
      },
    };
  } catch (error) {
    console.error('Font loading error:', error);
    throw error;
  }
};

export function generateMyntPDF(
  V_Type: string, 
  name: string, 
  date: string, 
  myntCard: string, 
  ammount: string, 
  numReceipts: string, 
  purchaseDate: string, 
  budgetManager: string, 
  projectNum: string, 
  descrition: string,
  images: string[] = []
) {
  console.log('generateMyntPDF called with', images.length, 'images');
  
  loadFonts().then(font => {
    console.log('Fonts loaded, building template');

    // IMPORTANT: pdfme's `inputs` array is a list of separate DOCUMENTS, not pages.
    // Every entry in `inputs` gets rendered against the FULL `schemas` array (all pages)
    // and the results are concatenated. So inputs.length * schemas.length pages were
    // being produced before. We want exactly ONE document, so `inputs` must have
    // exactly one object containing every field for every page. Each image page also
    // needs a uniquely-named field (schema field names must be unique within one document,
    // since a repeated name across pages only ever pulls from the same single value).
    const singleInput: Record<string, string> = {
      V_Type: String(V_Type || ''),
      name: String(name || ''),
      date: String(date || ''),
      myntCard: String(myntCard || ''),
      purchaseDate: String(purchaseDate || ''),
      ammount: String(ammount || ''),
      numReceipts: String(numReceipts || images.length),
      descrition: String(descrition || ''),
      budgetManager: String(budgetManager || ''),
      projectNum: String(projectNum || ''),
    };

    images.forEach((imageData, i) => {
      singleInput[`receiptImage_${i}`] = imageData;
    });

    const inputs = [singleInput];

    let finalTemplate: Template;

    // Only create multi-page template if there are images
    if (images.length > 0) {
      console.log('=== DEBUG START ===');
      console.log('Number of images:', images.length);

      // Build the schemas array: first page from template + one page per image,
      // each with a unique field name.
      const schemas = [template.schemas[0]];

      for (let i = 0; i < images.length; i++) {
        const imageSchema = [
          {
            name: `receiptImage_${i}`,
            type: 'image',
            position: { x: 10, y: 10 },
            width: 190,
            height: 267,
          }
        ];
        schemas.push(imageSchema);
      }

      console.log('Total schemas (= total pages):', schemas.length);

      finalTemplate = {
        schemas: schemas,
        basePdf: template.basePdf,
      };

      console.log('Final template schemas length:', finalTemplate.schemas.length);
      console.log('=== DEBUG END ===');
    } else {
      finalTemplate = template;
    }

    console.log('Calling generate with', inputs.length, 'input document and', finalTemplate.schemas.length, 'pages');
    generate({
      template: finalTemplate, 
      inputs,
      plugins: {
        text,
        line,
        rectangle,
        image,
      }, 
      options: { font }
    }).then((pdf) => {
      console.log('PDF generated successfully');

      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      sharePDF(blob);

      //Browser
      //window.open(URL.createObjectURL(blob));
    }).catch((error) => {
      console.error('PDF generation error:', error);
      alert('PDF generation failed. Check console for details.');
    });
  }).catch((error) => {
    console.error('Font loading error:', error);
    alert('Font loading failed. Check console for details.');
  });
}

export function generatePrivatePDF(
  V_Type: string, 
  name: string, 
  date: string, 
  bankName: string, 
  clearing: string, 
  bankNum: string, 
  ammount: string, 
  numReceipts: string, 
  purchaseDate: string, 
  budgetManager: string, 
  projectNum: string, 
  descrition: string,
  images: string[] = []
) {
  console.log('generatePrivatePDF called with', images.length, 'images');
  
  loadFonts().then(font => {
    console.log('Fonts loaded, building template');
    
    // First page input with all form data
    const singleInput: Record<string, string> = {
      V_Type: String(V_Type || ''),
      name: String(name || ''),
      date: String(date || ''),
      bankName: String(bankName || ''),
      clearing: String(clearing || ''),
      bankNum: String(bankNum || ''),
      purchaseDate: String(purchaseDate || ''),
      ammount: String(ammount || ''),
      numReceipts: String(numReceipts || images.length),
      descrition: String(descrition || ''),
      budgetManager: String(budgetManager || ''),
      projectNum: String(projectNum || ''),
    };

    // Add one input object per image page
    images.forEach((imageData, i) => {
      singleInput[`receiptImage_${i}`] = imageData;
    });

    const inputs = [singleInput];

    let finalTemplate: Template;

    // Only create multi-page template if there are images
    if (images.length > 0) {
      console.log('=== DEBUG START ===');
      console.log('Number of images:', images.length);
      console.log('Number of inputs:', inputs.length);
      
      // Build the schemas array: first page from template + one page per image
      const schemas = [template.schemas[0]];
      
      // Add one schema for each image
      for (let i = 0; i < images.length; i++) {
        const imageSchema = [
          {
            name: `receiptImage_${i}`,
            type: 'image',
            position: { x: 10, y: 10 },
            width: 190,
            height: 267,
          }
        ];
        schemas.push(imageSchema);
      }
      
      console.log('Total schemas:', schemas.length);
      console.log('Schemas match inputs:', schemas.length === inputs.length);

      finalTemplate = {
        schemas: schemas,
        basePdf: template.basePdf,
      };
      
      console.log('Final template schemas length:', finalTemplate.schemas.length);
      console.log('=== DEBUG END ===');
    } else {
      finalTemplate = template;
    }
      
    console.log('Calling generate with', inputs.length, 'inputs and', finalTemplate.schemas.length, 'schemas');
    generate({
      template: finalTemplate, 
      inputs,
      plugins: {
        text,
        line,
        rectangle,
        image,
      }, 
      options: { font }
    }).then((pdf) => {
      console.log('PDF generated successfully');

      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      sharePDF(blob);

      //Browser
      //window.open(URL.createObjectURL(blob));
    }).catch((error) => {
      console.error('PDF generation error:', error);
      alert('PDF generation failed. Check console for details.');
    });
  }).catch((error) => {
    console.error('Font loading error:', error);
    alert('Font loading failed. Check console for details.');
  });
}

async function sharePDF(blob: Blob, filename = 'Verifikat.pdf') {
  const file = new File([blob], filename, { type: 'application/pdf' });

  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: 'Verifikat', text: 'Här är verifikatet :)' });
      return;
    } catch (err) {
      if ((err as Error).name !== 'AbortError') console.error('Share failed:', err);
      return;
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}