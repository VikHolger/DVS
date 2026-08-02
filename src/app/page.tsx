"use client";

import React, { useState, useEffect } from 'react';
import { translations, Language } from '@/local';
import { budgetManagers, projectsMap } from '@/local/budgetStructure';
import { generateMyntPDF, generatePrivatePDF } from '@/local/pdfScripts';

export default function Home() {
  const [language, setLanguage] = useState<Language>("sv");
  const t = translations[language];

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [V_Type, set_V_Type] = useState("");

  const [myntCard, setMyntCard] = useState("---");

  const [bankName, setBankName] = useState("");
  const [clearing, setClearing] = useState("");
  const [bankNum, setBankNr] = useState("");

  const [ammount, setAmmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(""); 

  const [budgetManager, setBudgetManager] = useState("");
  const [projectNum, setProjectNum] = useState("");
  const [descrition, setDescrition] = useState("");

  type UploadedFile = {
    id: string;   // groups pages belonging to the same uploaded receipt
    src: string;  // the actual image data URL
  };

  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Derived: count unique receipts, not pages
  const numReceiptsCount = new Set(uploadedImages.map(img => img.id)).size;

  const [generatedBlob, setGeneratedBlob] = useState<Blob | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    
  }, [date]);

  async function handleGenerateClick() {
    setIsGenerating(true);
    const today = new Date().toISOString().split('T')[0];
    setDate(today);

    try {
      const numReceipts = String(numReceiptsCount);
      const imageSrcs = uploadedImages.map(img => img.src);
      let blob: Blob;
      if (V_Type == "Mynt") {
        blob = await generateMyntPDF(V_Type, name, today, myntCard, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition, imageSrcs);
      } else if (V_Type == "Privat") {
        blob = await generatePrivatePDF(V_Type, name, today, bankName, clearing, bankNum, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition, imageSrcs);
      } else {
        throw new Error("Incorrect V_Type");
      }
      setGeneratedBlob(blob);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  }

  function handleShareClick() {
    if (generatedBlob) sharePDF(generatedBlob);
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

  async function convertPdfToImages(file: File): Promise<string[]> {
    const pdfjsLib = await import('pdfjs-dist');
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${basePath}/pdf.worker.min.mjs`;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const images: string[] = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');
      if (!context) continue;

      await page.render({ canvasContext: context, canvas, viewport }).promise;
      images.push(canvas.toDataURL('image/png'));
    }

    return images;
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    setIsUploading(true);

    const processingPromises = fileArray.map((file) => {
      const receiptId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      if (file.type === 'application/pdf') {
        return convertPdfToImages(file)
          .then((pdfImages) => {
            setUploadedImages(prev => [
              ...prev,
              ...pdfImages.map((src) => ({ id: receiptId, src })),
            ]);
          })
          .catch((err) => {
            console.error('Failed to convert PDF to images:', err);
          });
      }

      return new Promise<void>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setUploadedImages(prev => [...prev, { id: receiptId, src: reader.result as string }]);
          resolve();
        };
        reader.onerror = () => resolve();
        reader.readAsDataURL(file);
      });
    });

    Promise.all(processingPromises).finally(() => setIsUploading(false));

    e.target.value = ''; // allow re-selecting the same file(s)
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
      <header className='fixed top-0 left-0 right-0 mb-2 flex w-full max-h-full justify-around pt-5 pb-5 flex-row bg-gray-100 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700'>
        <div className='flex gap-2 items-center'>
          <a href="https://www.flygsektionen.se/" target="_self" rel="noopener noreferrer">
            Flygsektionens
          </a>
        </div>

        <div className='flex gap-2 items-center'> 
          <h1 className=" text-xl self-center underline pb-1">
          {t.title}
          </h1>
        </div>
        
        <div className="flex gap-2 items-center">
          <button onClick={() => setLanguage("sv")} className="w-6 h-4">
            <img 
              src="https://flagcdn.com/w40/se.png" 
              alt="Swedish"
              className="w-full h-full object-cover"
            />
          </button>
          <button onClick={() => setLanguage("en")} className="w-6 h-4">
            <img 
              src="https://flagcdn.com/w40/gb.png" 
              alt="English"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      <main className="mt-20 pt-5 flex min-h-screen w-full max-w-3xl flex-col self-center items-center px-16 rounded-xl bg-white dark:bg-black border-b border-gray-300 dark:border-gray-700 sm:items-start">
        
        <p className='self-center'>
          {t.welcome}
        </p>

        <div className='form flex flex-col min-w-9/12 self-center item-center'>

          <div className='flex flex-col self-center items-center pt-5'>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.enterName}
              className="text_field"
              //className="px-4 py-2 min-w-1/2 border text-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
              />
          </div>

          {name && (
            <div className='Verificaton_Type min-w-full max-h-10 flex items-center self-center justify-around m-2 py-1 max-md:mt-6 max-md:mb-4'>
              <button
                type="button"
                onClick={(e) => set_V_Type("Mynt")}
                className="button_common"
              > {t.myntButton} </button>

              <button
                type="button"
                onClick={(e) => set_V_Type("Privat")}
                className="button_common"
              > {t.privatButton} </button>
            </div>
          )}

          {V_Type == "Mynt" && ( //Detaljer om Mynt
            <div className='Your_Details section'>
              <p className='text-xl underline'>
                {V_Type}
              </p>

              <div className='flex flex-row m-1 max-md:p-2'>
                <p className='pr-4 py-2'> 
                  {t.myntCard}
                </p>

                <select 
                  value={myntCard} 
                  onChange={(e) => setMyntCard(e.target.value)}
                  className="multi_choice_button max-md:max-h-10"
                  //className="px-4 py-2 max-md:max-h-10 self-center border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 "
                >
                  <option value="---" hidden>---</option>
                  <option value="CASH">CASH</option>
                  <option value="KBM">KBM</option>
                  <option value="EKO">EKO</option>
                </select>
              </div>
            </div>
          )}

          {V_Type == "Privat" && ( // Detaljer om personens bank
            <div className='Your_Details section'>
              <p className='text-xl underline'>
                {V_Type}
              </p>

              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder={t.bankName}
                className="text_field"
                //className="px-4 py-2 min-w-1/2 border mt-2 text-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
              />

              {bankName && (
                <div className='flex flex-row justify-center mt-1'>
                  <input
                    type="text"
                    maxLength={5}
                    value={clearing}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setClearing(e.target.value);
                      }
                    }}
                    placeholder={t.clearing}
                    className="text_field max-w-1/5"
                    //className="px-4 py-2 max-w-1/5 mr-2 border text-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                  />

                  <input
                    type="text"
                    maxLength={12}
                    value={bankNum}
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) {
                        setBankNr(e.target.value);
                      }
                    }}
                    placeholder={t.bankNr}
                    className="text_field min-w-3/5"
                    //className="px-4 py-2 min-w-3/5 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                  />
                </div>
              )}

            </div>
          )}

          {((V_Type == "Mynt" && myntCard != "---") || (V_Type == "Privat" && clearing && bankNum)) && ( // Detaljer om köpet i sig
            <div className='section'>
              <p className='text-xl underline'>
                {t.buyData}
              </p>

            <div className='flex flex-row items-center justify-center mt-2'>
              <input
                type="text"
                value={ammount}
                onChange={(e) => {
                  if (/^\d*[.,]?\d{0,2}$/.test(e.target.value)) {
                    setAmmount(e.target.value);
                  }
                }}
                placeholder={t.ammount}
                className="text_field max-w-2/5" 
                //className="px-4 py-2 max-w-2/5 border text-center flex border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
              />

              <p className='flex pl-2'>
                kr
              </p>
            </div>

            {ammount && (
              <div className='flex flex-row items-center justify-center gap-2 mt-1'>
                <label className={`button_common cursor-pointer text-white font-semibold py-2 px-4 rounded flex items-center gap-2 ${
                  isUploading ? 'bg-gray-900 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}>
                  {isUploading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Processing...
                    </>
                  ) : (
                    'Upload Images or PDFs'
                  )}
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div className='mt-3 p-3 w-full'>
                <p className='text-sm font-semibold mb-2'>
                  {numReceiptsCount} receipt{numReceiptsCount !== 1 ? 's' : ''} ({uploadedImages.length} page{uploadedImages.length !== 1 ? 's' : ''}):
                </p>
                <div className='grid grid-cols-3 gap-2'>
                  {uploadedImages.map((img, index) => (
                    <div key={index} className='relative group'>
                      <img 
                        src={img.src} 
                        alt={`Upload ${index + 1}`}
                        className='w-full h-24 object-cover rounded border border-gray-300'
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className='absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {uploadedImages.length > 0 && (
              <div className='flex flex-row self-center items-center min-w-full justify-center mt-1'>
                <p className='flex m-2'>
                  {t.purchased}
                </p>
                <input
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="text_field min-w-1/4"
                  //className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                />
              </div>
            )}

          </div>
          )}

          {uploadedImages.length > 0 && (
            <div className='section'>
              <p className='text-xl underline'>
                {t.buyUsage}
              </p>

              <div className='min-w-full flex flex-row self-center items-center justify-around mb-2'>
                <div className='flex flex-col min-w-2/5 self-center items-center justify-center'>
                  <p className='flex self-center'>
                    {t.budChief}
                  </p>
                  <p className='flex self-center text-xs'>
                    {t.buyIfUCan}
                  </p>
                </div>

                <div className='flex flex-col min-w-3/5 self-center items-center justify-center'>
                  <p className='flex self-center'>
                    {t.descritionTitle}
                  </p>
                  <p className='flex self-center text-xs'>
                    {t.mandatory}
                  </p>
                </div>
              </div>
              
              <div className='min-w-full flex flex-row self-center items-center justify-around'>
                <div className='flex flex-col min-w-2/5 self-center items-center p-2'>
                  <select 
                    value={budgetManager} 
                    onChange={(e) => setBudgetManager(e.target.value)}
                    className="multi_choice_button"
                    //className="px-4 py-2 border self-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  >
                    <option value="---" hidden>---</option>
                    {budgetManagers.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {budgetManager && budgetManager != "---" && (
                    <div className='flex flex-col min-w-2/5 self-center items-center p-2'>
                      <select 
                        value={projectNum} 
                        onChange={(e) => setProjectNum(e.target.value)}
                        className="multi_choice_button max-w-1/2"
                        //className="px-4 py-2 mt-1 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                      >
                        <option value="---" hidden>---</option>
                        {projectsMap.get(budgetManager)?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {t[option.labelKey as keyof typeof t]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                <div className='min-w-3/5 p-2 self-center items-center'>
                  <div>
                    <textarea
                      value={descrition}
                      onChange={(e) => setDescrition(e.target.value)}
                      placeholder={t.descrition}
                      rows={4}
                      className="text_field w-full"
                      //className="px-2 py-2 mt-1 w-full border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {descrition && !generatedBlob ? (
              <button onClick={handleGenerateClick} disabled={isGenerating} className="button_common mt-1 mb-3">
                {isGenerating ? t.generating : t.generate}
              </button>
            ) : descrition && generatedBlob && (
              <button onClick={handleShareClick} className="button_common mt-1 mb-3">
                {t.sharePDF}
              </button>
            )}
        </div>
      </main>
    </div>
  );
}