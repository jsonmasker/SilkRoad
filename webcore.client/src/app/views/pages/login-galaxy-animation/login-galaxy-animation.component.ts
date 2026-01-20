import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as THREE from 'three';

@Component({
  selector: 'app-login-galaxy-animation',
  imports: [FormsModule],
  templateUrl: './login-galaxy-animation.component.html',
  styleUrl: './login-galaxy-animation.component.scss',
})
export class LoginGalaxyAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('galaxyCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  // Three.js components
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private galaxy!: THREE.Points;
  private nebula!: THREE.Points;
  private starShapes: THREE.Points[] = [];
  private crystalFormations: THREE.Mesh[] = [];
  private energyOrbs: THREE.Mesh[] = [];
  private animationId!: number;
  private clock = new THREE.Clock();

  // Performance optimization
  private frameCount = 0;
  private lastTime = 0;
  private isLowPerformance = false;
  
  // Enhanced visual parameters (no user interaction)
  private atmosphereIntensity = 1.0;
  private galaxyRotationSpeed = 0.0003;
  private particleScale = 1.0;
  private cosmicTime = 0;
  
  // Additional beautiful effects
  private stardust: THREE.Points[] = [];
  private cosmicRings: THREE.Mesh[] = [];
  private lightBeams: THREE.Mesh[] = [];
  private pulseWaves: THREE.Mesh[] = [];

  // Login form data
  loginData = {
    email: '',
    password: ''
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.createGalaxy();
    this.animate();
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }

  private initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;
    
    // Enhanced scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000408);
    this.scene.fog = new THREE.FogExp2(0x000408, 0.015);

    // Optimized camera with better positioning
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1500);
    this.camera.position.set(0, 3, 15);

    // Premium renderer configuration
    this.renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
      depth: true
    });
    
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000408, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.renderer.shadowMap.enabled = false; // Disabled for performance
    
    // Performance monitoring
    this.detectPerformance();
  }

  private detectPerformance(): void {
    const gl = this.renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      this.isLowPerformance = renderer.includes('Intel') || renderer.includes('integrated');
      if (this.isLowPerformance) {
        this.particleScale = 0.6;
        this.atmosphereIntensity = 0.7;
      }
    }
  }

  private createGalaxy(): void {
    // Create spiral galaxy base
    this.galaxy = this.createSpiralGalaxy();
    this.scene.add(this.galaxy);

    // Create multiple star shape layers
    this.createMultipleStarShapes();

    // Create crystal formations
    this.createCrystalFormations();

    // Create energy orbs
    this.createEnergyOrbs();

    // Additional beautiful effects will be created here

    // Create nebula glow
    this.nebula = this.createNebula();
    this.scene.add(this.nebula);

    // Enhanced lighting system
    this.setupEnhancedLighting();
  }

  private setupEnhancedLighting(): void {
    // Ambient light with cosmic atmosphere
    const ambientLight = new THREE.AmbientLight(0x2a1B3d, 0.4);
    this.scene.add(ambientLight);

    // Primary galactic core light
    const coreLight = new THREE.PointLight(0x9333ea, 2.5, 1200);
    coreLight.position.set(0, 0, 0);
    this.scene.add(coreLight);

    // Secondary atmospheric lights
    const atmosphereLight1 = new THREE.PointLight(0x4f46e5, 1.2, 800);
    atmosphereLight1.position.set(15, 8, 10);
    this.scene.add(atmosphereLight1);

    const atmosphereLight2 = new THREE.PointLight(0xff6b9d, 0.8, 600);
    atmosphereLight2.position.set(-12, -5, 8);
    this.scene.add(atmosphereLight2);

    // Rim light for depth perception
    const rimLight = new THREE.DirectionalLight(0x74b9ff, 0.6);
    rimLight.position.set(30, 20, 30);
    this.scene.add(rimLight);

    // Accent lights for crystal illumination
    const crystalLight = new THREE.PointLight(0xfeca57, 1.0, 400);
    crystalLight.position.set(0, 10, 0);
    this.scene.add(crystalLight);
  }

  private createSpiralGalaxy(): THREE.Points {
    const geometry = new THREE.BufferGeometry();

    // Performance-adaptive particle count
    const baseCount = this.isLowPerformance ? 8000 : 15000;
    const count = Math.floor(baseCount * this.particleScale);
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    // Enhanced color palette
    const colorCore = new THREE.Color('#ff6b9d');
    const colorMid = new THREE.Color('#c44569');
    const colorEdge = new THREE.Color('#4834df');
    const colorOutside = new THREE.Color('#0c2461');

    const branches = 5;
    const radius = 18;
    const spin = 2.2;
    const randomness = 0.8;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Optimized distribution calculation
      const r = Math.pow(Math.random(), 0.6) * radius;
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      const spinAngle = r * spin * 0.1;
      const angle = branchAngle + spinAngle;

      // Enhanced randomness with performance optimization
      const randomPow = this.isLowPerformance ? 2 : 3;
      const randomX = Math.pow(Math.random(), randomPow) * (Math.random() < 0.5 ? 1 : -1) * randomness;
      const randomY = Math.pow(Math.random(), randomPow) * (Math.random() < 0.5 ? 1 : -1) * randomness * 0.3;
      const randomZ = Math.pow(Math.random(), randomPow) * (Math.random() < 0.5 ? 1 : -1) * randomness;

      positions[i3]     = Math.cos(angle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(angle) * r + randomZ;

      // Sophisticated color mixing
      const normalizedRadius = r / radius;
      let mixedColor = colorCore.clone();
      
      if (normalizedRadius < 0.3) {
        mixedColor.lerp(colorMid, normalizedRadius / 0.3);
      } else if (normalizedRadius < 0.7) {
        mixedColor = colorMid.clone();
        mixedColor.lerp(colorEdge, (normalizedRadius - 0.3) / 0.4);
      } else {
        mixedColor = colorEdge.clone();
        mixedColor.lerp(colorOutside, (normalizedRadius - 0.7) / 0.3);
      }

      // Add subtle color variations
      const variation = 0.15;
      colors[i3]     = Math.max(0, Math.min(1, mixedColor.r + (Math.random() - 0.5) * variation));
      colors[i3 + 1] = Math.max(0, Math.min(1, mixedColor.g + (Math.random() - 0.5) * variation));
      colors[i3 + 2] = Math.max(0, Math.min(1, mixedColor.b + (Math.random() - 0.5) * variation));

      // Dynamic sizing and phase
      sizes[i] = (0.02 + Math.random() * 0.04) * (1.5 - normalizedRadius * 0.5);
      phases[i] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));

    // Enhanced shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        atmosphereIntensity: { value: this.atmosphereIntensity }
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        uniform float atmosphereIntensity;
        attribute float size;
        attribute float phase;
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vColor = color;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          float twinkle = sin(time * 2.0 + phase) * 0.4 + 0.6;
          float pulse = sin(time * 0.8 + phase * 0.3) * 0.2 + 0.8;
          vAlpha = twinkle * pulse * atmosphereIntensity;
          
          gl_PointSize = size * pixelRatio * 500.0 * twinkle;
          gl_PointSize *= (1.0 / -mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          
          float strength = 1.0 - smoothstep(0.0, 0.5, dist);
          float glow = pow(strength, 1.8);
          
          // Enhanced rim lighting
          float rim = 1.0 - smoothstep(0.3, 0.5, dist);
          glow += rim * 0.3;
          
          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    return new THREE.Points(geometry, material);
  }

  private createMultipleStarShapes(): void {
    // Create different star layers with various shapes, colors, and sizes
    const starConfigs = [
      { count: 2000, color: '#ff6b6b', size: 0.05, shape: 'circle' },
      { count: 1500, color: '#4ecdc4', size: 0.03, shape: 'diamond' },
      { count: 1800, color: '#45b7d1', size: 0.04, shape: 'star' },
      { count: 1200, color: '#f9ca24', size: 0.06, shape: 'cross' },
      { count: 1000, color: '#6c5ce7', size: 0.02, shape: 'circle' }
    ];

    starConfigs.forEach(config => {
      const starField = this.createStarField(config);
      this.starShapes.push(starField);
      this.scene.add(starField);
    });
  }

  private createStarField(config: any): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.count * 3);
    const colors = new Float32Array(config.count * 3);
    const sizes = new Float32Array(config.count);
    const shapes = new Float32Array(config.count);

    const baseColor = new THREE.Color(config.color);
    const shapeType = this.getShapeType(config.shape);

    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      
      // Spiral distribution
      const r = Math.pow(Math.random(), 0.8) * 12;
      const branchAngle = (i % 3) * Math.PI * 2 / 3;
      const spinAngle = r * 0.8;
      
      const randomX = (Math.random() - 0.5) * 3;
      const randomY = (Math.random() - 0.5) * 2;
      const randomZ = (Math.random() - 0.5) * 3;
      
      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;
      
      // Color variations
      const colorVariation = 0.4;
      colors[i3] = baseColor.r + (Math.random() - 0.5) * colorVariation;
      colors[i3 + 1] = baseColor.g + (Math.random() - 0.5) * colorVariation;
      colors[i3 + 2] = baseColor.b + (Math.random() - 0.5) * colorVariation;
      
      // Size variations
      sizes[i] = config.size * (0.5 + Math.random() * 1.5);
      shapes[i] = shapeType;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('shapeType', new THREE.BufferAttribute(shapes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0.0 },
        pixelRatio: { value: Math.min(window.devicePixelRatio, 2) }
      },
      vertexShader: `
        uniform float time;
        uniform float pixelRatio;
        attribute float size;
        attribute float shapeType;
        varying vec3 vColor;
        varying float vAlpha;
        varying float vShapeType;
        
        void main() {
          vColor = color;
          vShapeType = shapeType;
          
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          
          float twinkle = sin(time * 3.0 + position.x * 0.01 + position.z * 0.01) * 0.5 + 0.5;
          vAlpha = twinkle * 0.7 + 0.3;
          
          gl_PointSize = size * pixelRatio * 400.0 * (0.8 + twinkle * 0.4);
          gl_PointSize *= (1.0 / -mvPosition.z);
          
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        varying float vShapeType;
        
        void main() {
          vec2 center = gl_PointCoord - vec2(0.5);
          float dist = length(center);
          float alpha = 0.0;
          
          if (vShapeType < 0.5) {
            // Circle
            alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          } else if (vShapeType < 1.5) {
            // Diamond
            float diamond = abs(center.x) + abs(center.y);
            alpha = 1.0 - smoothstep(0.0, 0.5, diamond);
          } else if (vShapeType < 2.5) {
            // Star
            float angle = atan(center.y, center.x);
            float r = 0.3 + 0.2 * sin(5.0 * angle);
            alpha = 1.0 - smoothstep(0.0, r, dist);
          } else {
            // Cross
            float cross = min(abs(center.x), abs(center.y));
            alpha = 1.0 - smoothstep(0.0, 0.1, cross);
            alpha += 1.0 - smoothstep(0.0, 0.1, abs(center.x));
            alpha += 1.0 - smoothstep(0.0, 0.1, abs(center.y));
            alpha = min(alpha, 1.0);
          }
          
          alpha = pow(alpha, 1.5) * vAlpha;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    return new THREE.Points(geometry, material);
  }

  private getShapeType(shape: string): number {
    switch (shape) {
      case 'circle': return 0.0;
      case 'diamond': return 1.0;
      case 'star': return 2.0;
      case 'cross': return 3.0;
      default: return 0.0;
    }
  }

  private createCrystalFormations(): void {
    // Performance-adaptive crystal count
    const crystalCount = this.isLowPerformance ? 10 : 18;
    
    // Pre-create geometry pool for better performance
    const geometryPool = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.ConeGeometry(0.5, 1.2, 8),
      new THREE.CylinderGeometry(0.2, 0.6, 1.0, 8),
      new THREE.DodecahedronGeometry(0.8, 0),
      new THREE.IcosahedronGeometry(0.7, 0)
    ];
    
    // Enhanced color palette
    const crystalColors = [
      { primary: '#ff6b9d', secondary: '#c44569' },
      { primary: '#4834df', secondary: '#686de0' },
      { primary: '#f8b500', secondary: '#ff7675' },
      { primary: '#55a3ff', secondary: '#74b9ff' },
      { primary: '#26d0ce', secondary: '#00cec9' },
      { primary: '#a55eea', secondary: '#fd79a8' },
      { primary: '#ff9ff3', secondary: '#54a0ff' },
      { primary: '#5f27cd', secondary: '#00d2d3' }
    ];

    for (let i = 0; i < crystalCount; i++) {
      const geometry = geometryPool[i % geometryPool.length].clone();
      const colorConfig = crystalColors[i % crystalColors.length];
      
      // Dynamic sizing based on performance
      const baseSize = this.isLowPerformance ? 0.3 : 0.5;
      const size = baseSize + Math.random() * 0.4;
      geometry.scale(size, size, size);
      
      // Enhanced material with better visual quality
      const material = new THREE.MeshPhysicalMaterial({
        color: colorConfig.primary,
        emissive: colorConfig.secondary,
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.7 + Math.random() * 0.2,
        roughness: 0.1,
        metalness: 0.8,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.2,
        thickness: 0.5
      });

      const crystal = new THREE.Mesh(geometry, material);
      
      // Enhanced spiral positioning with depth variation
      const angle = (i / crystalCount) * Math.PI * 6;
      const radius = 6 + Math.random() * 12;
      const height = (Math.random() - 0.5) * 8;
      
      crystal.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 3,
        height,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 3
      );
      
      // Random initial rotation
      crystal.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      // Enhanced animation properties
      (crystal as any).rotationSpeed = {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.015
      };
      (crystal as any).originalY = crystal.position.y;
      (crystal as any).floatAmplitude = 0.3 + Math.random() * 0.4;
      (crystal as any).floatFrequency = 0.5 + Math.random() * 0.8;
      
      this.crystalFormations.push(crystal);
      this.scene.add(crystal);
    }
  }

  private createEnergyOrbs(): void {
    // Performance-adaptive orb count
    const orbCount = this.isLowPerformance ? 8 : 14;
    
    const orbConfigs = [
      { color1: '#ff6b6b', color2: '#ff8e53', color3: '#feca57' },
      { color1: '#4ecdc4', color2: '#44a08d', color3: '#096f91' },
      { color1: '#6c5ce7', color2: '#a55eea', color3: '#fd79a8' },
      { color1: '#f39c12', color2: '#e67e22', color3: '#d35400' },
      { color1: '#00b894', color2: '#00cec9', color3: '#74b9ff' },
      { color1: '#e17055', color2: '#fdcb6e', color3: '#6c5ce7' },
      { color1: '#fd79a8', color2: '#fdcb6e', color3: '#e84393' }
    ];

    for (let i = 0; i < orbCount; i++) {
      // Dynamic sizing with performance consideration
      const baseSize = this.isLowPerformance ? 0.15 : 0.25;
      const size = baseSize + Math.random() * 0.35;
      const geometry = new THREE.SphereGeometry(size, this.isLowPerformance ? 12 : 20, this.isLowPerformance ? 8 : 16);
      
      const colorConfig = orbConfigs[i % orbConfigs.length];
      
      // Enhanced shader material with optimized performance
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0.0 },
          color1: { value: new THREE.Color(colorConfig.color1) },
          color2: { value: new THREE.Color(colorConfig.color2) },
          color3: { value: new THREE.Color(colorConfig.color3) },
          intensity: { value: 1.0 + Math.random() * 0.5 },
          noiseScale: { value: 3.0 + Math.random() * 4.0 }
        },
        vertexShader: `
          uniform float time;
          uniform float noiseScale;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          
          // Optimized noise function
          float simpleNoise(vec3 p) {
            return sin(p.x * 2.1) * sin(p.y * 1.9) * sin(p.z * 2.3);
          }
          
          void main() {
            vPosition = position;
            vNormal = normal;
            
            vec3 newPosition = position;
            float noise = simpleNoise(position * noiseScale + time * 0.8) * 0.08;
            newPosition += normal * noise;
            
            vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
            vWorldPosition = worldPosition.xyz;
            
            gl_Position = projectionMatrix * viewMatrix * worldPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          uniform vec3 color3;
          uniform float intensity;
          varying vec3 vPosition;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;
          
          void main() {
            vec3 viewDir = normalize(cameraPosition - vWorldPosition);
            float fresnel = 1.0 - abs(dot(vNormal, viewDir));
            fresnel = pow(fresnel, 1.5);
            
            float pulse = sin(time * 3.0 + vPosition.x * 2.0) * 0.3 + 0.7;
            float wave = sin(time * 2.0 + vPosition.y * 4.0) * 0.4 + 0.6;
            
            vec3 color = mix(color1, color2, fresnel);
            color = mix(color, color3, wave * 0.6);
            
            float finalIntensity = intensity * pulse * (0.5 + fresnel * 0.7);
            float alpha = 0.3 + fresnel * 0.5 + wave * 0.2;
            
            // Enhanced glow effect
            color *= finalIntensity;
            color += color * fresnel * 0.5;
            
            gl_FragColor = vec4(color, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide
      });

      const orb = new THREE.Mesh(geometry, material);
      
      // Enhanced positioning with golden ratio spiral
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const angle = i * goldenAngle;
      const radius = 4 + Math.sqrt(i / orbCount) * 16;
      const height = (Math.random() - 0.5) * 12;
      
      orb.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius
      );
      
      // Enhanced animation properties
      (orb as any).originalPosition = orb.position.clone();
      (orb as any).floatSpeed = 0.4 + Math.random() * 0.6;
      (orb as any).floatRadius = 1.5 + Math.random() * 2.5;
      (orb as any).phaseOffset = Math.random() * Math.PI * 2;
      
      this.energyOrbs.push(orb);
      this.scene.add(orb);
    }
  }

  private createNebula(): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const count = 300;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 30;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x8844ff,
      size: 1.5,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    return new THREE.Points(geometry, material);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastTime) * 0.001;
    const elapsedTime = this.clock.getElapsedTime();
    
    this.frameCount++;
    this.lastTime = currentTime;
    
    // Performance adaptation
    if (this.frameCount % 120 === 0) {
      this.adaptPerformance(deltaTime);
    }
    
    // Enhanced galaxy animation
    if (this.galaxy) {
      const material = this.galaxy.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms['time'].value = elapsedTime;
        material.uniforms['atmosphereIntensity'].value = this.atmosphereIntensity;
      }
      
      // Smooth cinematic rotation
      this.galaxy.rotation.y += this.galaxyRotationSpeed;
      this.galaxy.rotation.z += this.galaxyRotationSpeed * 0.3;
      
      // Enhanced breathing effect
      const breathe = 1 + Math.sin(elapsedTime * 0.5) * 0.03 + Math.sin(elapsedTime * 0.2) * 0.01;
      this.galaxy.scale.setScalar(breathe * this.particleScale);
    }

    // Optimized star shape animation
    this.starShapes.forEach((starField, index) => {
      const material = starField.material as THREE.ShaderMaterial;
      if (material.uniforms?.['time']) {
        material.uniforms['time'].value = elapsedTime + index * 0.5;
      }
      
      const rotationSpeed = 0.0002 * (index + 1);
      starField.rotation.y += rotationSpeed;
      starField.rotation.z += rotationSpeed * 0.5;
      
      // Subtle layer breathing
      const layerBreath = 1 + Math.sin(elapsedTime * 0.3 + index) * 0.02;
      starField.scale.setScalar(layerBreath);
    });

    // Enhanced crystal animation
    this.crystalFormations.forEach((crystal, index) => {
      const customCrystal = crystal as any;
      
      crystal.rotation.x += customCrystal.rotationSpeed.x;
      crystal.rotation.y += customCrystal.rotationSpeed.y;
      crystal.rotation.z += customCrystal.rotationSpeed.z;
      
      // Complex floating motion
      const floatOffset = elapsedTime * 0.8 + index * 0.7;
      crystal.position.y = customCrystal.originalY + 
        Math.sin(floatOffset) * 0.5 + 
        Math.sin(floatOffset * 1.7) * 0.2;
      
      // Subtle pulsing scale
      const pulse = 1 + Math.sin(elapsedTime * 2 + index * 0.5) * 0.1;
      crystal.scale.setScalar(pulse);
    });

    // Enhanced energy orb animation
    this.energyOrbs.forEach((orb, index) => {
      const customOrb = orb as any;
      const material = orb.material as THREE.ShaderMaterial;
      
      material.uniforms['time'].value = elapsedTime + index * 0.8;
      
      // Sophisticated floating patterns
      const timeOffset = elapsedTime * customOrb.floatSpeed + index * 0.8;
      orb.position.x = customOrb.originalPosition.x + 
        Math.sin(timeOffset) * customOrb.floatRadius + 
        Math.sin(timeOffset * 0.7) * (customOrb.floatRadius * 0.3);
      orb.position.y = customOrb.originalPosition.y + 
        Math.cos(timeOffset * 0.8) * (customOrb.floatRadius * 0.6) + 
        Math.sin(timeOffset * 1.2) * (customOrb.floatRadius * 0.2);
      orb.position.z = customOrb.originalPosition.z + 
        Math.sin(timeOffset * 1.1) * (customOrb.floatRadius * 0.4);
    });

    // Animate stardust layers with mesmerizing motion
    this.stardust.forEach((layer, layerIndex) => {
      const material = layer.material as THREE.ShaderMaterial;
      material.uniforms['time'].value = elapsedTime + layerIndex * 0.5;
      
      layer.rotation.y += 0.0001 * (layerIndex + 1);
      layer.rotation.z += 0.00005 * (layerIndex + 1);
    });

    // Animate cosmic rings with ethereal movement
    this.cosmicRings.forEach((ring, index) => {
      const customRing = ring as any;
      const material = ring.material as THREE.ShaderMaterial;
      material.uniforms['time'].value = elapsedTime + index * 0.7;
      
      ring.rotation.y += customRing.rotationSpeed;
      ring.rotation.z += customRing.rotationSpeed * 0.3;
    });

    // Animate light beams with dynamic direction changes
    this.lightBeams.forEach((beam, index) => {
      const customBeam = beam as any;
      const material = beam.material as THREE.ShaderMaterial;
      material.uniforms['time'].value = elapsedTime + index * 0.4;
      
      beam.rotation.y += customBeam.rotationSpeed;
      
      // Subtle position oscillation
      const oscillation = Math.sin(elapsedTime * 0.5 + index) * 0.2;
      beam.position.y = oscillation;
    });

    // Animate pulse waves with expanding energy
    this.pulseWaves.forEach((wave, index) => {
      const customWave = wave as any;
      const material = wave.material as THREE.ShaderMaterial;
      material.uniforms['time'].value = elapsedTime;
      material.uniforms['wavePhase'].value = customWave.wavePhase;
    });

    // Enhanced cinematic camera movement (no user interaction)
    this.cosmicTime = elapsedTime * 0.1;
    
    // Smooth orbital camera movement
    const cameraRadius = 15;
    const cameraHeight = 3 + Math.sin(this.cosmicTime * 0.3) * 2;
    this.camera.position.x = Math.cos(this.cosmicTime * 0.1) * cameraRadius;
    this.camera.position.y = cameraHeight;
    this.camera.position.z = Math.sin(this.cosmicTime * 0.1) * cameraRadius;
    
    // Dynamic camera tilt and focus
    const lookTarget = new THREE.Vector3(
      Math.sin(this.cosmicTime * 0.05) * 2,
      Math.cos(this.cosmicTime * 0.08) * 1,
      0
    );
    this.camera.lookAt(lookTarget);

    this.renderer.render(this.scene, this.camera);
  }
  
  private adaptPerformance(deltaTime: number): void {
    const fps = 1 / deltaTime;
    
    if (fps < 30 && !this.isLowPerformance) {
      this.isLowPerformance = true;
      this.particleScale *= 0.7;
      this.atmosphereIntensity *= 0.8;
      this.galaxyRotationSpeed *= 0.8;
    } else if (fps > 55 && this.isLowPerformance) {
      this.isLowPerformance = false;
      this.particleScale = Math.min(1.0, this.particleScale * 1.2);
      this.atmosphereIntensity = Math.min(1.0, this.atmosphereIntensity * 1.1);
      this.galaxyRotationSpeed = Math.min(0.0003, this.galaxyRotationSpeed * 1.1);
    }
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.onWindowResize.bind(this));
    // Mouse interaction disabled for pure visual experience
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onLogin(): void {
    console.log('Login attempt:', this.loginData);
  }

  onForgotPassword(event: Event): void {
    event.preventDefault();
    console.log('Forgot password clicked');
  }
}
