import React, { useEffect, useRef } from 'react';
import { Shield, Terminal, Cpu, Code2, ArrowRight } from 'lucide-react';

declare const window: any;

interface AtomHeroProps {
  onNavigate: (tab: string) => void;
}

export const AtomHero: React.FC<AtomHeroProps> = ({ onNavigate }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<SVGSVGElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    const stage = stageRef.current;
    const links = linksRef.current;
    if (!mount || !stage || !links) return;

    const THREE = window.THREE;
    if (!THREE) {
      document.documentElement.classList.add('no-atom');
      return;
    }

    let renderer: any;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
    } catch (e) {
      document.documentElement.classList.add('no-atom');
      return;
    }
    renderer.setClearColor(0x000000, 0);
    mount.innerHTML = '';
    mount.appendChild(renderer.domElement);

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 10, 30);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);

    // Ethiopian flag colors on the atom
    const GREEN = 0x14a94b;
    const YELLOW = 0xfcdd09;
    const RED = 0xe8262c;
    const GOLD = 0xffb81c;

    let seed = 11;
    function rand() {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    }

    function glowTexture() {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d')!;
      const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(0.25, 'rgba(255,255,255,0.5)');
      gr.addColorStop(0.55, 'rgba(255,255,255,0.1)');
      gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 128, 128);
      return new THREE.CanvasTexture(c);
    }
    const glowTex = glowTexture();

    function glowSprite(color: number, size: number, opacity: number) {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTex, color: color, transparent: true, opacity: opacity,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      s.scale.set(size, size, 1);
      return s;
    }

    const pointMats: any[] = [];
    function pointsMaterial(size: number, opacity: number, color: number, vertexColors: boolean) {
      const m = new THREE.PointsMaterial({
        size: size, map: glowTex, transparent: true, opacity: opacity,
        blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true
      });
      if (vertexColors) m.vertexColors = true; else m.color = new THREE.Color(color);
      m.userData.base = size;
      pointMats.push(m);
      return m;
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(3, 4, 5);
    scene.add(key);

    const atom = new THREE.Group();
    scene.add(atom);

    // Nucleus: 12 gold nucleons on vertices of icosahedron plus center
    const nucleus = new THREE.Group();
    atom.add(nucleus);
    const phi = (1 + Math.sqrt(5)) / 2;
    const NR = 0.36;
    const reps = [[1, phi, 0], [1, -phi, 0], [0, 1, phi], [0, 1, -phi], [phi, 0, 1], [-phi, 0, 1]];
    const verts: any[] = [];
    const nucleonGeo = new THREE.SphereGeometry(0.13, 18, 14);
    const goldMat = new THREE.MeshStandardMaterial({ color: GOLD, emissive: 0x7a4a00, emissiveIntensity: 0.45, roughness: 0.35, metalness: 0.35 });
    reps.forEach((r) => {
      const len = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
      [1, -1].forEach((sgn) => {
        const v = new THREE.Vector3(r[0] / len * NR * sgn, r[1] / len * NR * sgn, r[2] / len * NR * sgn);
        verts.push(v);
        const m = new THREE.Mesh(nucleonGeo, goldMat);
        m.position.copy(v);
        nucleus.add(m);
      });
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.17, 18, 14), goldMat);
    nucleus.add(core);

    let dmin = Infinity;
    const edgePts: number[] = [];
    for (let p = 0; p < verts.length; p++) {
      for (let q = p + 1; q < verts.length; q++) {
        dmin = Math.min(dmin, verts[p].distanceTo(verts[q]));
      }
    }
    for (let p2 = 0; p2 < verts.length; p2++) {
      for (let q2 = p2 + 1; q2 < verts.length; q2++) {
        if (Math.abs(verts[p2].distanceTo(verts[q2]) - dmin) < 1e-3) {
          edgePts.push(verts[p2].x, verts[p2].y, verts[p2].z, verts[q2].x, verts[q2].y, verts[q2].z);
        }
      }
    }
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePts), 3));
    nucleus.add(new THREE.LineSegments(edgeGeo, new THREE.LineBasicMaterial({ color: GOLD, transparent: true, opacity: 0.3 })));

    const halo = glowSprite(GOLD, 1.7, 0.22);
    atom.add(halo);

    // Orbits
    const SEMI = 3.0;
    const RFIT = 4.3;
    const TRAIL = 26;
    const FOLLOW = 5;
    const defs = [
      { e: 0.4, color: GREEN,  tilt: 1.0, az: 0,                argp: 0, n: 0.75, phase: 0.6 },
      { e: 0.4, color: YELLOW, tilt: 1.0, az: Math.PI * 2 / 3,  argp: 0, n: 0.65, phase: 2.6 },
      { e: 0.4, color: RED,    tilt: 1.0, az: Math.PI * 4 / 3,  argp: 0, n: 0.85, phase: 4.4 }
    ];
    const followOffsets = [1.15, 2.35, 3.3, 4.45, 5.4];
    const orbits: any[] = [];

    function kepler(M: number, e: number) {
      let E = M + e * Math.sin(M);
      for (let i = 0; i < 4; i++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      return E;
    }
    let ox = 0;
    let oy = 0;
    function orbitXY(o: any, M: number) {
      const E = kepler(M, o.e);
      ox = o.a * (Math.cos(E) - o.e);
      oy = o.b * Math.sin(E);
    }

    const diamondGeo = new THREE.OctahedronGeometry(1, 0);
    const dm = new THREE.Matrix4();
    const dq = new THREE.Quaternion();
    const dv = new THREE.Vector3();
    const ds = new THREE.Vector3();
    const zAxis = new THREE.Vector3(0, 0, 1);
    const electronGeo = new THREE.SphereGeometry(0.07, 14, 10);

    defs.forEach((d) => {
      const o: any = { e: d.e, a: SEMI, b: SEMI * Math.sqrt(1 - d.e * d.e), n: d.n, phase: d.phase };
      const col = new THREE.Color(d.color);

      const plane = new THREE.Group();
      plane.rotation.order = 'ZXY';
      plane.rotation.set(d.tilt, 0, d.az);
      atom.add(plane);
      const ell = new THREE.Group();
      ell.rotation.z = d.argp;
      plane.add(ell);
      o.ell = ell;

      const pts: any[] = [];
      for (let k = 0; k <= 200; k++) {
        const E = (k / 200) * Math.PI * 2;
        pts.push(new THREE.Vector3(o.a * (Math.cos(E) - o.e), o.b * Math.sin(E), 0));
      }
      ell.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color: d.color, transparent: true, opacity: 0.4 })));

      const count = 10;
      const diamonds = new THREE.InstancedMesh(diamondGeo, new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.85 }), count);
      for (let j = 0; j < count; j++) {
        const Ej = (j / count) * Math.PI * 2 + 0.3;
        dv.set(o.a * (Math.cos(Ej) - o.e), o.b * Math.sin(Ej), 0);
        dq.setFromAxisAngle(zAxis, Math.atan2(o.b * Math.cos(Ej), -o.a * Math.sin(Ej)));
        ds.set(0.11, 0.055, 0.055);
        dm.compose(dv, dq, ds);
        diamonds.setMatrixAt(j, dm);
      }
      diamonds.instanceMatrix.needsUpdate = true;
      diamonds.frustumCulled = false;
      ell.add(diamonds);

      const electron = new THREE.Group();
      electron.add(new THREE.Mesh(electronGeo, new THREE.MeshBasicMaterial({ color: d.color })));
      electron.add(glowSprite(d.color, 0.5, 0.5));
      ell.add(electron);
      o.electron = electron;

      const tPos = new Float32Array(TRAIL * 3);
      const tCol = new Float32Array(TRAIL * 3);
      for (let t = 0; t < TRAIL; t++) {
        const f = Math.pow(1 - t / TRAIL, 2) * 0.9;
        tCol[t * 3] = col.r * f; tCol[t * 3 + 1] = col.g * f; tCol[t * 3 + 2] = col.b * f;
      }
      const tGeo = new THREE.BufferGeometry();
      tGeo.setAttribute('position', new THREE.BufferAttribute(tPos, 3));
      tGeo.setAttribute('color', new THREE.BufferAttribute(tCol, 3));
      const trail = new THREE.Points(tGeo, pointsMaterial(0.13, 1, 0, true));
      trail.frustumCulled = false;
      ell.add(trail);
      o.trail = tGeo;

      const fPos = new Float32Array(FOLLOW * 3);
      const fGeo = new THREE.BufferGeometry();
      fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
      const followers = new THREE.Points(fGeo, pointsMaterial(0.1, 0.85, d.color, false));
      followers.frustumCulled = false;
      ell.add(followers);
      o.followers = fGeo;

      orbits.push(o);
    });

    // Dust particles
    const DUST = 170;
    const dPos = new Float32Array(DUST * 3);
    const dCol = new Float32Array(DUST * 3);
    const dustColors = [new THREE.Color(GREEN), new THREE.Color(YELLOW), new THREE.Color(RED)];
    for (let i = 0; i < DUST; i++) {
      const u = rand() * 2 - 1;
      const ang = rand() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const rad = 1.4 + 3.2 * Math.pow(rand(), 0.8);
      dPos[i * 3] = Math.cos(ang) * s * rad;
      dPos[i * 3 + 1] = u * rad;
      dPos[i * 3 + 2] = Math.sin(ang) * s * rad;
      const c = dustColors[i % 3];
      const br = 0.25 + rand() * 0.45;
      dCol[i * 3] = c.r * br; dCol[i * 3 + 1] = c.g * br; dCol[i * 3 + 2] = c.b * br;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
    const dust = new THREE.Points(dustGeo, pointsMaterial(0.06, 0.8, 0, true));
    dust.rotation.x = 0.6;
    dust.frustumCulled = false;
    atom.add(dust);

    // Dynamic tags linked to orbit peaks
    const SVGNS = 'http://www.w3.org/2000/svg';
    const ANCHORS = [{ o: 0, E: Math.PI }, { o: 1, E: Math.PI }, { o: 2, E: Math.PI }, { o: 0, E: Math.PI / 2 }];
    const tags: any[] = [];
    const tmp = new THREE.Vector3();
    let minX = 4;

    function svgEl(name: string, cls?: string) {
      const e = document.createElementNS(SVGNS, name);
      if (cls) e.setAttribute('class', cls);
      if (links) links.appendChild(e);
      return e;
    }
    function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

    if (links) links.innerHTML = '';
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const def = ANCHORS[i];
      if (!def) return;
      const o = orbits[def.o];
      const obj = new THREE.Object3D();
      obj.position.set(o.a * (Math.cos(def.E) - o.e), o.b * Math.sin(def.E), 0);
      o.ell.add(obj);
      tags.push({ el: el, obj: obj, line: svgEl('line'), halo: svgEl('circle', 'halo'), dot: svgEl('circle', 'dot'), w: 0, h: 0 });
    });

    function measureTags(w: number, h: number) {
      for (let i = 0; i < tags.length; i++) {
        tags[i].w = tags[i].el.offsetWidth;
        tags[i].h = tags[i].el.offsetHeight;
      }
      const copy = document.querySelector('.hero-copy');
      minX = 4;
      if (w >= 1024 && copy) {
        minX = copy.getBoundingClientRect().right - stage!.getBoundingClientRect().left + 14;
      }
      if (links) {
        links.setAttribute('viewBox', `0 0 ${w} ${h}`);
      }
    }

    function placeTags() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      const GAP = 14;
      if (!w || !h) return;
      camera.updateMatrixWorld();
      atom.updateMatrixWorld(true);
      const offX = stage!.offsetLeft;
      const offY = stage!.offsetTop;

      for (let i = 0; i < tags.length; i++) {
        const g = tags[i];
        g.obj.getWorldPosition(tmp);
        const depth = clamp((tmp.z + RFIT) / (2 * RFIT), 0, 1);
        tmp.project(camera);
        const x = (tmp.x * 0.5 + 0.5) * w;
        const y = (-tmp.y * 0.5 + 0.5) * h;
        const tVal = clamp(((x - w / 2) / (w * 0.28)) * 0.5 + 0.5, 0, 1);
        const left = clamp(x - g.w - GAP + tVal * (g.w + GAP * 2), minX, Math.max(minX, w - g.w - 4));
        const top = clamp(y - g.h / 2, 4, Math.max(4, h - g.h - 4));
        g.el.style.transform = `translate3d(${(offX + left).toFixed(1)}px,${(offY + top).toFixed(1)}px,0)`;
        g.el.style.opacity = (0.7 + 0.3 * depth).toFixed(2);
        const nx = clamp(x, left, left + g.w);
        const ny = clamp(y, top, top + g.h);
        g.line.setAttribute('x1', x.toFixed(1));
        g.line.setAttribute('y1', y.toFixed(1));
        g.line.setAttribute('x2', nx.toFixed(1));
        g.line.setAttribute('y2', ny.toFixed(1));
        g.halo.setAttribute('cx', x.toFixed(1));
        g.halo.setAttribute('cy', y.toFixed(1));
        g.halo.setAttribute('r', (6 + 5 * depth).toFixed(1));
        g.dot.setAttribute('cx', x.toFixed(1));
        g.dot.setAttribute('cy', y.toFixed(1));
        g.dot.setAttribute('r', (2.2 + 1.6 * depth).toFixed(1));
      }
    }

    function update(tVal: number) {
      atom.rotation.set(0.5 + tVal * 0.11, tVal * 0.3, tVal * 0.05);
      nucleus.rotation.y = tVal * 0.5;
      dust.rotation.y = tVal * 0.05;
      const pulse = 1.7 + Math.sin(tVal * 1.4) * 0.06;
      halo.scale.set(pulse, pulse, 1);

      for (let i = 0; i < orbits.length; i++) {
        const o = orbits[i];
        const M = o.phase + tVal * o.n;
        orbitXY(o, M);
        o.electron.position.set(ox, oy, 0);

        const tr = o.trail.attributes.position.array;
        for (let k = 0; k < TRAIL; k++) {
          orbitXY(o, M - k * 0.06);
          tr[k * 3] = ox; tr[k * 3 + 1] = oy; tr[k * 3 + 2] = 0;
        }
        o.trail.attributes.position.needsUpdate = true;

        const fl = o.followers.attributes.position.array;
        for (let j = 0; j < FOLLOW; j++) {
          orbitXY(o, M + followOffsets[j]);
          fl[j * 3] = ox; fl[j * 3 + 1] = oy; fl[j * 3 + 2] = 0;
        }
        o.followers.attributes.position.needsUpdate = true;
      }
    }

    function resize() {
      const w = mount!.clientWidth;
      const h = mount!.clientHeight;
      if (!w || !h) return;
      const pr = Math.min(window.devicePixelRatio || 1, w < 700 ? 1.5 : 2);
      renderer.setPixelRatio(pr);
      renderer.setSize(w, h, false);
      for (let i = 0; i < pointMats.length; i++) pointMats[i].size = pointMats[i].userData.base * pr;
      camera.aspect = w / h;
      const frac = w >= 1024 ? 0.74 : 0.84;
      const camZ = (RFIT / frac) / (Math.tan(camera.fov * Math.PI / 360) * Math.min(1, camera.aspect));
      camera.position.set(0, 0, camZ);
      camera.updateProjectionMatrix();
      camera.updateMatrixWorld();
      scene.fog.near = camZ - 1.5;
      scene.fog.far = camZ + RFIT * 2.2;
      measureTags(w, h);
      if (!raf) draw(still);
    }

    let raf = 0;
    let last = 0;
    let tTime = 0;
    const still = 2.4;
    let visible = true;
    function draw(time: number) {
      update(time);
      placeTags();
      renderer.render(scene, camera);
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      tTime += dt;
      draw(tTime);
    }

    function sync() {
      const run = !reduceMotion.matches && visible && !document.hidden;
      if (run && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (!run && reduceMotion.matches) draw(still);
    }

    let resizeObserver: ResizeObserver | null = null;
    if ('ResizeObserver' in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
    } else {
      window.addEventListener('resize', resize);
    }

    let intersectionObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      intersectionObserver = new IntersectionObserver((entries) => {
        visible = entries[0].isIntersecting;
        sync();
      });
      intersectionObserver.observe(mount);
    }

    document.addEventListener('visibilitychange', sync);
    if (reduceMotion.addEventListener) reduceMotion.addEventListener('change', sync);

    resize();
    sync();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (resizeObserver) resizeObserver.disconnect();
      if (intersectionObserver) intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      if (mount) mount.innerHTML = '';
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black text-[#F2F2F2] border-b border-[#2A2A2A]" aria-labelledby="hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-[580px] lg:min-h-[720px] flex flex-col justify-center">
        {/* Stage Container */}
        <div ref={stageRef} className="stage absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div ref={mountRef} className="atom absolute inset-0 w-full h-full pointer-events-none" />
          <svg ref={linksRef} className="links absolute inset-0 w-full h-full pointer-events-none">
            <style>{`
              .links line { stroke: #BFBFBF; stroke-opacity: 0.5; stroke-width: 1; }
              .links .dot { fill: #F2F2F2; }
              .links .halo { fill: #F2F2F2; fill-opacity: 0.14; }
            `}</style>
          </svg>
        </div>

        {/* Hero Left Vignette Gradient on Desktop */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-[1] bg-gradient-to-r from-black via-black/70 via-30% to-transparent" />

        {/* Hero Copy (Left) */}
        <div className="hero-copy relative z-10 max-w-xl py-12 lg:py-24">
          <p className="inline-block text-[#FFC21A] text-xs font-semibold uppercase tracking-[0.18em] mb-4">
            Ambo University · Woliso Campus
          </p>
          <h1 id="hero-title" className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6 text-balance">
            <span className="block text-white">Your Idea.</span>
            <span className="block text-[#FFC21A]">Our Next Breakthrough</span>
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-md">
            Open to every field. Built by curious minds. From Old Classroom ICT Building IT lab 01 and 06 to real-world impact.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('join')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#F2F2F2] text-black font-bold text-sm hover:bg-white transition-all shadow-xl hover:shadow-white/10 active:scale-95 cursor-pointer"
            >
              Join CGC (100% Free)
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-[#2A2A2A] bg-black/40 text-gray-200 hover:text-white font-medium text-sm hover:border-[#A3A3A3] transition-all backdrop-blur-sm cursor-pointer"
            >
              Explore Projects
            </button>
          </div>
        </div>

        {/* The 4 3D-Pinned Floating Cards */}
        <article
          ref={(el) => (cardRefs.current[0] = el)}
          onClick={() => onNavigate('projects')}
          className="card absolute z-20 w-[190px] p-3.5 rounded-xl border border-[#2A2A2A] bg-[#080808]/85 backdrop-blur-md shadow-2xl pointer-events-auto cursor-pointer hover:border-[#FFC21A]/60 transition-colors"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="flex items-center gap-2 font-display font-bold text-sm text-white mb-1.5">
            <Shield className="w-4 h-4 text-[#14a94b]" />
            Cybersecurity
          </h2>
          <p className="text-xs text-[#A3A3A3] leading-snug">
            Ethical hacking, defense and safe habits online.
          </p>
        </article>

        <article
          ref={(el) => (cardRefs.current[1] = el)}
          onClick={() => onNavigate('projects')}
          className="card absolute z-20 w-[190px] p-3.5 rounded-xl border border-[#2A2A2A] bg-[#080808]/85 backdrop-blur-md shadow-2xl pointer-events-auto cursor-pointer hover:border-[#FFC21A]/60 transition-colors"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="flex items-center gap-2 font-display font-bold text-sm text-white mb-1.5">
            <Terminal className="w-4 h-4 text-[#fcdd09]" />
            Programming
          </h2>
          <p className="text-xs text-[#A3A3A3] leading-snug">
            From first scripts to full web applications.
          </p>
        </article>

        <article
          ref={(el) => (cardRefs.current[2] = el)}
          onClick={() => onNavigate('projects')}
          className="card absolute z-20 w-[190px] p-3.5 rounded-xl border border-[#2A2A2A] bg-[#080808]/85 backdrop-blur-md shadow-2xl pointer-events-auto cursor-pointer hover:border-[#FFC21A]/60 transition-colors"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="flex items-center gap-2 font-display font-bold text-sm text-white mb-1.5">
            <Cpu className="w-4 h-4 text-[#e8262c]" />
            AI &amp; ML
          </h2>
          <p className="text-xs text-[#A3A3A3] leading-snug">
            Data, models and projects that learn and predict.
          </p>
        </article>

        <article
          ref={(el) => (cardRefs.current[3] = el)}
          onClick={() => onNavigate('projects')}
          className="card absolute z-20 w-[190px] p-3.5 rounded-xl border border-[#2A2A2A] bg-[#080808]/85 backdrop-blur-md shadow-2xl pointer-events-auto cursor-pointer hover:border-[#FFC21A]/60 transition-colors"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="flex items-center gap-2 font-display font-bold text-sm text-white mb-1.5">
            <Code2 className="w-4 h-4 text-[#14a94b]" />
            Software Dev
          </h2>
          <p className="text-xs text-[#A3A3A3] leading-snug">
            Teamwork, Git and shipping working products.
          </p>
        </article>
      </div>
    </section>
  );
};
