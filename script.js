document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Animate skill cards and achievement cards on scroll
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };

    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(animateOnScroll, options);

    document.querySelectorAll('.skill-card, .achievement-card').forEach(card => {
        observer.observe(card);
    });

    // Particle.js configuration
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
        },
        retina_detect: true
    });

    // 3D animation using Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 300);
    document.getElementById('3d-animation').appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffcc00, wireframe: true });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    camera.position.z = 30;

    function animate() {
        requestAnimationFrame(animate);
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    // Resize 3D animation on window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = 300;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize Three.js scenes
    initNameAnimation();
    initAboutScene();
    initSkillIcons();
    initAchievementsScene();
    initContactScene();

    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
        });
    });

    // Particle.js configuration
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'repulse' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        }
    });
});

function initNameAnimation() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('name-3d').appendChild(renderer.domElement);

    // Add ambient and point lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create floating spheres
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: 0xffcc00,
        wireframe: true,
        transparent: true,
        opacity: 0.8
    });

    const spheres = [];
    for (let i = 0; i < 5; i++) {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(
            Math.random() * 10 - 5,
            Math.random() * 10 - 5,
            Math.random() * 10 - 5
        );
        scene.add(sphere);
        spheres.push({
            mesh: sphere,
            speed: Math.random() * 0.02 + 0.01,
            rotation: new THREE.Vector3(
                Math.random() * 0.02,
                Math.random() * 0.02,
                Math.random() * 0.02
            )
        });
    }

    camera.position.z = 15;

    // Add OrbitControls
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    function animate() {
        requestAnimationFrame(animate);
        
        spheres.forEach(sphere => {
            sphere.mesh.rotation.x += sphere.rotation.x;
            sphere.mesh.rotation.y += sphere.rotation.y;
            sphere.mesh.rotation.z += sphere.rotation.z;
            
            // Add floating animation
            sphere.mesh.position.y += Math.sin(Date.now() * sphere.speed) * 0.01;
        });

        controls.update();
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function initAboutScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('about-scene').appendChild(renderer.domElement);

    // Create DNA helix
    const dnaGeometry = new THREE.TorusKnotGeometry(5, 1.5, 100, 16);
    const dnaMaterial = new THREE.MeshPhongMaterial({
        color: 0xffcc00,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });
    const dna = new THREE.Mesh(dnaGeometry, dnaMaterial);
    scene.add(dna);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 20;

    function animate() {
        requestAnimationFrame(animate);
        dna.rotation.x += 0.01;
        dna.rotation.y += 0.005;
        renderer.render(scene, camera);
    }

    animate();
}

function initSkillIcons() {
    document.querySelectorAll('.skill-3d-icon').forEach((container, index) => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        
        renderer.setSize(100, 100);
        container.appendChild(renderer.domElement);

        // Create custom geometry based on skill
        const geometry = new THREE.IcosahedronGeometry(1, 0);
        const material = new THREE.MeshPhongMaterial({
            color: 0xffcc00,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.01;
            mesh.rotation.y += 0.01;
            renderer.render(scene, camera);
        }

        animate();
    });
}

function initAchievementsScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('achievements-scene').appendChild(renderer.domElement);

    // Create floating trophies
    const trophyGeometry = new THREE.ConeGeometry(1, 2, 32);
    const trophyMaterial = new THREE.MeshPhongMaterial({
        color: 0xffcc00,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });

    const trophies = [];
    for (let i = 0; i < 8; i++) {
        const trophy = new THREE.Mesh(trophyGeometry, trophyMaterial);
        trophy.position.set(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        scene.add(trophy);
        trophies.push({
            mesh: trophy,
            speed: Math.random() * 0.02 + 0.01
        });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 20;

    function animate() {
        requestAnimationFrame(animate);
        trophies.forEach(trophy => {
            trophy.mesh.rotation.y += 0.01;
            trophy.mesh.position.y += Math.sin(Date.now() * trophy.speed) * 0.02;
        });
        renderer.render(scene, camera);
    }

    animate();
}

function initContactScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('contact-scene').appendChild(renderer.domElement);

    // Create floating envelopes
    const envelopeGeometry = new THREE.BoxGeometry(2, 1.5, 0.2);
    const envelopeMaterial = new THREE.MeshPhongMaterial({
        color: 0xffcc00,
        wireframe: true,
        transparent: true,
        opacity: 0.5
    });

    const envelopes = [];
    for (let i = 0; i < 5; i++) {
        const envelope = new THREE.Mesh(envelopeGeometry, envelopeMaterial);
        envelope.position.set(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        );
        scene.add(envelope);
        envelopes.push({
            mesh: envelope,
            speed: Math.random() * 0.02 + 0.01
        });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 20;

    function animate() {
        requestAnimationFrame(animate);
        envelopes.forEach(envelope => {
            envelope.mesh.rotation.y += 0.01;
            envelope.mesh.position.y += Math.sin(Date.now() * envelope.speed) * 0.02;
        });
        renderer.render(scene, camera);
    }

    animate();
}