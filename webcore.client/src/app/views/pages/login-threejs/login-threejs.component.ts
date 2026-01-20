import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-login-threejs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-threejs.component.html',
  styleUrl: './login-threejs.component.scss',
})
export class LoginThreejsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('galaxyContainer', { static: true }) galaxyContainer!: ElementRef;

  loginForm: FormGroup;
  isLoading = false;

  // Three.js properties
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private galaxyGroup!: THREE.Group;
  private animationId!: number;
  private circleTexture!: THREE.Texture;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
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
    const radius = 8;
    const branches = this.getRandomIntExclusiveMax(3, 8);
    const spin = 1;
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
    const particleCount = this.getRandomIntExclusiveMax(10000, 12000);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const insideColor = new THREE.Color('#ff6030');
    const outsideColor = new THREE.Color('#1b3984');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position
      const r = Math.random() * radius;
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Color variation
      const mixedColor = insideColor.clone();
      mixedColor.lerp(outsideColor, r / radius);
      
      // Add some color variation
      mixedColor.r += (Math.random() - 0.5) * 0.1;
      mixedColor.g += (Math.random() - 0.5) * 0.1;
      mixedColor.b += (Math.random() - 0.5) * 0.1;

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      // Size variation
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
    const particleCount = this.getRandomIntExclusiveMax(600, 1000);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const brightColors = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#ffddaa'),
      new THREE.Color('#aaddff'),
      new THREE.Color('#ffaadd'),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position with preference for core and arms
      const r = Math.pow(Math.random(), 2) * radius;
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.3;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r * 0.5;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Bright star colors
      const color = brightColors[Math.floor(Math.random() * brightColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      // Larger sizes for bright stars
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
    const particleCount = this.getRandomIntExclusiveMax(2000, 3000);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Distant background stars
      positions[i3] = (Math.random() - 0.5) * 50;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 50;

      // Dim white/blue colors
      const brightness = Math.random() * 0.3 + 0.1;
      colors[i3] = brightness + Math.random() * 0.1;
      colors[i3 + 1] = brightness + Math.random() * 0.1;
      colors[i3 + 2] = brightness + Math.random() * 0.15;
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
    // Random nebula clouds around the galaxy. It from 2000 to 3000 particles.
    const particleCount = this.getRandomIntExclusiveMax(2000, 3000);
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const nebulaColors = [
      new THREE.Color('#ff3030'),
      new THREE.Color('#3030ff'),
      new THREE.Color('#ff30ff'),
      new THREE.Color('#30ffff')
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position in spiral arms with more spread
      const r = Math.random() * radius * 1.2;
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX = (Math.random() - 0.5) * randomness * r * 3;
      const randomY = (Math.random() - 0.5) * randomness * r * 2;
      const randomZ = (Math.random() - 0.5) * randomness * r * 3;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      // Nebula colors
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
  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      
      // Simulate login process
      setTimeout(() => {
        console.log('Login attempt:', this.loginForm.value);
        // Here you would typically call your authentication service
        // this.authService.login(this.loginForm.value).subscribe(...);
        
        this.isLoading = false;
        // Add success animation or redirect logic here
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.loginForm.controls).forEach(key => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
