// src/components/LogoSection.tsx
import React from 'react';
import dualingo from '@/assets/logos/dualingo.png';
import microsoft from '@/assets/logos/microsoft.png';
import forbes from '@/assets/logos/forbes.png';
import pintrest from '@/assets/logos/pintrest.png';
import vevo from '@/assets/logos/vevo.png';
import { useTheme } from '../ui/theme-provider';

const logos = [
  { src: forbes, alt: 'Forbes' },
  { src: dualingo, alt: 'Duolingo' },
  { src: vevo, alt: 'Vevo' },
  { src: microsoft, alt: 'Microsoft' },
  { src: pintrest, alt: 'Pinterest' },
];


const LogoSection: React.FC = () => {
  const {theme} = useTheme()
  return (
    <div className={`bg-gradient-to-r ${theme == 'light' ? 'from-violet-600 to-violet-400' : 'from-gray-900 to-gray-800'} from-gray-900 to-gray-800 py-8 flex flex-wrap justify-around items-center space-y-4 md:space-y-0`}>
      {logos.map((logo, index) => (
        <div key={index} className="mx-4">
          <img
            src={logo.src}
            alt={logo.alt}
            className="h-4 md:h-6 lg:h-8"
          />
        </div>
      ))}
    </div>
  );
};

export default LogoSection;
