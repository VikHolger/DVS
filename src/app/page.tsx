"use client";

import React, { useState, useEffect } from 'react';
import { translations, Language } from '@/local';

export default function Home() {
  const [V_Type, set_V_Type] = useState(""); // Vilken verifikats typ det är (Privat/Mynt)
  const [language, setLanguage] = useState<Language>("sv");

  const t = translations[language];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="mb-4 flex gap-2">
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
        
        <h1 className="text-">
          {t.title}
        </h1>
        
        <p>
          {t.welcome}
        </p>

        <div className='Form min-w-9/12'>
          <div className='Verificaton_Type min-w-full flex items-center justify-around m-2'>
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

          {V_Type && (
            <div className='Your_Details min-w-full flex justify-around m-2'>
              <p className='text-xl'>
                {V_Type}
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
