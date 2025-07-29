import { useEffect, useRef } from 'react';

interface PetalConfig {
  id: number;
  initialRotation: number;
  initialBottom: number;
  initialLeft: number;
  rotationAmplitude: number;
  scaleAmplitude: number;
  offset: number;
  speed: number;
  zIndex: number;
  opacity: number;
}

export function Petals() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const petalsConfigRef = useRef<PetalConfig[]>([]);

  useEffect(() => {
    // Initialize petal configurations
    const petalConfigs: PetalConfig[] = [
      {
        id: 1,
        initialRotation: -30,
        initialBottom: -100,
        initialLeft: -130,
        rotationAmplitude: Math.random() * 5 + 3,
        scaleAmplitude: Math.random() * 0.03 + 0.02,
        offset: 0 * 0.5,
        speed: 0.0005 + Math.random() * 0.0001,
        zIndex: 5,
        opacity: 1
      },
      {
        id: 2,
        initialRotation: -10,
        initialBottom: -110,
        initialLeft: -70,
        rotationAmplitude: Math.random() * 5 + 3,
        scaleAmplitude: Math.random() * 0.03 + 0.02,
        offset: 1 * 0.5,
        speed: 0.0005 + Math.random() * 0.0001,
        zIndex: 4,
        opacity: 1
      },
      {
        id: 3,
        initialRotation: 10,
        initialBottom: -115,
        initialLeft: -10,
        rotationAmplitude: Math.random() * 5 + 3,
        scaleAmplitude: Math.random() * 0.03 + 0.02,
        offset: 2 * 0.5,
        speed: 0.0005 + Math.random() * 0.0001,
        zIndex: 3,
        opacity: 1
      },
      {
        id: 4,
        initialRotation: 30,
        initialBottom: -110,
        initialLeft: 50,
        rotationAmplitude: Math.random() * 5 + 3,
        scaleAmplitude: Math.random() * 0.03 + 0.02,
        offset: 3 * 0.5,
        speed: 0.0005 + Math.random() * 0.0001,
        zIndex: 2,
        opacity: 1
      },
      {
        id: 5,
        initialRotation: -50,
        initialBottom: -90,
        initialLeft: -200,
        rotationAmplitude: Math.random() * 5 + 3,
        scaleAmplitude: Math.random() * 0.03 + 0.02,
        offset: 4 * 0.5,
        speed: 0.0005 + Math.random() * 0.0001,
        zIndex: 1,
        opacity: 0.9
      },
      {
        id: 6,
        initialRotation: 50,
        initialBottom: -90,
        initialLeft: 120,
        rotationAmplitude: Math.random() * 5 + 3,
        scaleAmplitude: Math.random() * 0.03 + 0.02,
        offset: 5 * 0.5,
        speed: 0.0005 + Math.random() * 0.0001,
        zIndex: 0,
        opacity: 0.9
      }
    ];

    petalsConfigRef.current = petalConfigs;

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
      }

      const elapsedTime = currentTime - startTimeRef.current;

      petalsConfigRef.current.forEach(petal => {
        const petalElement = document.getElementById(`petal-${petal.id}`);
        if (!petalElement) return;

        // Use a sine wave for smooth, cyclical motion
        const sineInput = (elapsedTime * petal.speed) + petal.offset;
        const sineValue = Math.sin(sineInput); // -1 to 1

        // Apply subtle rotation
        const currentRotation = petal.initialRotation + (sineValue * petal.rotationAmplitude);

        // Apply subtle scaling
        const currentScale = 1 + (sineValue * petal.scaleAmplitude);

        // Apply subtle vertical movement (up and down)
        const verticalOffset = sineValue * 5; // Move up/down by 5 pixels

        petalElement.style.transform = `
          translateY(${verticalOffset}px)
          rotate(${currentRotation}deg)
          scale(${currentScale})
        `;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 flex justify-center items-center"
      style={{ backgroundColor: 'black' }}
    >
      <div className="relative w-[300px] h-[300px] flex justify-center items-center">
        {petalsConfigRef.current.map((petal) => (
          <div
            key={petal.id}
            id={`petal-${petal.id}`}
            className="absolute w-[150px] h-[250px]"
            style={{
              background: 'linear-gradient(to top, #6b0f0f, #990000)',
              borderRadius: '50% 50% 10% 10% / 60% 60% 40% 40%',
              transformOrigin: 'bottom center',
              filter: 'blur(0.5px)',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
              bottom: `${petal.initialBottom}px`,
              left: `calc(50% + ${petal.initialLeft}px)`,
              transform: `rotate(${petal.initialRotation}deg) scale(1)`,
              zIndex: petal.zIndex,
              opacity: petal.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}