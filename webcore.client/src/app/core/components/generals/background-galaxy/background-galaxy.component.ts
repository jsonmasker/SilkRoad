import { Component, ElementRef, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-background-galaxy',
  templateUrl: './background-galaxy.component.html',
  styleUrl: './background-galaxy.component.scss',
  imports: []
})
export class BackgroundGalaxyComponent implements AfterViewInit, OnDestroy {
  @ViewChild('galaxyContainer', { static: true }) galaxyContainer!: ElementRef;
  // Three.js properties
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private galaxyGroup!: THREE.Group;
  private animationId!: number;
  private circleTexture!: THREE.Texture;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initThreeJS();
    this.createCircleTexture();
    this.createGalaxy();
    this.animate();
    
    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
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
    // Create scene
    this.scene = new THREE.Scene();

    // Create camera
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 2;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x0a0a0a, 1);
    
    // Add to DOM
    this.galaxyContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  private createCircleTexture(): void {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    
    const context = canvas.getContext('2d')!;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = canvas.width / 2;
    
    // Create radial gradient for smooth circular shape
    const gradient = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.1, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    this.circleTexture = new THREE.CanvasTexture(canvas);
  }

  private createGalaxy(): void {
    // Create galaxy group to hold all objects
    this.galaxyGroup = new THREE.Group();
    this.scene.add(this.galaxyGroup);

    // Galaxy parameters
    const radius = this.getRandomIntExclusiveMax(6, 9);
    const branches = this.getRandomIntExclusiveMax(3, 8);
    const spin = this.getRandomIntExclusiveMax(1,4);
    const randomness = 0.2;
    const randomnessPower = 3;

    // Create main star field
    this.createMainStars(radius, branches, spin, randomness, randomnessPower);
    
    // Create bright core stars
    this.createBrightStars(radius, branches, spin, randomness, randomnessPower);
    
    // Create distant background stars
    this.createBackgroundStars();
    
    // Create nebula clouds
    this.createNebulaClouds(radius, branches, spin, randomness);
  }

  private createMainStars(radius: number, branches: number, spin: number, randomness: number, randomnessPower: number): void {
    // Generate a large number of particles (10,000-12,000) to form the main galaxy structure
    const particleCount = this.getRandomIntExclusiveMax(10000, 12000);
    
    // Create typed arrays for efficient GPU rendering - positions (x,y,z), colors (r,g,b), sizes
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Define galaxy color gradient: warm orange-red center fading to cool blue at edges
    const insideColor = new THREE.Color('#ff6030'); // Warm orange-red for galactic core
    const outsideColor = new THREE.Color('#1b3984'); // Cool blue for outer regions

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3; // Index for 3D coordinate arrays

      // POSITION CALCULATION: Create spiral galaxy arms with randomness
      const r = Math.random() * radius; // Distance from center (0 to max radius)
      const branchAngle = (i % branches) / branches * Math.PI * 2; // Which spiral arm this star belongs to
      const spinAngle = r * spin; // How much the arm spirals outward (creates the spiral shape)

      // Add controlled randomness to prevent perfectly straight arms
      // randomnessPower makes inner stars more tightly clustered, outer stars more spread out
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      // Final position: spiral arm position + random offset
      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;     // X coordinate
      positions[i3 + 1] = randomY;                                         // Y coordinate (height)
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ; // Z coordinate

      // COLOR CALCULATION: Interpolate between center and edge colors based on distance
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, r / radius); // Linear interpolation from center to edge color
      
      // Add subtle random color variation to prevent uniform coloring
      mixedColor.r += (Math.random() - 0.5) * 0.1;
      mixedColor.g += (Math.random() - 0.5) * 0.1;
      mixedColor.b += (Math.random() - 0.5) * 0.1;

      // Store RGB color values
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // SIZE VARIATION: Random sizes between 0.2 and 1.0 for visual variety
      sizes[i] = Math.random() * 0.8 + 0.2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.008,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.8,
      map: this.circleTexture,
      alphaTest: 0.001
    });

    const stars = new THREE.Points(geometry, material);
    this.galaxyGroup.add(stars);
  }

  private createBrightStars(radius: number, branches: number, spin: number, randomness: number, randomnessPower: number): void {
    // Create fewer but more prominent stars (600-1000) that will stand out as bright points
    const particleCount = this.getRandomIntExclusiveMax(600, 1000);
    
    // Typed arrays for positions, colors, and sizes
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    // Palette of bright stellar colors representing different star types
    const brightColors = [
      new THREE.Color('#ffffff'), // Pure white - hottest stars
      new THREE.Color('#ffddaa'), // Warm yellow-white - sun-like stars
      new THREE.Color('#aaddff'), // Blue-white - hot massive stars
      new THREE.Color('#ffaadd'), // Pink-white - unusual stellar types
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // POSITION: Bias toward galactic center and spiral arms using power of 2
      // Math.pow(Math.random(), 2) creates more stars near center (r=0) than at edges
      const r = Math.pow(Math.random(), 2) * radius;
      const branchAngle = (i % branches) / branches * Math.PI * 2; // Spiral arm assignment
      const spinAngle = r * spin; // Spiral curvature

      // Reduced randomness for bright stars - keep them more organized along spiral arms
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.3; // Less vertical spread
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5;

      // Calculate final positions along spiral arms with controlled scatter
      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // COLOR: Randomly select from bright stellar color palette
      const color = brightColors[Math.floor(Math.random() * brightColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // SIZE: Make these stars larger (1.0 to 3.0) to emphasize their brightness
      sizes[i] = Math.random() * 2 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
      map: this.circleTexture,
      alphaTest: 0.001
    });

    const brightStars = new THREE.Points(geometry, material);
    this.galaxyGroup.add(brightStars);
  }

  private createBackgroundStars(): void {
    // Create a moderate number of background stars (2000-3000) to fill the distant space
    const particleCount = this.getRandomIntExclusiveMax(2000, 3000);
    
    // Only need positions and colors - sizes will be uniform and small
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // POSITION: Scatter randomly in a large cube (50x50x50) around the galaxy
      // These represent distant stars and galaxies far from our main galaxy
      positions[i3] = (Math.random() - 0.5) * 50;     // X: -25 to +25
      positions[i3 + 1] = (Math.random() - 0.5) * 50; // Y: -25 to +25  
      positions[i3 + 2] = (Math.random() - 0.5) * 50; // Z: -25 to +25

      // COLOR: Create dim, distant-looking stars with subtle blue tint
      // Base brightness is low (0.1 to 0.4) to simulate distance
      const brightness = Math.random() * 0.3 + 0.1;
      colors[i3] = brightness + Math.random() * 0.1;     // Red component
      colors[i3 + 1] = brightness + Math.random() * 0.1; // Green component
      colors[i3 + 2] = brightness + Math.random() * 0.15; // Blue component (slightly higher for blue tint)
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.003,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.4,
      map: this.circleTexture,
      alphaTest: 0.001
    });

    const backgroundStars = new THREE.Points(geometry, material);
    this.galaxyGroup.add(backgroundStars);
  }

  private createNebulaClouds(radius: number, branches: number, spin: number, randomness: number): void {
    // Create nebula-like gas clouds (2000-3000 particles) that add color and atmosphere
    // These represent ionized gas clouds illuminated by nearby stars
    const particleCount = this.getRandomIntExclusiveMax(2000, 3000);
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Vibrant nebula colors representing different ionized gases
    const nebulaColors = [
      new THREE.Color('#ff3030'), // Red - hydrogen alpha emission
      new THREE.Color('#3030ff'), // Blue - oxygen and other heavy elements
      new THREE.Color('#ff30ff'), // Magenta - mixed hydrogen and oxygen
      new THREE.Color('#30ffff')  // Cyan - exotic gas compositions
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // POSITION: Follow spiral structure but extend beyond main galaxy (radius * 1.2)
      // Nebulae often exist in the outer regions and between spiral arms
      const r = Math.random() * radius * 1.2; // Extend 20% beyond main galaxy
      const branchAngle = (i % branches) / branches * Math.PI * 2; // Align with spiral arms
      const spinAngle = r * spin; // Follow spiral curvature

      // HIGH RANDOMNESS: Nebulae are diffuse clouds, not point sources like stars
      // Much larger random offsets (3x and 2x) create cloud-like distributions
      const randomX = (Math.random() - 0.5) * randomness * r * 3; // Large horizontal spread
      const randomY = (Math.random() - 0.5) * randomness * r * 2; // Moderate vertical spread
      const randomZ = (Math.random() - 0.5) * randomness * r * 3; // Large depth spread

      // Final positions create diffuse, cloud-like regions
      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // COLOR: Randomly select from nebula emission colors
      const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.15,
      map: this.circleTexture,
      alphaTest: 0.001
    });

    const nebula = new THREE.Points(geometry, material);
    this.galaxyGroup.add(nebula);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    // Rotate the galaxy slowly
    if (this.galaxyGroup) {
      this.galaxyGroup.rotation.y += 0.0003;
      // Add slight wobble to make it more dynamic
      this.galaxyGroup.rotation.x = Math.sin(Date.now() * 0.0001) * 0.1;
    }

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private getRandomIntExclusiveMax(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  }
}
