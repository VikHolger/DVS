import type { Template, Font } from '@pdfme/common';
import { generate } from '@pdfme/generator';
import { text, line, rectangle, image } from '@pdfme/schemas';
import { template } from './pdfTemplate';

const loadFonts = async (): Promise<Font> => {
  try {
    // Use absolute URLs for Next.js public folder
    const fontUrl1 = '/fonts/Raleway-SemiBoldItalic.ttf';
    const fontUrl2 = '/fonts/FiraCode-Regular.ttf';
    
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
    
    // Build inputs array - one input object per page
    const inputs = [];
    
    // First page input with all form data
    inputs.push({ 
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
    });

    // Add one input object per image page
    images.forEach(imageData => {
      inputs.push({
        receiptImage: imageData,
      });
    });

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
            name: 'receiptImage',
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

      //Browser
      const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
      window.open(URL.createObjectURL(blob));
    }).catch((error) => {
      console.error('PDF generation error:', error);
      alert('PDF generation failed. Check console for details.');
    });
  }).catch((error) => {
    console.error('Font loading error:', error);
    alert('Font loading failed. Check console for details.');
  });
}