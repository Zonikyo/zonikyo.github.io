document.addEventListener('DOMContentLoaded', () => {
    // DOM Element Cache
    const pageLoader = document.getElementById('page-loader');
    const homeView = document.getElementById('home-view');
    const gameView = document.getElementById('game-view');
    const gameGrid = document.getElementById('game-grid');
    const homepageGreeting = document.getElementById('homepage-greeting');
    const gameTitle = document.getElementById('game-title');
    const iframeContainer = document.getElementById('iframe-container');
    const gameIframe = document.getElementById('game-iframe');
    const iframeLoader = document.getElementById('iframe-loader');
    const fullscreenButton = document.getElementById('fullscreen-button');
    const fullscreenIconOpen = document.getElementById('fullscreen-icon-open');
    const fullscreenIconExit = document.getElementById('fullscreen-icon-exit');
    const gameDescription = document.getElementById('game-description');
    const backButton = document.getElementById('back-button');
    const mainElement = document.querySelector('main');
    const aspectRatioDropdown = document.getElementById('aspect-ratio-dropdown');
    const dropdownButton = document.getElementById('dropdown-button');
    const dropdownMenu = document.getElementById('dropdown-menu');
    const dropdownLabel = document.getElementById('dropdown-label');
    const aspectRatioOptions = document.querySelectorAll('.aspect-ratio-option');
    const homepageSearchInput = document.getElementById('homepage-search-input');
    const searchTagsContainer = document.getElementById('search-tags-container');
    const homepageSearchTagsWrapper = document.getElementById('homepage-search-tags-wrapper');
    const scrollTagsLeftHomeBtn = document.getElementById('scroll-tags-left-home');
    const scrollTagsRightHomeBtn = document.getElementById('scroll-tags-right-home');
    const logoLink = document.getElementById('logo-link');
    const navbarClock = document.getElementById('navbar-clock');
    const navbarSearchButton = document.getElementById('navbar-search-button');
    const navbarSettingsButton = document.getElementById('navbar-settings-button');
    const searchOverlay = document.getElementById('search-overlay');
    const searchOverlayCloseButton = document.getElementById('search-overlay-close-button');
    const searchOverlayInput = document.getElementById('search-overlay-input');
    const searchOverlayTagsContainer = document.getElementById('search-overlay-tags-container');
    const overlaySearchTagsWrapper = document.getElementById('overlay-search-tags-wrapper');
    const scrollTagsLeftOverlayBtn = document.getElementById('scroll-tags-left-overlay');
    const scrollTagsRightOverlayBtn = document.getElementById('scroll-tags-right-overlay');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const mainFooter = document.getElementById('main-footer');
    const warningModalBackdrop = document.getElementById('warning-modal-backdrop');
    const warningModal = document.getElementById('warning-modal');
    const modalStayButton = document.getElementById('modal-stay-button');
    const modalLeaveButton = document.getElementById('modal-leave-button');
    const settingsModalBackdrop = document.getElementById('settings-modal-backdrop');
    const settingsModal = document.getElementById('settings-modal');
    const settingBackWarningInput = document.getElementById('setting-back-warning');
    const settingSoundEffectsInput = document.getElementById('setting-sound-effects');
    const settingProxyModeInput = document.getElementById('setting-proxy-mode');
    const settingUserNameInput = document.getElementById('setting-user-name');
    const settingsCloseButton = document.getElementById('settings-close-button');
    const settingsSaveButton = document.getElementById('settings-save-button');
    const onboardingBackdrop = document.getElementById('onboarding-backdrop');
    const onboardingModal = document.getElementById('onboarding-modal');
    const onboardingSteps = document.querySelectorAll('.onboarding-step');
    const onboardingNameInput = document.getElementById('onboarding-name-input');
    const onboardingUsernamePlaceholders = document.querySelectorAll('.onboarding-username-placeholder');
    const onboardingNextButtons = document.querySelectorAll('.onboarding-next');
    const onboardingPrevButtons = document.querySelectorAll('.onboarding-prev');
    const onboardingFinishButton = document.getElementById('onboarding-finish');
    const onboardingSkipButton = document.getElementById('onboarding-skip');
    const replayOnboardingButton = document.getElementById('replay-onboarding-button');
    const onboardingCutsceneOverlay = document.getElementById('onboarding-cutscene-overlay');
    const cutsceneText1 = document.getElementById('cutscene-text-1');
    const cutsceneText2 = document.getElementById('cutscene-text-2');
    const cutsceneScanline = document.getElementById('cutscene-scanline');

    // State Variables
    let isTransitioning = false;
    let iframeLoadTimeout = null;
    let iframeHasLoaded = false;
    let minLoaderTimePassed = false;
    const MIN_LOADER_TIME = 1500;
    let blurTimeoutHome = null;
    let blurTimeoutOverlay = null;
    let pageLoadMinTimePassed = false;
    let pageContentLoaded = false;
    let gameViewStartTime = null;
    let warningTimeout = null;
    const WARNING_DELAY = 10000;
    const PROXY_URL_PREFIX = 'https://neonwave-proxy-service.thebestmate100.workers.dev/?q=';
    let currentOnboardingStep = 0;
    const ONBOARDING_STORAGE_KEY = 'neonWaveOnboardingCompleted';
    const CUTSCENE_TOTAL_DURATION = 8500; // Increased duration for more elaborate sequence
    const CUTSCENE_FLASH_POINT = 6000; // When the white flash happens
    const CUTSCENE_REVEAL_POINT = 6300; // When the site starts revealing after flash

    let settings = {
        showBackButtonWarning: true,
        soundEffectsEnabled: true,
        proxyModeEnabled: false,
        userName: '',
        onboardingCompleted: false
    };

    let synths = {};
    let toneStarted = false;
    let scanlineInterval = null;
    let tileGlowInterval = null;

    const aspectClasses = ['aspect-16-9', 'aspect-4-3', 'aspect-1-1'];
    const PAGE_LOAD_MIN_TIME = 1500;

    // --- Sound Engine (Tone.js) ---
    function initTone() {
        if (toneStarted || typeof Tone === 'undefined') return;
        Tone.start().then(() => {
            toneStarted = true;
            synths.click = new Tone.Synth({ oscillator: { type: 'triangle' }, envelope: { attack: 0.005, decay: 0.1, sustain: 0.05, release: 0.1 }, volume: -18 }).toDestination();
            synths.hover = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.001, decay: 0.05, sustain: 0, release: 0.05 }, volume: -28 }).toDestination();
            synths.load = new Tone.PolySynth(Tone.Synth, { oscillator: { type: 'fatsawtooth', count: 3, spread: 30 }, envelope: { attack: 0.01, decay: 0.3, sustain: 0.1, release: 0.4 }, volume: -15 }).toDestination();
            synths.transition = new Tone.NoiseSynth({ noise: { type: 'white' }, envelope: { attack: 0.005, decay: 0.15, sustain: 0, release: 0.1 }, volume: -25 }).toDestination();
            synths.error = new Tone.Synth({ oscillator: { type: 'square' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0, release: 0.2 }, volume: -15 }).toDestination();
            synths.cutsceneBoot = new Tone.NoiseSynth({ noise: { type: "pink", playbackRate: 0.1 }, envelope: { attack: 1, decay: 0.8, sustain: 0.2, release: 0.8 }, volume: -10 }).toDestination();
            synths.cutsceneType = new Tone.MembraneSynth({ pitchDecay: 0.005, octaves: 2.5, envelope: { attack: 0.001, decay: 0.15, sustain: 0 }, volume: -12 }).toDestination();
            synths.tileGlow = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.1, decay: 0.3, sustain: 0.05, release: 0.5 }, volume: -20 }).toDestination();
            synths.flash = new Tone.NoiseSynth({ noise: {type: 'white'}, envelope: { attack: 0.01, decay: 0.3, sustain:0, release: 0.1}, volume: -9}).toDestination();
            synths.slam = new Tone.MetalSynth({frequency: 80, envelope: {attack: 0.001, decay:0.4, release: 0.1}, harmonicity: 3.1, modulationIndex: 16, resonance: 2000, octaves: 0.5, volume: -6}).toDestination();

        }).catch(e => console.error("Failed to start Tone.js audio context:", e));
    }

    function playSound(type, noteOrParams) {
        if (!settings.soundEffectsEnabled || !toneStarted || !synths[type] || typeof Tone === 'undefined') return;
        const now = Tone.now();
        try {
            switch (type) {
                case 'click': synths.click.triggerAttackRelease('C5', '16n', now); break;
                case 'hover': synths.hover.triggerAttackRelease('A5', '32n', now); break;
                case 'load': synths.load.triggerAttackRelease(['C3', 'G3', 'C4'], '4n', now); break;
                case 'transition': synths.transition.triggerAttackRelease('8n', now); break;
                case 'error': synths.error.triggerAttackRelease('A3', '8n', now); break;
                case 'cutsceneBoot': synths.cutsceneBoot.triggerAttackRelease("1s", now); break;
                case 'cutsceneType': synths.cutsceneType.triggerAttackRelease(noteOrParams || "C2", "32n", now + Math.random()*0.05); break;
                case 'tileGlow': synths.tileGlow.triggerAttackRelease(noteOrParams || "A3", "0.5s", now); break;
                case 'flash': synths.flash.triggerAttackRelease("0.3s", now); break;
                case 'slam': synths.slam.triggerAttackRelease("8n", now); break;
            }
        } catch (error) {
            console.error("Tone.js error playing sound:", error, type);
        }
    }

    // --- UI & View Management ---
    function adjustMainHeight(elementToShow) {
        if (!mainElement || !elementToShow) return;
        const wasHidden = elementToShow.classList.contains('hidden');
        if (wasHidden) {
            elementToShow.style.visibility = 'hidden';
            elementToShow.style.position = 'absolute';
            elementToShow.classList.remove('hidden');
        }
        requestAnimationFrame(() => {
            const elementHeight = elementToShow.scrollHeight;
            mainElement.style.minHeight = `${elementHeight}px`;
            if (wasHidden) {
                elementToShow.classList.add('hidden');
                elementToShow.style.visibility = '';
                elementToShow.style.position = '';
            }
        });
    }

    function hideIframeLoader() {
        if (iframeHasLoaded && minLoaderTimePassed && iframeLoader) {
            iframeLoader.classList.add('hidden');
        }
    }

    function handleIframeLoad() {
        iframeHasLoaded = true;
        hideIframeLoader();
    }

    function switchView(viewToShow, viewToHide) {
        if (isTransitioning || !viewToShow || !viewToHide || !mainFooter) return;
        isTransitioning = true;
        playSound('transition');
        mainFooter.style.opacity = '0';
        mainFooter.style.pointerEvents = 'none';
        adjustMainHeight(viewToShow);
        viewToHide.classList.add('view-exit-active');
        viewToHide.addEventListener('animationend', function onHideEnd() {
            viewToHide.removeEventListener('animationend', onHideEnd);
            viewToHide.classList.remove('view-exit-active');
            viewToHide.classList.add('hidden');
            viewToHide.style.opacity = ''; viewToHide.style.transform = '';
            viewToShow.classList.remove('hidden');
            viewToShow.classList.add('view-enter-active');
            window.scrollTo(0, 0);
            viewToShow.addEventListener('animationend', function onShowEnd() {
                viewToShow.removeEventListener('animationend', onShowEnd);
                viewToShow.classList.remove('view-enter-active');
                viewToShow.style.opacity = ''; viewToShow.style.transform = '';
                isTransitioning = false;
                mainFooter.style.opacity = '1';
                mainFooter.style.pointerEvents = 'auto';
                adjustMainHeight(viewToShow);
            }, { once: true });
        }, { once: true });
    }

    function getGameUrl(originalUrl) {
        if (!originalUrl) return 'about:blank';
        return settings.proxyModeEnabled ? `${PROXY_URL_PREFIX}${encodeURIComponent(originalUrl)}` : originalUrl;
    }

    function updateGameViewContent(game) {
        if (!game || !gameTitle || !gameDescription || !iframeContainer || !dropdownLabel || !aspectRatioOptions.length || !iframeLoader || !gameIframe) return;
        gameTitle.textContent = game.title || "Game Title";
        gameDescription.innerHTML = game.description || "No description available.";
        iframeContainer.classList.remove(...aspectClasses);
        iframeContainer.classList.add('aspect-16-9');
        dropdownLabel.textContent = '16:9';
        aspectRatioOptions.forEach(opt => {
            opt.classList.toggle('active', opt.dataset.aspect === 'aspect-16-9');
        });
        if (aspectRatioDropdown) aspectRatioDropdown.classList.remove('open');
        iframeHasLoaded = false;
        minLoaderTimePassed = false;
        iframeLoader.classList.remove('hidden');
        gameIframe.removeEventListener('load', handleIframeLoad);
        gameIframe.addEventListener('load', handleIframeLoad, { once: true });
        gameIframe.src = 'about:blank';
        setTimeout(() => { gameIframe.src = getGameUrl(game.iframeUrl); }, 50);
        clearTimeout(iframeLoadTimeout);
        iframeLoadTimeout = setTimeout(() => {
            minLoaderTimePassed = true;
            hideIframeLoader();
        }, MIN_LOADER_TIME);
        if (gameView) adjustMainHeight(gameView);
        window.scrollTo(0, 0);
    }

    function navigateHomeCleanUp() {
        if (gameIframe) {
            gameIframe.removeEventListener('load', handleIframeLoad);
            gameIframe.src = 'about:blank';
        }
        if (iframeLoader) iframeLoader.classList.add('hidden');
        clearTimeout(iframeLoadTimeout);
        if (iframeContainer && dropdownLabel && aspectRatioOptions.length) {
            iframeContainer.classList.remove(...aspectClasses);
            iframeContainer.classList.add('aspect-16-9');
            dropdownLabel.textContent = '16:9';
            aspectRatioOptions.forEach(opt => {
                opt.classList.toggle('active', opt.dataset.aspect === 'aspect-16-9');
            });
            if (aspectRatioDropdown) aspectRatioDropdown.classList.remove('open');
        }
    }

    function navigateHome() {
        if (!homeView || !gameView) return;
        const isOverlayVisible = searchOverlay && searchOverlay.classList.contains('visible');
        const isGameViewVisible = !gameView.classList.contains('hidden');
        if (isOverlayVisible) closeSearchOverlay();
        if (isGameViewVisible) {
            navigateHomeCleanUp();
            switchView(homeView, gameView);
        } else if (homeView.classList.contains('hidden') && !isGameViewVisible && !isOverlayVisible) {
            homeView.classList.remove('hidden');
        }
        if (homepageSearchInput) homepageSearchInput.value = '';
        if (typeof games !== 'undefined' && gameGrid) renderGameGrid(games, gameGrid);
        if (homepageSearchTagsWrapper && gameGrid) hideSearchTags(homepageSearchTagsWrapper, gameGrid);
        updateHomepageGreeting();
        if (homeView) adjustMainHeight(homeView);
        window.scrollTo(0, 0);
    }

    function attemptShowHomeView(event) {
        if (event) event.preventDefault();
        if (!gameView || gameView.classList.contains('hidden')) {
            navigateHome();
            return;
        }
        const timeElapsed = gameViewStartTime ? Date.now() - gameViewStartTime : WARNING_DELAY + 1;
        if (settings.showBackButtonWarning && timeElapsed > WARNING_DELAY) {
            showWarningModal();
        } else {
            navigateHome();
        }
    }

    function showGameViewUI(game) {
        if (!game) {
            console.error("No game data provided to showGameViewUI");
            playSound('error');
            return;
        }
        updateGameViewContent(game);
        if (homeView && gameView) switchView(gameView, homeView);
        gameViewStartTime = Date.now();
        clearTimeout(warningTimeout);
    }

    function showWarningModal() {
        if (warningModal && warningModalBackdrop) {
            warningModalBackdrop.classList.add('visible');
            warningModal.classList.add('visible');
            playSound('error');
        }
    }

    function hideWarningModal() {
        if (warningModal && warningModalBackdrop) {
            warningModalBackdrop.classList.remove('visible');
            warningModal.classList.remove('visible');
        }
    }

    // --- Settings Modal ---
    function openSettingsModal() {
        if (settingsModal && settingsModalBackdrop && settingBackWarningInput && settingSoundEffectsInput && settingProxyModeInput && settingUserNameInput) {
            settingBackWarningInput.checked = settings.showBackButtonWarning;
            settingSoundEffectsInput.checked = settings.soundEffectsEnabled;
            settingProxyModeInput.checked = settings.proxyModeEnabled;
            settingUserNameInput.value = settings.userName;
            settingsModalBackdrop.classList.add('visible');
            settingsModal.classList.add('visible');
        }
    }

    function closeSettingsModal() {
        if (settingsModal && settingsModalBackdrop) {
            settingsModalBackdrop.classList.remove('visible');
            settingsModal.classList.remove('visible');
        }
    }

    function saveSettings() {
        if (!settingBackWarningInput || !settingSoundEffectsInput || !settingProxyModeInput || !settingUserNameInput) return;
        settings.showBackButtonWarning = settingBackWarningInput.checked;
        settings.soundEffectsEnabled = settingSoundEffectsInput.checked;
        settings.proxyModeEnabled = settingProxyModeInput.checked;
        settings.userName = settingUserNameInput.value.trim();
        try {
            localStorage.setItem('neonWaveSettings', JSON.stringify(settings));
        } catch (e) {
            console.error("Error saving settings to localStorage:", e);
            playSound('error');
        }
        updateHomepageGreeting();
        closeSettingsModal();
    }

    function loadSettings() {
        try {
            const savedSettings = localStorage.getItem('neonWaveSettings');
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                settings.showBackButtonWarning = typeof parsedSettings.showBackButtonWarning === 'boolean' ? parsedSettings.showBackButtonWarning : true;
                settings.soundEffectsEnabled = typeof parsedSettings.soundEffectsEnabled === 'boolean' ? parsedSettings.soundEffectsEnabled : true;
                settings.proxyModeEnabled = typeof parsedSettings.proxyModeEnabled === 'boolean' ? parsedSettings.proxyModeEnabled : false;
                settings.userName = typeof parsedSettings.userName === 'string' ? parsedSettings.userName : '';
                settings.onboardingCompleted = typeof parsedSettings.onboardingCompleted === 'boolean' ? parsedSettings.onboardingCompleted : false;
            } else {
                settings.onboardingCompleted = false;
            }
            if (!settings.onboardingCompleted) {
               const legacyOnboardingDone = localStorage.getItem(ONBOARDING_STORAGE_KEY);
               if (legacyOnboardingDone === 'true') {
                   settings.onboardingCompleted = true;
               }
            }
        } catch (e) {
            console.error("Error loading or parsing saved settings:", e);
            settings = { showBackButtonWarning: true, soundEffectsEnabled: true, proxyModeEnabled: false, userName: '', onboardingCompleted: false };
        }
        updateHomepageGreeting();
    }

    function updateHomepageGreeting() {
        if (homepageGreeting) {
            homepageGreeting.textContent = settings.userName ? `Welcome, ${settings.userName}!` : 'Choose Your Adventure!';
        }
    }

    // --- Onboarding Functions ---
    function showOnboardingModal() {
        if (onboardingBackdrop && onboardingModal) {
            onboardingBackdrop.classList.add('visible');
            onboardingModal.classList.add('visible');
            currentOnboardingStep = 0;
            showOnboardingStep(currentOnboardingStep);
            if (onboardingNameInput) onboardingNameInput.focus();
            document.body.style.overflow = 'hidden';
            if (onboardingModal && !onboardingModal.classList.contains('fixed')) {
                adjustMainHeight(onboardingModal);
            }
        }
    }

    function hideOnboardingModal() {
        if (onboardingBackdrop && onboardingModal) {
            onboardingBackdrop.classList.remove('visible');
            onboardingModal.classList.remove('visible');
        }
    }

    function showOnboardingStep(stepIndex) {
        onboardingSteps.forEach((step, index) => {
            step.classList.toggle('hidden', index !== stepIndex);
        });
        currentOnboardingStep = stepIndex;
        if (settings.userName && onboardingUsernamePlaceholders) {
            onboardingUsernamePlaceholders.forEach(span => {
                span.textContent = settings.userName || "Arcade Hero";
            });
        }
        if (onboardingModal && !onboardingModal.classList.contains('fixed')) {
             adjustMainHeight(onboardingModal);
        }
    }

    function handleOnboardingNext() {
        playSound('click');
        if (currentOnboardingStep === 0) {
            const name = onboardingNameInput.value.trim();
            settings.userName = name || "Arcade Hero";
            updateHomepageGreeting();
            onboardingUsernamePlaceholders.forEach(span => {
                span.textContent = settings.userName;
            });
        }
        if (currentOnboardingStep < onboardingSteps.length - 1) {
            showOnboardingStep(currentOnboardingStep + 1);
        }
    }

    function handleOnboardingPrev() {
        playSound('click');
        if (currentOnboardingStep > 0) {
            showOnboardingStep(currentOnboardingStep - 1);
        }
    }

    function finishOnboarding(skipped = false) {
        playSound('click');
        if (currentOnboardingStep === 0 && !settings.userName && !skipped) {
            const name = onboardingNameInput.value.trim();
            settings.userName = name || "Arcade Hero";
        } else if (skipped && !settings.userName) {
            settings.userName = "Arcade Hero";
        }
        settings.onboardingCompleted = true;
        try {
            localStorage.setItem('neonWaveSettings', JSON.stringify(settings));
        } catch (e) {
            console.error("Error saving onboarding status to localStorage:", e);
        }
        updateHomepageGreeting();
        hideOnboardingModal();
        playOnboardingCutscene();
    }

    function startOnboarding() {
        settings.onboardingCompleted = false;
        if (onboardingNameInput) onboardingNameInput.value = settings.userName;
        showOnboardingModal();
    }

    // --- Onboarding Cutscene Function ---
    async function playOnboardingCutscene() {
        if (!onboardingCutsceneOverlay || !cutsceneText1 || !cutsceneText2 || !homeView || !gameGrid) return;

        playSound('cutsceneBoot');
        homeView.classList.add('cutscene-underlay');
        const allCards = Array.from(gameGrid.querySelectorAll('.game-card'));
        allCards.forEach(card => card.classList.add('cutscene-blank-tile'));

        onboardingCutsceneOverlay.classList.remove('hidden');
        requestAnimationFrame(() => {
            onboardingCutsceneOverlay.classList.add('visible');
        });
        document.body.style.overflow = 'hidden';

        cutsceneText1.textContent = ``; // Clear initially
        cutsceneText2.textContent = ``; // Clear initially

        const logo = document.getElementById('cutscene-logo');
        if (logo) { logo.style.animation = 'none'; void logo.offsetWidth; logo.style.animation = ''; logo.style.animation = 'cutsceneLogoPowerUp 2s var(--pop-curve) 0.3s forwards';}


        await typeOutText(cutsceneText1, `SYSTEM ONLINE. WELCOME, ${settings.userName || 'PLAYER'}...`, 70, ['C3', 'D#3', 'F3'], 2300);

        // Tile glowing animation
        clearInterval(tileGlowInterval);
        let glowIndex = 0;
        const glowableCards = allCards.filter((_, idx) => idx % 2 === 0); // Select a subset for performance

        tileGlowInterval = setInterval(() => {
            if (glowIndex < glowableCards.length * 3) { // Loop a few times
                const cardToGlow = glowableCards[glowIndex % glowableCards.length];
                cardToGlow.classList.add('cutscene-tile-glowing');
                playSound('tileGlow', ['A2', 'C3', 'E3', 'G3'][glowIndex % 4]);
                setTimeout(() => {
                    cardToGlow.classList.remove('cutscene-tile-glowing');
                }, 1500); // Duration of individual glow
                glowIndex++;
            } else {
                clearInterval(tileGlowInterval);
            }
        }, 300); // Interval between glows starting

        await new Promise(resolve => setTimeout(resolve, CUTSCENE_FLASH_POINT - 3000)); // Wait until near flash point

        await typeOutText(cutsceneText2, `ARCADE SYSTEMS NOMINAL. ENGAGE!`, 90, ['A4', 'C5', 'E5'], 0);

        // Full screen flash
        await new Promise(resolve => setTimeout(resolve, CUTSCENE_FLASH_POINT - (Date.now() - onboardingCutsceneOverlay.startTime || 0) )); // Ensure flash happens at right time
        
        playSound('flash');
        onboardingCutsceneOverlay.classList.add('flash-active');

        // Reveal website
        setTimeout(() => {
            onboardingCutsceneOverlay.classList.remove('flash-active'); // End flash
            homeView.classList.remove('cutscene-underlay');
            homeView.style.filter = ''; // Clear filter explicitly
            homeView.classList.add('revealing'); // Add slam animation class
            playSound('slam');

            allCards.forEach(card => card.classList.remove('cutscene-blank-tile'));
            // Optionally re-render grid if blanking caused issues, but class removal should be enough
            // renderGameGrid(games, gameGrid);


            // Fade out cutscene overlay
            onboardingCutsceneOverlay.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
            onboardingCutsceneOverlay.style.opacity = '0';
            onboardingCutsceneOverlay.style.transform = 'scale(0.7)';


            setTimeout(() => {
                onboardingCutsceneOverlay.classList.add('hidden');
                onboardingCutsceneOverlay.classList.remove('visible');
                onboardingCutsceneOverlay.style.transform = ''; // Reset for next time
                document.body.style.overflow = '';
                homeView.classList.remove('revealing'); // Clean up animation class
                clearInterval(scanlineInterval);
                clearInterval(tileGlowInterval);
            }, 700); // Match fade out duration

        }, CUTSCENE_REVEAL_POINT - CUTSCENE_FLASH_POINT); // Delay between flash and reveal

        // Scanline (visual only, no direct timing impact on core sequence)
        if (cutsceneScanline) {
            let scanlinePos = 0;
            clearInterval(scanlineInterval);
            scanlineInterval = setInterval(() => {
                scanlinePos = (scanlinePos + 2 + Math.random() * 3) % window.innerHeight;
                cutsceneScanline.style.setProperty('--scanline-pos', scanlinePos + 'px');
            }, 40);
        }
        onboardingCutsceneOverlay.startTime = Date.now(); // Mark start time for timing calculations
    }

    async function typeOutText(element, text, speed, notes, startDelay = 0) {
        await new Promise(resolve => setTimeout(resolve, startDelay));
        element.textContent = '';
        let noteIndex = 0;
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            if (text.charAt(i) !== ' ' && text.charAt(i) !== '.') {
                 playSound('cutsceneType', notes[noteIndex % notes.length]);
                 noteIndex++;
            }
            await new Promise(resolve => setTimeout(resolve, speed + (Math.random() * (speed / 3)) - (speed / 6) ));
        }
    }


    // --- Game Grid & Search Tags ---
    function renderGameGrid(gamesToRender, targetElement) {
        if (!targetElement) return;
        targetElement.innerHTML = '';
        if (!gamesToRender || gamesToRender.length === 0) {
            targetElement.innerHTML = `<p class="text-center text-gray-400 col-span-full py-10">No games found matching your search.</p>`;
            return;
        }
        const fragment = document.createDocumentFragment();
        gamesToRender.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.gameId = game.id;
            card.tabIndex = 0;
            const placeholderUrl = `https://placehold.co/640x360/374151/9ca3af?text=${encodeURIComponent(game.title || 'Game Art')}`;
            const tagsHtml = Array.isArray(game.tags) ? game.tags.map(tag => getTagIconHtml(tag)).join('') : '';
            card.innerHTML = `
                <div class="thumbnail-container">
                    <img src="${game.thumbnail || placeholderUrl}" alt="${game.title || 'Game'} Thumbnail" loading="lazy" onerror="this.onerror=null;this.src='${placeholderUrl}';">
                    <div class="tags-icon-container">${tagsHtml}</div>
                    <div class="title-overlay"><h3 class="truncate">${game.title || 'Untitled Game'}</h3></div>
                </div>`;
            card.addEventListener('click', () => {
                playSound('click');
                const selectedGame = typeof games !== 'undefined' ? games.find(g => g.id === card.dataset.gameId) : null;
                if (selectedGame) {
                    const isOverlayOpen = searchOverlay && searchOverlay.classList.contains('visible');
                    if (isOverlayOpen) closeSearchOverlay();
                    setTimeout(() => showGameViewUI(selectedGame), isOverlayOpen ? 100 : 0);
                } else {
                    console.error("Game data not found for ID:", card.dataset.gameId);
                    playSound('error');
                }
            });
            card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.click(); } });
            card.addEventListener('mouseenter', () => playSound('hover'));
            fragment.appendChild(card);
        });
        targetElement.appendChild(fragment);
    }

    function getTagIconHtml(tag) {
        if (!tag) return '';
        let iconSvg = '';
        const lowerTag = tag.toLowerCase();
        switch (lowerTag) {
            case 'arcade': iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="tag-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v2h-2zm0 3h2v2h-2zm0 3h2v2h-2z"/></svg>`; break;
            case 'shooter': iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="tag-icon"><path d="M3 11h8V3H3zm2-6h4v4H5zM13 3v8h8V3zm6 6h-4V5h4zM3 21h8v-8H3zm2-6h4v4H5zM13 13v8h8v-8zm6 6h-4v-4h4z"/></svg>`; break;
            case 'puzzle': iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="tag-icon"><path d="M14 2H4v10h10V2zm0 12H4v6h10v-6zm2-12v6h4V2h-4zm0 8h4v10h-4V10z"/></svg>`; break;
            case 'classic': iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="tag-icon"><path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.55-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.86.07-1.22 1.17-.55 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"/></svg>`; break;
            default: iconSvg = `<svg viewBox="0 0 24 24" fill="currentColor" class="tag-icon"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>`;
        }
        return `<div class="tag-icon-wrapper" title="${tag}">${iconSvg}<span class="tag-text">${tag}</span></div>`;
    }

    // --- Fullscreen & Aspect Ratio ---
    function goFullscreen() {
        const elementToFullscreen = iframeContainer || gameIframe;
        if (!elementToFullscreen) return;
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.error("Error exiting fullscreen:", err));
        } else {
            elementToFullscreen.requestFullscreen().catch(err => {
                console.error("Error entering fullscreen:", err);
                playSound('error');
                alert(`Fullscreen failed: ${err.message}. Try using the browser's fullscreen option (F11).`);
            });
        }
    }

    function updateFullscreenIcons() {
        if (!fullscreenIconOpen || !fullscreenIconExit || !fullscreenButton) return;
        if (document.fullscreenElement) {
            fullscreenIconOpen.classList.add('hidden');
            fullscreenIconExit.classList.remove('hidden');
            fullscreenButton.title = "Exit Fullscreen";
        } else {
            fullscreenIconOpen.classList.remove('hidden');
            fullscreenIconExit.classList.add('hidden');
            fullscreenButton.title = "Toggle Fullscreen";
        }
    }

    function handleAspectRatioChange(event) {
        const targetButton = event.target.closest('.aspect-ratio-option');
        if (!targetButton || !iframeContainer || !dropdownLabel || !aspectRatioOptions.length) return;
        const selectedAspect = targetButton.dataset.aspect;
        const selectedLabel = targetButton.dataset.label;
        if (!selectedAspect || !selectedLabel) return;
        iframeContainer.classList.remove(...aspectClasses);
        iframeContainer.classList.add(selectedAspect);
        dropdownLabel.textContent = selectedLabel;
        aspectRatioOptions.forEach(opt => opt.classList.remove('active'));
        targetButton.classList.add('active');
        if (aspectRatioDropdown) {
            aspectRatioDropdown.classList.remove('open');
            dropdownButton.setAttribute('aria-expanded', 'false');
            if(dropdownMenu) dropdownMenu.classList.add('hidden');
        }
        if (gameView) adjustMainHeight(gameView);
    }

    function toggleDropdown() {
        if (!aspectRatioDropdown || !dropdownButton || !dropdownMenu) return;
        const isOpen = aspectRatioDropdown.classList.toggle('open');
        dropdownButton.setAttribute('aria-expanded', isOpen.toString());
        dropdownMenu.classList.toggle('hidden', !isOpen);
    }

    // --- Search Functionality ---
    function filterGames(searchTerm) {
        const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
        if (!lowerCaseSearchTerm) return typeof games !== 'undefined' ? games : [];
        if (typeof games === 'undefined' || !Array.isArray(games)) {
            console.warn("'games' array is not defined. Search will not work.");
            return [];
        }
        return games.filter(game =>
            (game.title && game.title.toLowerCase().includes(lowerCaseSearchTerm)) ||
            (game.tags && Array.isArray(game.tags) && game.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm)))
        );
    }

    function handleHomepageSearch() {
        if (!homepageSearchInput || typeof games === 'undefined' || !gameGrid) return;
        const searchTerm = homepageSearchInput.value;
        const filtered = filterGames(searchTerm);
        renderGameGrid(filtered, gameGrid);
        if (homeView) adjustMainHeight(homeView);
    }

    function handleOverlaySearch() {
        if (!searchOverlayInput || typeof games === 'undefined' || !searchResultsGrid) return;
        const searchTerm = searchOverlayInput.value;
        const filtered = filterGames(searchTerm);
        renderGameGrid(filtered, searchResultsGrid);
    }

    function openSearchOverlay() {
        if (!searchOverlay || !searchOverlayInput || typeof games === 'undefined' || !searchResultsGrid || !searchOverlayTagsContainer) return;
        searchOverlay.classList.add('visible');
        searchOverlayInput.value = '';
        renderGameGrid(games, searchResultsGrid);
        populateSearchTags(searchOverlayTagsContainer);
        if (overlaySearchTagsWrapper && searchResultsGrid) hideSearchTags(overlaySearchTagsWrapper, searchResultsGrid);
        searchOverlayInput.focus();
        document.body.style.overflow = 'hidden';
    }

    function closeSearchOverlay() {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('visible');
        document.body.style.overflow = '';
        if (overlaySearchTagsWrapper && searchResultsGrid) hideSearchTags(overlaySearchTagsWrapper, searchResultsGrid);
    }

    function showSearchTags(wrapperElement, gridElement) {
        if (wrapperElement) wrapperElement.classList.add('visible');
        if (gridElement) gridElement.classList.add('shifted-down');
    }

    function hideSearchTags(wrapperElement, gridElement) {
        if (wrapperElement) wrapperElement.classList.remove('visible');
        if (gridElement) gridElement.classList.remove('shifted-down');
    }

    function handleTagClick(event, inputElement, gridElement, wrapperElement) {
        const tagButton = event.target.closest('.search-tag-button');
        if (tagButton && inputElement) {
            const tag = tagButton.textContent.trim();
            inputElement.value = tag;
            if (inputElement === homepageSearchInput) handleHomepageSearch();
            else if (inputElement === searchOverlayInput) handleOverlaySearch();
            inputElement.focus();
            if (wrapperElement && gridElement) showSearchTags(wrapperElement, gridElement);
            if (inputElement === homepageSearchInput) clearTimeout(blurTimeoutHome);
            else if (inputElement === searchOverlayInput) clearTimeout(blurTimeoutOverlay);
        }
    }

    function populateSearchTags(containerElement) {
        if (!containerElement || typeof games === 'undefined' || !Array.isArray(games)) return;
        const allTags = [...new Set(games.flatMap(game => game.tags || []))].sort();
        containerElement.innerHTML = '';
        const fragment = document.createDocumentFragment();
        allTags.forEach(tag => {
            const button = document.createElement('button');
            button.className = 'search-tag-button';
            button.textContent = tag;
            fragment.appendChild(button);
        });
        containerElement.appendChild(fragment);
    }

    function scrollTags(container, direction) {
        if (!container) return;
        const scrollAmount = container.clientWidth * 0.8;
        let scrollTarget = direction === 'left' ? container.scrollLeft - scrollAmount : container.scrollLeft + scrollAmount;
        container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }

    // --- Clock & Page Load ---
    function updateClock() {
        if (!navbarClock) return;
        const now = new Date();
        navbarClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function hidePageLoader() {
        if (pageLoadMinTimePassed && pageContentLoaded && pageLoader && !pageLoader.classList.contains('hidden')) {
            pageLoader.classList.add('hidden'); // CSS transition handles the animation
            playSound('load');
            // If onboarding is not completed, it will be shown after this.
            // If onboarding IS completed, normal page flow continues.
            if (!settings.onboardingCompleted) {
                 setTimeout(showOnboardingModal, 300); // Delay slightly after loader hides
            } else {
                document.body.style.overflow = ''; // Ensure scroll is enabled
            }
        }
    }

    // --- Event Listeners Setup ---
    function setupEventListeners() {
        if (fullscreenButton) fullscreenButton.addEventListener('click', () => { playSound('click'); goFullscreen(); });
        if (backButton) backButton.addEventListener('click', (e) => { playSound('click'); attemptShowHomeView(e); });
        if (dropdownButton) dropdownButton.addEventListener('click', () => { playSound('click'); toggleDropdown(); });
        if (dropdownMenu) dropdownMenu.addEventListener('click', (e) => { playSound('click'); handleAspectRatioChange(e); });
        if (logoLink) logoLink.addEventListener('click', (e) => { e.preventDefault(); playSound('click'); navigateHome(); });
        if (navbarSearchButton) navbarSearchButton.addEventListener('click', () => { playSound('click'); openSearchOverlay(); });
        if (navbarSettingsButton) navbarSettingsButton.addEventListener('click', () => { playSound('click'); openSettingsModal(); });
        if (homepageSearchInput) {
            homepageSearchInput.addEventListener('input', handleHomepageSearch);
            homepageSearchInput.addEventListener('focus', () => { clearTimeout(blurTimeoutHome); if (homepageSearchTagsWrapper && gameGrid) showSearchTags(homepageSearchTagsWrapper, gameGrid); });
            homepageSearchInput.addEventListener('blur', () => { blurTimeoutHome = setTimeout(() => { if (homepageSearchTagsWrapper && !homepageSearchTagsWrapper.contains(document.activeElement) && gameGrid) hideSearchTags(homepageSearchTagsWrapper, gameGrid); }, 150); });
        }
        if (searchOverlayCloseButton) searchOverlayCloseButton.addEventListener('click', () => { playSound('click'); closeSearchOverlay(); });
        if (searchOverlayInput) {
            searchOverlayInput.addEventListener('input', handleOverlaySearch);
            searchOverlayInput.addEventListener('focus', () => { clearTimeout(blurTimeoutOverlay); if (overlaySearchTagsWrapper && searchResultsGrid) showSearchTags(overlaySearchTagsWrapper, searchResultsGrid); });
            searchOverlayInput.addEventListener('blur', () => { blurTimeoutOverlay = setTimeout(() => { if (overlaySearchTagsWrapper && !overlaySearchTagsWrapper.contains(document.activeElement) && searchResultsGrid) hideSearchTags(overlaySearchTagsWrapper, searchResultsGrid); }, 150); });
        }
        document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === '/') { event.preventDefault(); playSound('click'); searchOverlay && searchOverlay.classList.contains('visible') ? closeSearchOverlay() : openSearchOverlay(); }
            else if (event.key === 'Escape') {
                if (onboardingModal && onboardingModal.classList.contains('visible') && onboardingCutsceneOverlay && !onboardingCutsceneOverlay.classList.contains('visible')) { playSound('click'); finishOnboarding(true); }
                else if (searchOverlay && searchOverlay.classList.contains('visible')) { playSound('click'); closeSearchOverlay(); }
                else if (warningModal && warningModal.classList.contains('visible')) { playSound('click'); hideWarningModal(); }
                else if (settingsModal && settingsModal.classList.contains('visible')) { playSound('click'); closeSettingsModal(); }
                else if (document.fullscreenElement) { playSound('click'); document.exitFullscreen(); }
            }
        });
        if (searchTagsContainer) searchTagsContainer.addEventListener('click', (e) => handleTagClick(e, homepageSearchInput, gameGrid, homepageSearchTagsWrapper));
        if (scrollTagsLeftHomeBtn && searchTagsContainer) scrollTagsLeftHomeBtn.addEventListener('click', () => { playSound('click'); scrollTags(searchTagsContainer, 'left'); });
        if (scrollTagsRightHomeBtn && searchTagsContainer) scrollTagsRightHomeBtn.addEventListener('click', () => { playSound('click'); scrollTags(searchTagsContainer, 'right'); });
        if (searchOverlayTagsContainer) searchOverlayTagsContainer.addEventListener('click', (e) => handleTagClick(e, searchOverlayInput, searchResultsGrid, overlaySearchTagsWrapper));
        if (scrollTagsLeftOverlayBtn && searchOverlayTagsContainer) scrollTagsLeftOverlayBtn.addEventListener('click', () => { playSound('click'); scrollTags(searchOverlayTagsContainer, 'left'); });
        if (scrollTagsRightOverlayBtn && searchOverlayTagsContainer) scrollTagsRightOverlayBtn.addEventListener('click', () => { playSound('click'); scrollTags(searchOverlayTagsContainer, 'right'); });
        [scrollTagsLeftHomeBtn, scrollTagsRightHomeBtn, searchTagsContainer, scrollTagsLeftOverlayBtn, scrollTagsRightOverlayBtn, searchOverlayTagsContainer].forEach(el => {
            if (el) el.addEventListener('mousedown', (e) => { e.preventDefault(); if (el.closest('#homepage-search-tags-wrapper')) clearTimeout(blurTimeoutHome); if (el.closest('#overlay-search-tags-wrapper')) clearTimeout(blurTimeoutOverlay); });
        });
        document.addEventListener('click', (event) => {
            if (aspectRatioDropdown && !aspectRatioDropdown.contains(event.target) && aspectRatioDropdown.classList.contains('open')) toggleDropdown();
            if (warningModalBackdrop && event.target === warningModalBackdrop) { playSound('click'); hideWarningModal(); }
            if (settingsModalBackdrop && event.target === settingsModalBackdrop) { playSound('click'); closeSettingsModal(); }
        });
        if (modalStayButton) modalStayButton.addEventListener('click', () => { playSound('click'); hideWarningModal(); });
        if (modalLeaveButton) modalLeaveButton.addEventListener('click', () => { playSound('click'); hideWarningModal(); navigateHome(); });
        if (settingsCloseButton) settingsCloseButton.addEventListener('click', () => { playSound('click'); closeSettingsModal(); });
        if (settingsSaveButton) settingsSaveButton.addEventListener('click', () => { playSound('click'); saveSettings(); });
        document.addEventListener('fullscreenchange', updateFullscreenIcons);
        document.body.addEventListener('mouseover', (event) => { if (event.target.closest('button, a, .game-card, .tag-icon-wrapper, .aspect-ratio-option')) playSound('hover'); });

        if (onboardingNextButtons) onboardingNextButtons.forEach(button => button.addEventListener('click', handleOnboardingNext));
        if (onboardingPrevButtons) onboardingPrevButtons.forEach(button => button.addEventListener('click', handleOnboardingPrev));
        if (onboardingFinishButton) onboardingFinishButton.addEventListener('click', () => finishOnboarding(false));
        if (onboardingSkipButton) onboardingSkipButton.addEventListener('click', () => { playSound('click'); finishOnboarding(true); });
        if (replayOnboardingButton) replayOnboardingButton.addEventListener('click', () => { playSound('click'); closeSettingsModal(); setTimeout(startOnboarding, 150); });
    }

    // --- Initialization ---
    loadSettings();
    if (typeof Tone !== 'undefined') initTone();
    else console.warn("Tone.js library not found. Sound effects will be disabled.");

    setTimeout(() => { pageLoadMinTimePassed = true; hidePageLoader(); }, PAGE_LOAD_MIN_TIME);

    if (searchTagsContainer && typeof games !== 'undefined') populateSearchTags(searchTagsContainer);
    if (gameGrid && typeof games !== 'undefined') renderGameGrid(games, gameGrid);

    if (homeView) { homeView.classList.remove('hidden'); adjustMainHeight(homeView); }
    if (gameView) gameView.classList.add('hidden');

    updateClock();
    setInterval(updateClock, 60000);

    setupEventListeners();

    pageContentLoaded = true;
    hidePageLoader(); // Attempt to hide again

    window.addEventListener('resize', () => {
        if (homeView && !homeView.classList.contains('hidden')) adjustMainHeight(homeView);
        else if (gameView && !gameView.classList.contains('hidden')) adjustMainHeight(gameView);
        else if (onboardingModal && onboardingModal.classList.contains('visible') && !onboardingModal.classList.contains('fixed')) adjustMainHeight(onboardingModal);
    });

    // Initial onboarding check is now handled within hidePageLoader to ensure it runs after loader is gone.
    if (pageLoadMinTimePassed && pageContentLoaded && !settings.onboardingCompleted) {
        // If loader is already hidden by the time this check runs, show onboarding.
        if (pageLoader.classList.contains('hidden')) {
            setTimeout(showOnboardingModal, 300);
        }
    } else if (settings.onboardingCompleted) {
        document.body.style.overflow = ''; // Ensure scroll is enabled if onboarding was completed
    }
});
