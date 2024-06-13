// ParticleBackground.js
import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground: React.FC = () => {
    return (
        <Particles
            options={{
                particles: {
                    number: {
                        value: 50,
                    },
                    size: {
                        value: 3,
                    },
                },
                interactivity: {
                    events: {
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                    },
                },
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1,
            }}
        />
    );
};

export default ParticleBackground;
