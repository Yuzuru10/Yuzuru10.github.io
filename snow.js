/**
 * Light Snow Effect for Website Background - Brighter Version
 */

// Snow effect configuration - Modified for better visibility and whiter appearance
const snowConfig = {
    particleCount: 100,      // Increased for more snow
    minSize: 2,              // Minimum size
    maxSize: 5,              // Increased maximum size for more visibility
    minSpeed: 0.5,           
    maxSpeed: 2,             
    color: "#ffffff",        // Pure white
    opacity: 1,              // Full opacity
    zIndex: 1,            // High z-index to ensure visibility
    glow: true               // Add glow effect
};

// Create snow container
function createSnowContainer() {
    const snowContainer = document.createElement("div");
    snowContainer.id = "snow-container";
    
    // Style the container with higher z-index
    Object.assign(snowContainer.style, {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: snowConfig.zIndex,
        overflow: "hidden"
    });
    
    document.body.appendChild(snowContainer);
    return snowContainer;
}

// Create snow particles
function createSnowParticles(container) {
    const particles = [];
    
    for (let i = 0; i < snowConfig.particleCount; i++) {
        // Create a particle
        const particle = document.createElement("div");
        
        // Random properties for natural effect
        const size = Math.random() * (snowConfig.maxSize - snowConfig.minSize) + snowConfig.minSize;
        const speed = Math.random() * (snowConfig.maxSpeed - snowConfig.minSpeed) + snowConfig.minSpeed;
        const xPos = Math.random() * 100; // Random horizontal position (%)
        const yPos = Math.random() * 100; // Random starting vertical position (%)
        const delay = Math.random() * 5; // Random animation delay
        
        // Style properties to apply
        const particleStyle = {
            position: "absolute",
            backgroundColor: snowConfig.color,
            borderRadius: "50%",
            opacity: snowConfig.opacity,
            width: `${size}px`,
            height: `${size}px`,
            left: `${xPos}%`,
            top: `${yPos}%`,
            animation: `snowfall ${5 / speed}s linear ${delay}s infinite`
        };
        
        // Add glow effect if enabled
        if (snowConfig.glow) {
            particleStyle.boxShadow = `0 0 ${size}px ${size/2}px rgba(255, 255, 255, 0.8)`;
        }
        
        // Apply all styles
        Object.assign(particle.style, particleStyle);
        
        container.appendChild(particle);
        particles.push({
            element: particle,
            speed: speed,
            xPos: xPos,
            yPos: yPos
        });
    }
    
    return particles;
}

// Create keyframe animation for snowfall
function createSnowfallAnimation() {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        @keyframes snowfall {
            0% {
                transform: translateY(0) translateX(0);
            }
            75% {
                transform: translateY(75vh) translateX(5px);
            }
            100% {
                transform: translateY(100vh) translateX(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialize snow effect - Call this immediately
function initSnow() {
    const container = createSnowContainer();
    createSnowfallAnimation();
    createSnowParticles(container);
    console.log("Brighter snow effect initialized");
}

// Start the snow effect immediately and when DOM is loaded
initSnow(); // Call immediately in case DOM is already loaded

// Also set up the event listener as a backup
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
        console.log("DOM loaded, initializing snow");
        initSnow();
    });
}