function initTransitions() {
    const overlay = document.createElement('div');
    overlay.id = 'transition-overlay';
    overlay.innerHTML = '<h2 style="color:white; font-family:serif;">Baking...</h2>';
    document.body.appendChild(overlay);

    // Entrance animation
    window.addEventListener('load', () => {
        overlay.classList.add('exit');
    });

    // Intercept Links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = link.href;

            // Play "Slide" Sound Effect
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain); gain.connect(audioCtx.destination);
            osc.frequency.setValueAtTime(600, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.5);
            gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
            osc.start(); osc.stop(audioCtx.currentTime + 0.5);

            overlay.classList.remove('exit');
            overlay.classList.add('active');

            setTimeout(() => { window.location.href = target; }, 500);
        });
    });
}
document.addEventListener('DOMContentLoaded', initTransitions);
