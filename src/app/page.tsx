"use client";

import React, { useState, useEffect } from 'react';
import { translations, Language } from '@/local';

export default function Home() {
  const [V_Type, set_V_Type] = useState(""); // Vilken verifikats typ det är (Privat/Mynt)
  const [name, setName] = useState(""); // Namn på personen

  const [myntCard, setMyntCard] = useState("---"); // Dropdown för det olika mynt korten

  const [language, setLanguage] = useState<Language>("sv");

  const t = translations[language];

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

      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center px-16 bg-white dark:bg-black sm:items-start">

        <h1 className=" text-4xl self-center underline pb-1">
          {t.title}
        </h1>
        <p className='self-center'>
          {t.welcome}
        </p>

        <div className='Form min-w-9/12 self-center item-center'>

          <div className='flex flex-col items-center pt-5'>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.enterName}
              className="px-4 py-2 min-w-1/2 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
              />
          </div>

          {name && (
            <div className='Verificaton_Type min-w-full flex items-center justify-around m-2 pt-2'>
              <button
                type="button"
                onClick={(e) => set_V_Type("Mynt")}
                className="bg-gray-700 hover:bg-gray-800 text-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              > {t.myntButton} </button>

              <button
                type="button"
                onClick={(e) => set_V_Type("Privat")}
                className="bg-gray-700 hover:bg-gray-800 text-gray-400 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              > {t.privatButton} </button>
            </div>
          )}

          {V_Type == "Mynt" && ( //Detaljer om Mynt
            <div className='Your_Details min-w-full flex flex-col items-center justify-around m-2'>
              <p className='text-xl'>
                {V_Type}
              </p>

              <div className='flex flex-row m-1'>
                <p className='pr-4 py-2'> 
                  {t.myntCard}
                </p>

                <select 
                  value={myntCard} 
                  onChange={(e) => setMyntCard(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded bg-white text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300"
                >
                  <option value="---">---</option>
                  <option value="option1">CASH</option>
                  <option value="option2">KBM</option>
                  <option value="option3">EKO</option>
                </select>
              </div>
            </div>
          )}

          {V_Type == "Privat" && ( // Detaljer om personens bank
            <div className='Your_Details min-w-full flex justify-around m-2'>
              <p className='text-xl'>
                {V_Type}
              </p>
            </div>
          )}

          {myntCard != "---" && ( // Detaljer om köp
            <div>
              abc
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
