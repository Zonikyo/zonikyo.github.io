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
    const searchOverlayInputContainer = document.querySelector('.search-overlay-input-container'); // Assuming you'll wrap the input
    const searchOverlayInput = document.getElementById('search-overlay-input');
    const searchOverlayTagsContainer = document.getElementById('search-overlay-tags-container');
    const overlaySearchTagsWrapper = document.getElementById('overlay-search-tags-wrapper');
    const scrollTagsLeftOverlayBtn = document.getElementById('scroll-tags-left-overlay');
    const scrollTagsRightOverlayBtn = document.getElementById('scroll-tags-right-overlay');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const searchOverlayResults = document.getElementById('search-overlay-results');
    const searchOverlayCloseButton = document.getElementById('search-overlay-close-button');

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
    const cutsceneLogo = document.getElementById('cutscene-logo');


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
    
    const CUTSCENE_INTRO_DELAY = 500;
    const CUTSCENE_LOGO_ANIM_DURATION = 2000;
    const CUTSCENE_TEXT1_DELAY = CUTSCENE_INTRO_DELAY + 1800;
    const CUTSCENE_TILE_GLOW_START_DELAY = CUTSCENE_TEXT1_DELAY + 500;
    const CUTSCENE_TILE_GLOW_DURATION_PER_BATCH = 2000;
    const CUTSCENE_TILE_GLOW_BATCHES = 2;
    const CUTSCENE_TEXT2_DELAY = CUTSCENE_TILE_GLOW_START_DELAY + (CUTSCENE_TILE_GLOW_DURATION_PER_BATCH * CUTSCENE_TILE_GLOW_BATCHES) - 500;
    const CUTSCENE_FLASH_DELAY = CUTSCENE_TEXT2_DELAY + 2000;
    const CUTSCENE_FLASH_DURATION = 200;
    const CUTSCENE_REVEAL_DELAY = CUTSCENE_FLASH_DELAY + CUTSCENE_FLASH_DURATION + 100;
    const CUTSCENE_SLAM_ANIM_DURATION = 900;
    const CUTSCENE_OVERLAY_FADE_OUT_START = CUTSCENE_REVEAL_DELAY + CUTSCENE_SLAM_ANIM_DURATION - 300;
    const CUTSCENE_OVERLAY_FADE_OUT_DURATION = 800;

    let isOverlayResultsActive = false; // New state for search overlay

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
    let tileGlowTimeout = null;

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
            
            synths.cutsceneBoot = new Tone.NoiseSynth({ noise: { type: "pink", playbackRate: 0.05 }, envelope: { attack: 1.5, decay: 1, sustain: 0.3, release: 1 }, volume: -9 }).toDestination();
            synths.cutsceneType = new Tone.MembraneSynth({ pitchDecay: 0.004, octaves: 2.5, envelope: { attack: 0.001, decay: 0.12, sustain: 0 }, volume: -10 }).toDestination();
            synths.tileGlowActivate = new Tone.Synth({ oscillator: {type: 'pwm', modulationFrequency: 0.5}, envelope: { attack: 0.2, decay: 0.5, sustain: 0.1, release: 0.8 }, volume: -18 }).toDestination();
            synths.flash = new Tone.NoiseSynth({ noise: {type: 'white'}, envelope: { attack: 0.005, decay: 0.25, sustain:0, release: 0.05}, volume: -6}).toDestination();
            synths.slam = new Tone.MetalSynth({frequency: 70, envelope: {attack: 0.001, decay:0.5, release: 0.2}, harmonicity: 4.1, modulationIndex: 20, resonance: 1500, octaves: 0.8, volume: -3}).toDestination();
            synths.searchOpen = new Tone.Synth({ oscillator: { type: 'sine' }, envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.3 }, volume: -15 }).toDestination();
            synths.searchSubmit = new Tone.Synth({ oscillator: { type: 'triangle8' }, envelope: { attack: 0.005, decay: 0.15, sustain: 0.05, release: 0.2 }, volume: -12 }).toDestination();


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
                case 'cutsceneBoot': synths.cutsceneBoot.triggerAttackRelease("1.5s", now); break;
                case 'cutsceneType': synths.cutsceneType.triggerAttackRelease(noteOrParams || "C2", "32n", now + Math.random()*0.03); break;
                case 'tileGlowActivate': synths.tileGlowActivate.triggerAttackRelease(noteOrParams || "F2", "0.8s", now); break;
                case 'flash': synths.flash.triggerAttackRelease("0.25s", now); break;
                case 'slam': synths.slam.triggerAttackRelease("8n", now); break;
                case 'searchOpen': synths.searchOpen.triggerAttackRelease('G4', '8n', now); break;
                case 'searchSubmit': synths.searchSubmit.triggerAttackRelease('E5', '16n', now); break;
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

    function startOnboarding() {
        settings.onboardingCompleted = false;
        if (onboardingNameInput) onboardingNameInput.value = settings.userName;
        showOnboardingModal();
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

    async function playOnboardingCutscene() {
        if (!onboardingCutsceneOverlay || !homeView || !gameGrid) return;

        playSound('cutsceneBoot');
        homeView.classList.add('cutscene-underlay');
        const allCards = Array.from(gameGrid.querySelectorAll('.game-card'));
        allCards.forEach(card => {
            card.classList.add('cutscene-blank-tile');
            const img = card.querySelector('.thumbnail-container img');
            if (img) img.style.display = 'none';
        });

        if(cutsceneLogo) { cutsceneLogo.style.animation = 'none'; void cutsceneLogo.offsetWidth; cutsceneLogo.style.animation = ''; }
        if(cutsceneText1) { cutsceneText1.textContent = ''; cutsceneText1.style.animation = 'none'; void cutsceneText1.offsetWidth; cutsceneText1.style.animation = ''; }
        if(cutsceneText2) { cutsceneText2.textContent = ''; cutsceneText2.style.animation = 'none'; void cutsceneText2.offsetWidth; cutsceneText2.style.animation = ''; }

        onboardingCutsceneOverlay.classList.remove('hidden', 'exiting', 'flash-effect');
        onboardingCutsceneOverlay.style.opacity = '';
        onboardingCutsceneOverlay.style.transform = '';
        requestAnimationFrame(() => {
            onboardingCutsceneOverlay.classList.add('visible');
        });
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            if(cutsceneLogo) cutsceneLogo.style.animation = 'cutsceneLogoPowerUp 2s var(--pop-curve) forwards';
        }, CUTSCENE_INTRO_DELAY);

        setTimeout(async () => {
            if(cutsceneText1) await typeOutText(cutsceneText1, `SYSTEM ONLINE. WELCOME, ${settings.userName.toUpperCase() || 'PLAYER'}...`, 60, ['C3', 'E3', 'G3']);
        }, CUTSCENE_TEXT1_DELAY);

        clearTimeout(tileGlowTimeout);
        let currentBatch = 0;
        function runTileGlowBatch() {
            if (currentBatch >= CUTSCENE_TILE_GLOW_BATCHES) {
                allCards.forEach(card => card.classList.remove('cutscene-tile-glowing'));
                return;
            }
            playSound('tileGlowActivate', ['F2', 'G#2'][currentBatch % 2]);
            const cardsToGlowThisBatch = allCards.sort(() => 0.5 - Math.random()).slice(0, Math.max(3, Math.floor(allCards.length / 4)));
            cardsToGlowThisBatch.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('cutscene-tile-glowing');
                    setTimeout(() => card.classList.remove('cutscene-tile-glowing'), CUTSCENE_TILE_GLOW_DURATION_PER_BATCH - 200);
                }, index * (CUTSCENE_TILE_GLOW_DURATION_PER_BATCH / (cardsToGlowThisBatch.length +1) ) );
            });
            currentBatch++;
            tileGlowTimeout = setTimeout(runTileGlowBatch, CUTSCENE_TILE_GLOW_DURATION_PER_BATCH);
        }
        setTimeout(runTileGlowBatch, CUTSCENE_TILE_GLOW_START_DELAY);

        setTimeout(async () => {
            if(cutsceneText2) await typeOutText(cutsceneText2, `ARCADE SYSTEMS NOMINAL. ENGAGE!`, 80, ['A4', 'C#5', 'F5']);
        }, CUTSCENE_TEXT2_DELAY);

        setTimeout(() => {
            playSound('flash');
            if(onboardingCutsceneOverlay) onboardingCutsceneOverlay.classList.add('flash-effect');
            allCards.forEach(card => {
                card.style.boxShadow = `0 0 60px 30px rgba(var(--white-glow-rgb), 0.8), 0 0 80px 40px rgba(var(--primary-glow-rgb), 0.5)`;
                card.style.borderColor = `rgba(var(--white-glow-rgb), 0.9)`;
            });

            setTimeout(() => {
                if(onboardingCutsceneOverlay) onboardingCutsceneOverlay.classList.remove('flash-effect');
                allCards.forEach(card => {
                    card.style.boxShadow = '';
                    card.style.borderColor = '';
                });
            }, CUTSCENE_FLASH_DURATION);
        }, CUTSCENE_FLASH_DELAY);

        setTimeout(() => {
            if(homeView) {
                homeView.classList.remove('cutscene-underlay');
                homeView.style.filter = '';
                homeView.classList.add('revealing');
            }
            playSound('slam');
            allCards.forEach(card => {
                card.classList.remove('cutscene-blank-tile');
                const img = card.querySelector('.thumbnail-container img');
                if (img) img.style.display = '';
            });
        }, CUTSCENE_REVEAL_DELAY);

        setTimeout(() => {
            if(onboardingCutsceneOverlay) {
                onboardingCutsceneOverlay.classList.add('exiting');
                onboardingCutsceneOverlay.classList.remove('visible');
            }
        }, CUTSCENE_OVERLAY_FADE_OUT_START);

        setTimeout(() => {
            if(onboardingCutsceneOverlay) {
                onboardingCutsceneOverlay.classList.add('hidden');
                onboardingCutsceneOverlay.classList.remove('exiting');
                onboardingCutsceneOverlay.style.opacity = '';
                onboardingCutsceneOverlay.style.transform = '';
            }
            if(homeView) homeView.classList.remove('revealing');
            document.body.style.overflow = '';
            clearInterval(scanlineInterval);
            clearTimeout(tileGlowTimeout);
        }, CUTSCENE_OVERLAY_FADE_OUT_START + CUTSCENE_OVERLAY_FADE_OUT_DURATION + 100);

        if (cutsceneScanline) {
            let scanlinePos = 0;
            clearInterval(scanlineInterval);
            scanlineInterval = setInterval(() => {
                scanlinePos = (scanlinePos + 1.5 + Math.random() * 2) % window.innerHeight;
                cutsceneScanline.style.setProperty('--scanline-pos', scanlinePos + 'px');
            }, 30);
        }
    }

    async function typeOutText(element, text, speed, notes, startDelay = 0) {
        if (!element) return;
        await new Promise(resolve => setTimeout(resolve, startDelay));
        element.textContent = '';
        let noteIndex = 0;
        for (let i = 0; i < text.length; i++) {
            element.textContent += text.charAt(i);
            if (text.charAt(i) !== ' ' && text.charAt(i) !== '.') {
                 playSound('cutsceneType', notes[noteIndex % notes.length]);
                 noteIndex++;
            }
            await new Promise(resolve => setTimeout(resolve, speed + (Math.random() * (speed / 4)) - (speed / 8) ));
        }
    }

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

    // --- New Search Overlay Logic ---
    function openSearchOverlay() {
        if (!searchOverlay || !searchOverlayInput || !searchOverlayInputContainer) return;
        playSound('searchOpen');
        searchOverlay.classList.remove('results-active'); // Ensure it starts in centered mode
        searchOverlay.classList.add('visible');
        document.body.classList.add('search-overlay-active');
        searchOverlayInput.value = '';
        if(searchResultsGrid) searchResultsGrid.innerHTML = '<p class="text-center col-span-full text-gray-400">Press Enter to search.</p>';
        if(overlaySearchTagsWrapper) overlaySearchTagsWrapper.classList.remove('visible');
        if(searchOverlayResults) searchOverlayResults.style.opacity = '0'; // Hide results initially
        isOverlayResultsActive = false;
        setTimeout(() => searchOverlayInput.focus(), 50); // Delay focus slightly for transition
        populateSearchTags(searchOverlayTagsContainer); // Populate tags for the overlay
    }

    function closeSearchOverlay() {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('visible');
        document.body.classList.remove('search-overlay-active');
        searchOverlay.classList.remove('results-active'); // Reset state
        isOverlayResultsActive = false;
        if(overlaySearchTagsWrapper) overlaySearchTagsWrapper.classList.remove('visible');
    }

    function showSearchResultsInOverlay() {
        if (!searchOverlay || !searchOverlayInput || typeof games === 'undefined' || !searchResultsGrid || !searchOverlayResults) return;
        
        const searchTerm = searchOverlayInput.value;
        if (!searchTerm.trim()) { // Don't search if input is empty
            if(isOverlayResultsActive) { // If results were active, hide them
                searchOverlay.classList.remove('results-active');
                isOverlayResultsActive = false;
                if(overlaySearchTagsWrapper) overlaySearchTagsWrapper.classList.remove('visible');
                searchResultsGrid.innerHTML = '<p class="text-center col-span-full text-gray-400">Press Enter to search.</p>';
            }
            return;
        }

        playSound('searchSubmit');
        searchOverlay.classList.add('results-active');
        isOverlayResultsActive = true;

        const filtered = filterGames(searchTerm);
        renderGameGrid(filtered, searchResultsGrid);
        
        // Show tags if not already visible (they appear after search bar moves)
        if (overlaySearchTagsWrapper) {
            // Delay slightly to ensure search bar animation starts
            setTimeout(() => {
                overlaySearchTagsWrapper.classList.add('visible');
            }, 200);
        }
    }

    function hideSearchResultsInOverlay() {
        if (!searchOverlay || !searchResultsGrid || !searchOverlayResults) return;
        searchOverlay.classList.remove('results-active');
        isOverlayResultsActive = false;
        if(overlaySearchTagsWrapper) overlaySearchTagsWrapper.classList.remove('visible');
        // Clear results after animation (CSS handles the slide out)
        setTimeout(() => {
            if(searchResultsGrid) searchResultsGrid.innerHTML = '<p class="text-center col-span-full text-gray-400">Press Enter to search.</p>';
        }, 500); // Match CSS transition duration for results hiding
    }


    function showSearchTags(wrapperElement, gridElement) {
        if (wrapperElement) wrapperElement.classList.add('visible');
        if (gridElement && wrapperElement && wrapperElement.id === 'homepage-search-tags-wrapper') { // Only shift homepage grid
            gridElement.classList.add('shifted-down');
        }
    }

    function hideSearchTags(wrapperElement, gridElement) {
        if (wrapperElement) wrapperElement.classList.remove('visible');
        if (gridElement && wrapperElement && wrapperElement.id === 'homepage-search-tags-wrapper') {
            gridElement.classList.remove('shifted-down');
        }
    }

    function handleTagClick(event, inputElement, gridElement, wrapperElement) {
        const tagButton = event.target.closest('.search-tag-button');
        if (tagButton && inputElement) {
            const tag = tagButton.textContent.trim();
            inputElement.value = tag;
            playSound('click');

            if (inputElement === homepageSearchInput) {
                handleHomepageSearch();
                if (wrapperElement && gridElement) showSearchTags(wrapperElement, gridElement);
                clearTimeout(blurTimeoutHome);
            } else if (inputElement === searchOverlayInput) {
                // For overlay, clicking a tag should immediately trigger search and show results
                showSearchResultsInOverlay();
                // No need to manage blur timeout here as focus stays in input
            }
            inputElement.focus();
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

    function updateClock() {
        if (!navbarClock) return;
        const now = new Date();
        navbarClock.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function hidePageLoader() {
        if (pageLoadMinTimePassed && pageContentLoaded && pageLoader && !pageLoader.classList.contains('hidden')) {
            pageLoader.classList.add('hidden');
            playSound('load');
            pageLoader.addEventListener('transitionend', () => {
                if (!settings.onboardingCompleted) {
                    showOnboardingModal();
                } else {
                    document.body.style.overflow = '';
                }
            }, { once: true });
        } else if (pageLoadMinTimePassed && pageContentLoaded && pageLoader.classList.contains('hidden')) {
            if (!settings.onboardingCompleted) {
                showOnboardingModal();
            } else {
                document.body.style.overflow = '';
            }
        }
    }

    function setupEventListeners() {
        if (fullscreenButton) fullscreenButton.addEventListener('click', () => { playSound('click'); goFullscreen(); });
        if (backButton) backButton.addEventListener('click', (e) => { playSound('click'); attemptShowHomeView(e); });
        if (dropdownButton) dropdownButton.addEventListener('click', () => { playSound('click'); toggleDropdown(); });
        if (dropdownMenu) dropdownMenu.addEventListener('click', (e) => { playSound('click'); handleAspectRatioChange(e); });
        if (logoLink) logoLink.addEventListener('click', (e) => { e.preventDefault(); playSound('click'); navigateHome(); });
        
        if (navbarSearchButton) navbarSearchButton.addEventListener('click', () => { playSound('click'); openSearchOverlay(); });
        if (searchOverlayCloseButton) searchOverlayCloseButton.addEventListener('click', () => { playSound('click'); closeSearchOverlay(); });

        if (navbarSettingsButton) navbarSettingsButton.addEventListener('click', () => { playSound('click'); openSettingsModal(); });

        if (homepageSearchInput) {
            homepageSearchInput.addEventListener('input', handleHomepageSearch);
            homepageSearchInput.addEventListener('focus', () => { clearTimeout(blurTimeoutHome); if (homepageSearchTagsWrapper && gameGrid) showSearchTags(homepageSearchTagsWrapper, gameGrid); });
            homepageSearchInput.addEventListener('blur', () => { blurTimeoutHome = setTimeout(() => { if (homepageSearchTagsWrapper && !homepageSearchTagsWrapper.contains(document.activeElement) && gameGrid) hideSearchTags(homepageSearchTagsWrapper, gameGrid); }, 150); });
        }
        
        if (searchOverlayInput) {
            searchOverlayInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    showSearchResultsInOverlay();
                }
            });
            searchOverlayInput.addEventListener('focus', () => {
                if (isOverlayResultsActive) { // If results are already active, focusing input should hide them
                    hideSearchResultsInOverlay();
                }
                // Show tags if not in results active mode
                if (!isOverlayResultsActive && overlaySearchTagsWrapper) {
                     setTimeout(() => { // Delay to allow potential results-active removal
                        if (!searchOverlay.classList.contains('results-active')) {
                            overlaySearchTagsWrapper.classList.add('visible');
                        }
                    }, 50);
                }
            });
             searchOverlayInput.addEventListener('blur', () => {
                // Hide tags only if not moving to a tag button or scroll button within the overlay tags wrapper
                setTimeout(() => {
                    if (overlaySearchTagsWrapper && !overlaySearchTagsWrapper.contains(document.activeElement) && !isOverlayResultsActive) {
                        overlaySearchTagsWrapper.classList.remove('visible');
                    }
                }, 150);
            });
        }

        document.addEventListener('keydown', (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === '/') { 
                event.preventDefault(); 
                playSound('click'); 
                if (searchOverlay && searchOverlay.classList.contains('visible')) {
                    closeSearchOverlay();
                } else {
                    openSearchOverlay();
                }
            } else if (event.key === 'Escape') {
                if (searchOverlay && searchOverlay.classList.contains('visible')) { playSound('click'); closeSearchOverlay(); }
                else if (onboardingModal && onboardingModal.classList.contains('visible') && onboardingCutsceneOverlay && !onboardingCutsceneOverlay.classList.contains('visible')) { playSound('click'); finishOnboarding(true); }
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
    hidePageLoader();

    window.addEventListener('resize', () => {
        if (homeView && !homeView.classList.contains('hidden')) adjustMainHeight(homeView);
        else if (gameView && !gameView.classList.contains('hidden')) adjustMainHeight(gameView);
        else if (onboardingModal && onboardingModal.classList.contains('visible') && !onboardingModal.classList.contains('fixed')) adjustMainHeight(onboardingModal);
    });

    if (pageLoader.classList.contains('hidden') && !settings.onboardingCompleted && !onboardingModal.classList.contains('visible') && (!onboardingCutsceneOverlay || !onboardingCutsceneOverlay.classList.contains('visible'))) {
        showOnboardingModal();
    } else if (settings.onboardingCompleted) {
         document.body.style.overflow = '';
    }
});
