"use client";

import React, { useState, useEffect } from 'react';
import { translations, Language } from '@/local';
import { budgetManagers, projectsMap } from '@/local/budgetStructure';
import { generateMyntPDF, generatePrivatePDF } from '@/local/pdfScrpits';

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
  const [numReceipts, setNumReceipts] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(""); 

  const [budgetManager, setBudgetManager] = useState("");
  const [projectNum, setProjectNum] = useState("");
  const [descrition, setDescrition] = useState("");

  const [shouldSubmit, setShouldSubmit] = useState(false);


  useEffect(() => {
    if (shouldSubmit) {
      submitForm();
      setShouldSubmit(false);
    }
  }, [date, shouldSubmit]);

  function submitForm() {
    if (V_Type == "Mynt") generateMyntPDF(V_Type, name, date, myntCard, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition);
    else if (V_Type == "Privat") generatePrivatePDF(V_Type, name, date, bankName, clearing, bankNum, ammount, numReceipts, purchaseDate, budgetManager, projectNum, descrition);
    else throw new Error("Incorrect V_Type");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black flex-col">
      <header className='flex w-full max-h-full justify-around pt-5 pb-5 flex-col'>
        <div className="mb-4 ml-4 flex gap-2">
          <button onClick={() => setLanguage("sv")} className="w-8 h-6">
            <img 
              src="https://flagcdn.com/w40/se.png" 
              alt="Swedish"
              className="w-full h-full object-cover"
            />
          </button>
          <button onClick={() => setLanguage("en")} className="w-8 h-6">
            <img 
              src="https://flagcdn.com/w40/gb.png" 
              alt="English"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        <hr className=''/>
      </header>

      <main className="flex min-h-screen w-full max-w-3xl flex-col self-center items-center px-16 bg-white dark:bg-black sm:items-start">

        <h1 className=" text-4xl self-center underline pb-1">
          {t.title}
        </h1>
        <p className='self-center'>
          {t.welcome}
        </p>

        <div className='Form flex flex-col min-w-9/12 self-center item-center'>

          <div className='flex flex-col self-center items-center pt-5'>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.enterName}
              className="px-4 py-2 min-w-1/2 border text-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
              />
          </div>

          {name && (
            <div className='Verificaton_Type min-w-full max-h-10 flex items-center self-center justify-around m-2 py-1 max-md:mt-6 max-md:mb-4'>
              <button
                type="button"
                onClick={(e) => set_V_Type("Mynt")}
                className="bg-gray-700 hover:bg-gray-800 text-gray-400 font-bold mx-1 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              > {t.myntButton} </button>

              <button
                type="button"
                onClick={(e) => set_V_Type("Privat")}
                className="bg-gray-700 hover:bg-gray-800 text-gray-400 font-bold mx-1 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              > {t.privatButton} </button>
            </div>
          )}

          {V_Type == "Mynt" && ( //Detaljer om Mynt
            <div className='Your_Details min-w-full flex flex-col self-center items-center justify-around m-2 py-2 border rounded-xl'>
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
                  className="px-4 py-2 max-md:max-h-10 self-center border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 "
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
            <div className='Your_Details min-w-full flex flex-col self-center items-center justify-around m-2 py-2 border rounded-xl'>
              <p className='text-xl underline'>
                {V_Type}
              </p>

              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder={t.bankName}
                className="px-4 py-2 min-w-1/2 border mt-2 text-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
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
                    className="px-4 py-2 max-w-1/5 mr-2 border text-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
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
                    className="px-4 py-2 min-w-3/5 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                  />
                </div>
              )}

            </div>
          )}

          {((V_Type == "Mynt" && myntCard != "---") || (V_Type == "Privat" && clearing && bankNum)) && ( // Detaljer om köpet i sig
            <div className='min-w-full flex flex-col self-center items-center justify-around m-2 py-2 border rounded-xl'>
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
                className="px-4 py-2 max-w-2/5 border text-center flex border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
              />

              <p className='flex pl-2'>
                kr
              </p>
            </div>

            {ammount && (
              <input
                type="text"
                value={numReceipts}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value)) {
                    setNumReceipts(e.target.value);
                  }
                }}
                placeholder={t.numReceipts}
                className="px-4 py-2 mt-1 min-w-1/6 max-w-2/5 text-center border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
              />
            )}

            {numReceipts && (
              <div className='flex flex-row self-center items-center min-w-full justify-center mt-1'>
                <p className='flex m-2'>
                  {t.purchased}
                </p>
                <input
                  type="date"
                  max={new Date().toISOString().split('T')[0]}
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                />
              </div>
            )}

          </div>
          )}

          {purchaseDate && (
            <div className='min-w-full flex flex-col self-center items-center justify-around m-4 pt-2 pb-4 border rounded-xl'>
              <p className='text-xl underline'>
                {t.buyUsage}
              </p>

              <div className='min-w-full flex flex-row self-center items-center justify-around'>
                <div className='flex flex-col items-center'>

                  <div className='flex flex-col self-center items-center min-w-full justify-center m-1 mb-2'>
                    <p className='flex self-center'>
                      {t.budChief}
                    </p>
                    <p className='flex self-center text-xs'>
                      {t.buyIfUCan}
                    </p>
                  </div>

                  <select 
                    value={budgetManager} 
                    onChange={(e) => setBudgetManager(e.target.value)}
                    className="px-4 py-2 border self-center border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                  >
                    <option value="---" hidden>---</option>
                    {budgetManagers.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  {budgetManager && budgetManager != "---" && (
                    <div>
                      <select 
                        value={projectNum} 
                        onChange={(e) => setProjectNum(e.target.value)}
                        className="px-4 py-2 mt-1 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                      >
                        <option value="---" hidden>---</option>
                        {projectsMap.get(budgetManager)?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {[option.labelKey]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                <div className=''>
                {purchaseDate && (
                  <textarea
                    value={descrition}
                    onChange={(e) => setDescrition(e.target.value)}
                    placeholder={t.descrition}
                    rows={4}
                    className="px-2 py-2 mt-1 w-full border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400 resize-none"
                  />
                )}
                </div>
              </div>
            </div>
          )}

          {descrition && (
            <button
              type="submit"
              onClick={() => {
                setDate(new Date().toISOString().split('T')[0]);
                setShouldSubmit(true);
              }}
              className="mt-2 self-center bg-gray-700 hover:bg-gray-800 text-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          )}

        </div>
      </main>
    </div>
  );
}
