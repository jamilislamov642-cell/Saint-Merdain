import React from 'react';
import { createRoot } from 'react-dom/client';
import MapExperience from './components/MapExperience';
import './styles.css';
import './styles-overrides.css';
import './interaction.css';
import './advanced-map.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MapExperience />
  </React.StrictMode>
);
