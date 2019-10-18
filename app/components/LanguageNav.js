import React from 'react';

export default function LanguageNav({ languages, selectedLanguage, updateLanguage }) {
  return (
    <ul className="flex-center">
      {
        languages.map((item) => {
          return (
            <li key={item}>
              <button
                onClick={() => { updateLanguage(item) }}
                className="btn-clear nav-link"
                style={item === selectedLanguage ? { color: 'rgb(187, 46, 31)' } : null}
              >
                {item}
              </button>
            </li>
          )
        })
      }
    </ul>
  );
}

