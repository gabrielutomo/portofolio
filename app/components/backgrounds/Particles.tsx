'use client';

import { useEffect, useRef } from 'react';

interface ParticlesProps {
    particleCount?: number;
    particleSpread?: number;
    speed?: number;
    particleColors?: string[];
    alphaParticles?: boolean;
    particleBaseSize?: number;
    sizeRandomness?: number;
    cameraDistance?: number;
    className?: string;
}

const Particles: React.FC<ParticlesProps> = ({
    particleCount = 120,
    particleSpread = 8,
    speed = 0.05,
    particleColors = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#ffffff'],
    alphaParticles = true,
    particleBaseSize = 80,
    sizeRandomness = 1,
    cameraDistance = 20,
    className = '',
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animId: number;
        let renderer: any, gl: any, camera: any, scene: any, mesh: any;

        const init = async () => {
            try {
                const { Renderer, Camera, Geometry, Program, Mesh, Transform } = await import('ogl');

                renderer = new Renderer({ dpr: 1, depth: false, alpha: true });
                gl = renderer.gl;
                container.appendChild(gl.canvas);
                gl.clearColor(0, 0, 0, 0);

                camera = new Camera(gl, { fov: 15 });
                camera.position.set(0, 0, cameraDistance);

                const resize = () => {
                    const w = container.clientWidth;
                    const h = container.clientHeight;
                    renderer.setSize(w, h);
                    camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
                };
                window.addEventListener('resize', resize);
                resize();

                const hexToRgb = (hex: string) => {
                    hex = hex.replace(/^#/, '');
                    if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
                    const int = parseInt(hex, 16);
                    return [(int >> 16 & 255) / 255, (int >> 8 & 255) / 255, (int & 255) / 255];
                };

                const count = particleCount;
                const positions = new Float32Array(count * 3);
                const randoms = new Float32Array(count * 4);
                const colors = new Float32Array(count * 3);

                for (let i = 0; i < count; i++) {
                    let x, y, z, len;
                    do {
                        x = Math.random() * 2 - 1;
                        y = Math.random() * 2 - 1;
                        z = Math.random() * 2 - 1;
                        len = x * x + y * y + z * z;
                    } while (len > 1 || len === 0);
                    const r = Math.cbrt(Math.random());
                    positions.set([x * r, y * r, z * r], i * 3);
                    randoms.set([Math.random(), Math.random(), Math.random(), Math.random()], i * 4);
                    const col = hexToRgb(particleColors[Math.floor(Math.random() * particleColors.length)]);
                    colors.set(col, i * 3);
                }

                const geometry = new Geometry(gl, {
                    position: { size: 3, data: positions },
                    random: { size: 4, data: randoms },
                    color: { size: 3, data: colors },
                });

                const vertex = `
          attribute vec3 position;
          attribute vec4 random;
          attribute vec3 color;
          uniform mat4 modelMatrix;
          uniform mat4 viewMatrix;
          uniform mat4 projectionMatrix;
          uniform float uTime;
          uniform float uSpread;
          uniform float uBaseSize;
          uniform float uSizeRandomness;
          varying vec4 vRandom;
          varying vec3 vColor;
          void main() {
            vRandom = random;
            vColor = color;
            vec3 pos = position * uSpread;
            pos.z *= 10.0;
            vec4 mPos = modelMatrix * vec4(pos, 1.0);
            float t = uTime;
            mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
            mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
            mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
            vec4 mvPos = viewMatrix * mPos;
            gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `;

                const fragment = `
          precision highp float;
          uniform float uTime;
          uniform float uAlphaParticles;
          varying vec4 vRandom;
          varying vec3 vColor;
          void main() {
            vec2 uv = gl_PointCoord.xy;
            float d = length(uv - vec2(0.5));
            float circle = smoothstep(0.5, 0.4, d) * 0.8;
            gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
          }
        `;

                const program = new Program(gl, {
                    vertex,
                    fragment,
                    uniforms: {
                        uTime: { value: 0 },
                        uSpread: { value: particleSpread },
                        uBaseSize: { value: particleBaseSize },
                        uSizeRandomness: { value: sizeRandomness },
                        uAlphaParticles: { value: alphaParticles ? 1 : 0 },
                    },
                    transparent: true,
                    depthTest: false,
                });

                scene = new Transform();
                mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
                mesh.setParent(scene);

                let startTime = performance.now();
                const animate = () => {
                    animId = requestAnimationFrame(animate);
                    const elapsed = (performance.now() - startTime) / 1000;
                    program.uniforms.uTime.value = elapsed * speed * 10;
                    scene.rotation.y = elapsed * speed * 0.3;
                    renderer.render({ scene, camera });
                };
                animate();

                return () => {
                    window.removeEventListener('resize', resize);
                };
            } catch (e) {
                console.error('Particles init error:', e);
            }
        };

        init();

        return () => {
            cancelAnimationFrame(animId);
            if (gl?.canvas && container.contains(gl.canvas)) {
                container.removeChild(gl.canvas);
            }
        };
    }, [particleCount, particleSpread, speed, particleBaseSize, sizeRandomness, cameraDistance, alphaParticles]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        />
    );
};

export default Particles;
