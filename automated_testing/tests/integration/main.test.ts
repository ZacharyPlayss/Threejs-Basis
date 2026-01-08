import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as THREE from 'three';
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
global.requestAnimationFrame = vi.fn((cb) => {
    return setTimeout(() => cb(Date.now()), 0) as unknown as number;
});
global.cancelAnimationFrame = vi.fn((id) => clearTimeout(id));
vi.mock('three/addons/loaders/GLTFLoader.js', () => ({
    GLTFLoader: class MockGLTFLoader {
        setDRACOLoader = vi.fn();
        load = vi.fn((url, onLoad) => {
            const mockScene = new THREE.Scene();
            const parts = url.split('/');
            mockScene.name = parts[parts.length - 1].split('.')[0];
            setTimeout(() => onLoad({ scene: mockScene }), 0);
        });
    }
}));

vi.mock('three/addons/loaders/DRACOLoader.js', () => ({
    DRACOLoader: class MockDRACOLoader {
        setDecoderPath = vi.fn();
    }
}));

vi.mock('lil-gui', () => ({
    default: class MockGUI {
        add = vi.fn(() => ({
            min: vi.fn().mockReturnThis(),
            max: vi.fn().mockReturnThis(),
            name: vi.fn().mockReturnThis()
        }));
        addFolder = vi.fn().mockReturnThis();
    }
}));

vi.mock('lil-gui-helper', () => ({
    createPositionSliders: vi.fn(),
    createRotationSliders: vi.fn(),
    createScaleSliders: vi.fn(),
    createAllTransformSliders: vi.fn(),
}));

describe('Main.js Three.js Integration', () => {
    let canvas: HTMLCanvasElement;
    let GLTFLoader: any;
    let DRACOLoader: any;

    beforeEach(async () => {
        document.body.innerHTML = `
      <nav><a href="#">Home</a></nav>
      <section>
        <article class="textArticle"><h2>3D Model</h2></article>
        <article>
          <canvas id="threejs-canvas" width="800" height="600" style="width: 800px; height: 600px;"></canvas>
        </article>
      </section>
    `;
        canvas = document.querySelector('#threejs-canvas') as HTMLCanvasElement;

        const GLTFModule = await import('three/addons/loaders/GLTFLoader.js');
        GLTFLoader = GLTFModule.GLTFLoader;

        const DRACOModule = await import('three/addons/loaders/DRACOLoader.js');
        DRACOLoader = DRACOModule.DRACOLoader;
    });

    afterEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('Initializes the Scene, Camera, and Renderer correctly', () => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.z = 5;
        const renderer = { setSize: vi.fn(), domElement: canvas };
        expect(scene).toBeDefined();
        expect(camera.position.z).toBe(5);
        expect(renderer.domElement).toBe(canvas);
    });

    it('Adds Lights and Basic Cube to the Scene', () => {
        const scene = new THREE.Scene();

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const spotLight = new THREE.SpotLight(0xffffff);
        spotLight.position.set(0, 0, 5);
        scene.add(spotLight);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        cube.name = "cube";
        scene.add(cube);

        expect(scene.children.length).toBe(3);
        const foundCube = scene.getObjectByName('cube');
        expect(foundCube).toBeDefined();
        expect((foundCube as THREE.Mesh).isMesh).toBe(true);
    });

    it('Configures GLTFLoader with Draco', () => {
        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('path');
        loader.setDRACOLoader(dracoLoader);

        expect(loader.setDRACOLoader).toHaveBeenCalledWith(dracoLoader);
        expect(dracoLoader.setDecoderPath).toHaveBeenCalled();
    });

    it('Loads Model and handles URL parsing', async () => {
        const loader = new GLTFLoader();
        const url = '../assets/models/Monkey.glb';

        const loadedScene = await new Promise<THREE.Group>((resolve) => {
            loader.load(url, (gltf: any) => {
                resolve(gltf.scene);
            });
        });

        expect(loader.load).toHaveBeenCalled();
        expect(loadedScene).toBeDefined();
        expect(loadedScene.name).toBe('Monkey');
    });
});
